import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CreateEventClubQueryService } from 'src/app/services/GRAPHQL/club/queries/create-event-club-query.service';
import { CreateEventRequestInput, EventPriceRequestInput, ICreateEventClubQuery, ICreateEventClubQuery_clubByID, ICreateEventClubQuery_clubByID_clubsubscription, ICreateEventClubQuery_clubByID_events_locations, ICreateEventClubQuery_clubByID_instructors, ICreateEventClubQuery_clubByID_rooms } from 'src/graphql_interfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateEventMutationService } from 'src/app/services/GRAPHQL/event/mutations/create-event-mutation.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { SignalRServiceService } from 'src/app/services/signal-rservice.service';
import { CalendarEvent } from 'angular-calendar';
import { DateRangeEvent } from 'src/app/components/event-calendar/event-calendar.component';
import { EventListQueryService } from 'src/app/services/GRAPHQL/events/queries/event-list-query.service';
import { Apollo } from 'apollo-angular';

export interface EMSEvent extends CalendarEvent {
  locationIds: string[];
  isCurrentEvent: Boolean;
  description: string;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  form: FormGroup;
  viewDate = new Date();

  shownEvents: EMSEvent[] = [];
  currentEvent: EMSEvent

  private events: EMSEvent[] = [];
  private chosenRoomIds: string[] = []
  private chosenInstrIds: string[] = []
  private eventPrices: EventPriceRequestInput[] = []
  private clubId: string

  club$: Observable<ICreateEventClubQuery["clubByID"]>

  constructor(private route: ActivatedRoute,
    private clubQueryService: CreateEventClubQueryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private eventMutationService: CreateEventMutationService,
    public loadingController: LoadingController,
    private websocketService: SignalRServiceService,
    private alertController: AlertController) {
      this.initForm()
    }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }  

  async presentAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK'],
    })
  }

  ngOnInit() {
    this.initData()
    this.websocketService.startConnection();
    this.websocketService.addListener(this.onCreationSucceeded.bind(this), this.onCreationFailed.bind(this))
  
    this.form.get("startDate")!.valueChanges.subscribe(() => this.onDateChangedForCurrentEvent())
    this.form.get("endDate")!.valueChanges.subscribe(() => this.onDateChangedForCurrentEvent())

    this.initCurrentEvent()
  }

  onCreationFailed(data: any) {
    this.loadingController.dismiss();
    this.presentAlert("Could not create event")
  }

  onCreationSucceeded(data: any) {
    this.loadingController.dismiss()
    this.resetPage()
    this.router.navigate(['/club-manage/',this.clubId])
  }

  onPriceSubmit(price: string, subId: string) {
    this.eventPrices = this.eventPrices.filter(sub => {
      return sub.clubSubscriptionId != subId
    })

    if(price!=""){
      this.eventPrices.push({price: +price, clubSubscriptionId: subId})
    }
  }

  onSubmit() {
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

    this.presentLoading().then(() => {
      this.eventMutationService.mutate({
        request: request
      }).subscribe(
        () => {},
        () => {
          this.loadingController.dismiss();
          this.presentAlert("Could not create event")
        })
      })
  }

  onRoomCheckboxChange(event, roomId: string) {
    if(event.target.checked) {
      this.chosenRoomIds.push(roomId)
    } else {
      this.chosenRoomIds = this.chosenRoomIds.filter((otherRoomId) => {
        return otherRoomId != roomId
      })
    }

    this.form.patchValue({
      locations: this.chosenRoomIds
    })

    this.filterEvents()
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

  onDateChangedForCurrentEvent() {
    var startDate: Date = this.form.get("startDate")!.value
    var endDate: Date = this.form.get("endDate")!.value

    if(startDate == null || endDate == null) {
      return
    }
    
    this.shownEvents = this.shownEvents.filter((e) => {
      return e.isCurrentEvent == false
    })

    this.currentEvent.start = startDate
    this.currentEvent.end = endDate

    this.shownEvents.push(this.currentEvent)
  }

  onCurrentEventChanged(event: DateRangeEvent) {
    this.form.patchValue({
      startDate: event.startDate,
      endDate: event.endDate
    })
  }

  get publicChecked() {
    return this.form.get('publicChecked');
  }
  
  get startDate() {
    return this.form.get('startDate')
  }

  private initData() {
    this.route.params.subscribe(params => {
      this.clubId = params['clubId']
      this.websocketService.clubId = this.clubId
      this.fetchData()
    })
  }

  private fetchData() {
    this.club$ = this.clubQueryService.watch({clubId: this.clubId}, {fetchPolicy: "cache-and-network"})
      .valueChanges
      .pipe(map(result => result.data.clubByID))
    this.club$.subscribe(
      (data) => {
        if(data == null) {
          this.router.navigate(['/'])
          return
        }
        this.events = this.createEvents(data)
        this.filterEvents()
      }
    )
  }

  private filterEvents() {
    var currentEvent = this.shownEvents.find(e => {return e.isCurrentEvent == true})

    this.shownEvents = this.events.filter(event => {
      return event.locationIds.some(e => this.chosenRoomIds.includes(e))
    })

    if(currentEvent != null) {
      this.shownEvents.push(currentEvent)
    }
  }

  private createEvents(data: ICreateEventClubQuery_clubByID): EMSEvent[] {
    var events: EMSEvent[] = []

    data.events!.forEach(e => {
      if(!e) {return null}

      var locations: string[] = []
      e.locations!.forEach(e => {
        locations.push(e!.roomId)
      })

      events.push({
        start: new Date(e.startTime),
        end: new Date(e.endTime),
        locationIds: locations,
        title: e.name ?? "",
        isCurrentEvent: false,
        description: e.description ?? ""
      })
    })

    return events
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
  
  private initCurrentEvent() {
    var startDate = new Date()
    var endDate = new Date()
    startDate.setHours(startDate.getHours() + 1)
    endDate.setHours(startDate.getHours() + 5)

    this.currentEvent = {
      start: startDate,
      end: endDate,
      locationIds: [],
      title: "Current Event",
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
      isCurrentEvent: true,
      description: "",
    }

    this.shownEvents.push(this.currentEvent)
    this.form.patchValue({
      startDate: startDate,
      endDate: endDate
    })
  }

  private resetPage() {
    this.form.reset()
    this.chosenRoomIds = []
    this.filterEvents()
  }
}

type FormData = {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  publicPrice: number;
}

