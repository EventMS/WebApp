import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CreateEventClubQueryService } from 'src/app/services/GRAPHQL/club/queries/create-event-club-query.service';
import { ICreateEventClubQuery, ICreateEventClubQuery_clubByID, ICreateEventClubQuery_clubByID_clubsubscription, ICreateEventClubQuery_clubByID_instructors, ICreateEventClubQuery_clubByID_rooms } from 'src/graphql_interfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  form: FormGroup;

  private chosenRoomIds: string[] = []
  private clubId: string

  club$: Observable<ICreateEventClubQuery["clubByID"]>

  constructor(private route: ActivatedRoute,
    private clubQueryService: CreateEventClubQueryService,
    private formBuilder: FormBuilder,
    private router: Router) { 
      this.initForm()
    }

  ngOnInit() {
    this.initData()
    console.log("init called")
  }

  onSubmit() {
    console.log(this.form.value)
    console.log(this.chosenRoomIds)
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
    });
  }
}
