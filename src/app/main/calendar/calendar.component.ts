import { Component, Inject } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CreateMeetingComponent } from '../create-meeting/create-meeting.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  date: any;
  meetings: any[] = [];
  events: any[] = [];
  membersUsername: any[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.onDateClick.bind(this),
    weekends: true,
    events: [],
    // eventClick: this.updateForm.bind(this),
    eventClick: (info) => {
      this.updateForm(info.event);
    },
  };

  ngOnInit() {
    // Start:${res.meetings[i].start.slice(11,17)}End:${res.meetings[i].end.slice(11, 17)}

    //GET MEMBERS

    this.authService.getAllUsers().subscribe((res: any) => {
      for (let i = 0; i < res.membersList.length; i++) {
        this.membersUsername.push(res.membersList[i].name);
      }
    });

    this.authService.getMeetingDetails().subscribe((res: any) => {
      console.log(res.meetings);
      for (let i = 0; i < res.meetings.length; i++) {
        this.meetings.push({
          title: `${res.meetings[i].title}`,
          start: res.meetings[i].start,
          end: res.meetings[i].end,
          date: res.meetings[i].start.slice(0, 10),
         
        });
      }

      console.log(res.meetings[0].start.slice(0, 10));
      console.log(this.meetings);

      this.calendarOptions.events = this.meetings;
      // this.events = this.meetings;
    });
  }

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  // updateForm(data: any) {
  //   console.log(data, 'UPDATE MEET');
  //   this.dialog.open(CreateMeetingComponent, {});
  // }
  update: boolean = false;
  updateForm(event: any) {
    console.log(event);
    if (event._def.title) {
      this.update = true;
    }
    this.dialog.open(CreateMeetingComponent, {
      data: {
        event: event,
        update: this.update,
      },
      width: '50%',
    });
  }

  onDateClick(res: { dateStr: string }) {
    // alert('you clicked on :' + res.dateStr);
    this.date = res.dateStr;
    this.dialog.open(CreateMeetingComponent, { data: this.date, width: '50%' });
  }
}
