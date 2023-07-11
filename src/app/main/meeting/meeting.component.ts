import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import {
  MbscCalendarEvent,
  MbscDatepickerOptions,
  MbscEventcalendarOptions,
  MbscPopup,
  MbscPopupOptions,
  Notifications,
  setOptions,
} from '@mobiscroll/angular';
import { AuthService } from 'src/app/service/auth.service';

setOptions({
  theme: 'ios',
  themeVariant: 'light',
  locale: 'en-IN',
});
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss'],
  providers: [Notifications],
})
export class MeetingComponent implements OnInit {
  meetings: any = [];
  membersUsername: any[] = [];
  show: boolean = true;
  selectedMembers: string[] = [];
  constructor(
    private notify: Notifications,
    private service: AuthService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    //GET MEMBERS
    this.service.getAllUsers().subscribe((res: any) => {
      for (let i = 0; i < res.membersList.length; i++) {
        this.membersUsername.push(res.membersList[i].name);
      }
      // this.tempEvent.members = this.membersUsername;

      console.log(this.membersUsername);
      console.log(this.myData);
    });

    //get meeting details
    this.service.getMeetingDetails().subscribe((res: any) => {
      console.log(res.meetings, 'MEETING DETAILS');
      this.meetings = res.meetings;
    });

    console.log(this.meetings);
  }
  @ViewChild('popup', { static: false })
  popup!: MbscPopup;
  @ViewChild('colorPicker', { static: false })
  colorPicker: any;
  updateConsecutive!: boolean;
  updateData = [true, false];
  myData = [
    'Amita',
    'Kavya',
    'Sonia',
    'Tushar',
    'Aman',
    'Moksh',
    'Ishant',
    'Hemant',
    'Palak123',
    'Priya',
  ];

  popupEventTitle: string | undefined;
  popupEventDescription = '';
  popupEventAllDay = true;
  popupEventDates: any;
  popupEventStatus = 'busy';
  calendarSelectedDate: any = new Date();
  switchLabel: any = 'All-day';
  tempColor = '';
  consecutiveDays!: number;
  selectedColor = '';
  colorAnchor: HTMLElement | undefined;

  tempEvent!: MbscCalendarEvent;
  calendarOptions: MbscEventcalendarOptions = {
    clickToCreate: 'single',
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    view: {
      calendar: { type: 'month', labels: true },
    },
    onEventClick: (args) => {
      console.log('event clicked');
      this.isEdit = true;
      this.tempEvent = args.event;
      // fill popup form with event data
      this.loadPopupForm(args.event);
      // set popup options
      this.popupHeaderText = 'Edit event';
      this.popupButtons = this.popupEditButtons;
      this.popupAnchor = args.domEvent.currentTarget;
      // open the popup
      this.popup.open();
    },
    onEventCreated: (args) => {
      setTimeout(() => {
        this.isEdit = false;
        this.tempEvent = args.event;
        // fill popup form with event data
        this.loadPopupForm(args.event);
        // set popup options
        this.popupHeaderText = 'New Event';
        this.popupButtons = this.popupAddButtons;
        this.popupAnchor = args.target;
        // open the popup
        this.popup.open();
      });
    },
    onEventDeleted: (args) => {
      setTimeout(() => {
        this.deleteEvent(args.event);
      });
    },
    onEventUpdated: (args) => {
      // here you can update the event in your storage as well, after drag & drop or resize
      console.log(args, 'UPDATE');

      // ...
    },
  };
  popupHeaderText!: string;
  popupAnchor: HTMLElement | undefined;
  popupAddButtons = [
    'cancel',
    {
      handler: () => {
        this.saveEvent();
      },
      keyCode: 'enter',
      text: 'Add',
      cssClass: 'mbsc-popup-button-primary',
    },
  ];
  popupEditButtons = [
    'cancel',
    {
      handler: () => {
        this.saveEvent();
      },
      keyCode: 'enter',
      text: 'Save',
      cssClass: 'mbsc-popup-button-primary',
    },
  ];
  popupButtons: any = [];
  popupOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    fullScreen: true,
    onClose: () => {
      if (!this.isEdit) {
        // refresh the list, if add popup was canceled, to remove the temporary event
        this.meetings = [...this.meetings];
      }
    },
    responsive: {
      medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false,
      },
    },
  };
  datePickerControls = ['date'];
  datePickerResponsive: any = {
    medium: {
      controls: ['calendar'],
      touchUi: false,
    },
  };
  datetimePickerControls = ['datetime'];
  datetimePickerResponsive = {
    medium: {
      controls: ['calendar', 'time'],
      touchUi: false,
    },
  };
  datePickerOptions: MbscDatepickerOptions = {
    select: 'range',
    showRangeLabels: false,
    touchUi: true,
  };
  isEdit = false;
  colorOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    showArrow: false,
    showOverlay: false,
    buttons: [
      'cancel',
      {
        text: 'Set',
        keyCode: 'enter',
        handler: (ev) => {
          this.selectedColor = this.tempColor;
          this.colorPicker.close();
        },
        cssClass: 'mbsc-popup-button-primary',
      },
    ],
    responsive: {
      medium: {
        display: 'anchored',
        buttons: [],
      },
    },
  };
  loadPopupForm(event: MbscCalendarEvent): void {
    this.popupEventTitle = event.title;
    this.popupEventDescription = ' ';

    this.popupEventDates = [event.start, event.end];
    this.popupEventAllDay = event.allDay || false;
    this.popupEventStatus = event['status'] || 'busy';
    this.selectedColor = event.color || '';
  }
  saveEvent(): void {
    this.tempEvent.title = this.popupEventTitle;
    this.tempEvent['description'] = this.popupEventDescription;
    console.log(typeof this.popupEventDates[0]);
    this.tempEvent.start = this.popupEventDates[0]
      .toISOString()
      .replace('T', ' ')
      .slice(0, -5);

    this.tempEvent.end = this.popupEventDates[1]
      .toISOString()
      .replace('T', ' ')
      .slice(0, -5);

    this.tempEvent.consecutive = this.consecutiveDays;
    this.tempEvent.membersUsername = this.selectedMembers;
    console.log(this.tempEvent.membersUsername);

    console.log(this.tempEvent);

    console.log(this.membersUsername);

    //create meeting
    this.service.createMeeting(this.tempEvent).subscribe(
      (res: any) => {
        // console.log(res.statusDesc, 'Create Meeting');
        if (res.statusDesc === 'Your request processed successfully') {
          this.service.getMeetingDetails().subscribe((res: any) => {
            this.meetings = res.meetings;
            this.show = false;
          });
        }
        this.notify.snackbar({
          message: res.statusDesc,
        });
      },
      (err) => {
        console.log(err);
      }
    );

    if (this.isEdit) {
      // update the event in the list
      console.log('UPDATEEEEEEE');
      this.meetings = [...this.meetings];
      this.http
        .post(
          'http://192.168.0.65:9090/meets/api-v1/user/update-meeting',
          this.tempEvent
        )
        .subscribe((res) => {
          console.log('UPDATE MEETING', res);
          this.notify.snackbar({
            message: 'Meeting Updated',
          });
          this.service.getMeetingDetails().subscribe((res: any) => {
            console.log(res.meetings, 'MEETING DETAILS');
            this.meetings = res.meetings;
          });
        });
      // here you can update the event in your storage as well
      // ...
    } else {
      // add the new event to the list
      this.meetings = [...this.meetings, this.tempEvent];
      // here you can add the event to your storage as well
      // ...
    }
    // navigate the calendar
    this.calendarSelectedDate = this.popupEventDates[0];
    // close the popup
    this.popup.close();
  }
  deleteEvent(event: MbscCalendarEvent): void {
    let id: any = { meetid: this.tempEvent['meetid'] };

    this.http
      .post(
        'http://192.168.0.65:9090/meets/api-v1/user/delete-meeting',
        JSON.stringify(id)
      )
      .subscribe((res: any) => {
        if (res.statusDesc === 'Your request processed successfully') {
          this.meetings = this.meetings.filter(
            (item: any) => item.id !== event.id
          );
        }
      });
  }
  msg: any;
  onDeleteClick(): void {
    this.deleteEvent(this.tempEvent);
    this.popup.close();
    let id: any = { meetid: this.tempEvent['meetid'] };
    this.http
      .post(
        'http://192.168.0.65:9090/meets/api-v1/user/delete-meeting',
        JSON.stringify(id)
      )
      .subscribe((res: any) => {
        console.log(res, 'DELETE');
        if (res.statusDesc === 'Only host has that permission.') {
          this.notify.snackbar({
            message: res.statusDesc,
          });
        } else {
          // this.meetings = this.meetings.filter((item: any) => item.id !== event.id);

          this.notify.snackbar({
            message: 'Event Deleted',
          });
        }
      });
  }

  selectColor(color: string): void {
    this.tempColor = color;
  }

  openColorPicker(ev: any): void {
    this.selectColor(this.selectedColor || '');
    this.colorAnchor = ev.currentTarget;
    this.colorPicker.open();
  }

  changeColor(ev: any): void {
    const color = ev.currentTarget.getAttribute('data-value');
    this.selectColor(color);

    if (!this.colorPicker.s.buttons.length) {
      this.selectedColor = color;
      this.colorPicker.close();
    }
  }
}
