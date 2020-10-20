import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CreateEventClubQueryService } from 'src/app/services/GRAPHQL/club/queries/create-event-club-query.service';
import { CreateEventRequestInput, EventPriceRequestInput, ICreateEventClubQuery, ICreateEventClubQuery_clubByID, ICreateEventClubQuery_clubByID_clubsubscription, ICreateEventClubQuery_clubByID_instructors, ICreateEventClubQuery_clubByID_rooms } from 'src/graphql_interfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateEventMutationService } from 'src/app/services/GRAPHQL/event/mutations/create-event-mutation.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  form: FormGroup;

  private chosenRoomIds: string[] = []
  private chosenInstrIds: string[] = []
  private eventPrices: EventPriceRequestInput[] = []
  private clubId: string

  club$: Observable<ICreateEventClubQuery["clubByID"]>

  constructor(private route: ActivatedRoute,
    private clubQueryService: CreateEventClubQueryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private eventMutationService: CreateEventMutationService) {
      this.initForm()
    }

  ngOnInit() {
    this.initData()
    console.log("init called")
  }

  onPriceSubmit(price: string, subId: string) {
    this.eventPrices = this.eventPrices.filter(sub => {
      return sub.clubSubscriptionId != subId
    })

    this.eventPrices.push({price: +price, clubSubscriptionId: subId})
  }

  onSubmit() {
    console.log(this.form.value)
    console.log(this.eventPrices)

    const formData: FormData = this.form.value

    var request: CreateEventRequestInput = {
        clubId: this.clubId,
        name: formData.name,
        description: formData.description,
        startTime: formData.startDate,
        endTime: formData.endDate,
        instructorForEvents: this.chosenInstrIds,
        locations: this.chosenRoomIds,
        publicPrice: formData.publicPrice,
        eventPrices: this.eventPrices,
    }

    console.log(request)
    this.eventMutationService.mutate({
      request: request
    }).subscribe(
      (data) => {
        console.log("this went well - data: " + data)
      },
      (error) => {
        console.log("this went bad - error: " + error)
      }
    )
  }

  onRoomCheckboxChange(event, roomId: string) {
    if(event.target.checked) {
      this.chosenRoomIds.push(roomId)
      console.log("pushed")
    } else {
      this.chosenRoomIds = this.chosenRoomIds.filter((otherRoomId) => {
        return otherRoomId != roomId
      })
    }

    this.form.patchValue({
      locations: this.chosenRoomIds
    })
  }

  onInstructorCheckboxChange(event, instrId: string) {
    if(event.target.checked) {
      this.chosenInstrIds.push(instrId)
    } else {
      this.chosenInstrIds = this.chosenInstrIds.filter((otherInstrId) => {
        return otherInstrId != instrId
      })
    }

    this.form.patchValue({
      instructors: this.chosenInstrIds
    })
  }

  get publicChecked() {
    return this.form.get('publicChecked');
  }

  private initData() {
    this.route.params.subscribe(params => {
      this.clubId = params['clubId']
      console.log(this.clubId)
      this.fetchData()
    })
  }

  private fetchData() {
    this.club$ = this.clubQueryService.watch({clubId: this.clubId}).valueChanges.pipe(map(result => result.data.clubByID))
    this.club$.subscribe(
      (data) => {
        if(data == null) {
          console.log("Something went totally wrong")
          this.router.navigate(['/'])
          return
        }
      }
    )
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      locations: new FormControl('', null),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      instructors: new FormControl('', null),
      description: new FormControl('', null),
      publicPrice: new FormControl(null, null),
      publicChecked: new FormControl(false, null),
    });
  }
}

type FormData = {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  publicPrice: number;
}