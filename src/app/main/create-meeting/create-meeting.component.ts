import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss'],
})
export class CreateMeetingComponent implements OnInit {
  form!: FormGroup;
  update: boolean = false;
  show: boolean = true;
  membersUsername: any[] = [];
  selectedMembers: any;
  myTimePicker: any;
  members: any;
  constructor(
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dRef: MatDialogRef<CreateMeetingComponent>,
    private snackBar: MatSnackBar
  ) {
    // datePipe = new DatePipe('en-US');
  }

  ngOnInit() {
    //GET MEMBERS
    console.log('Hello');
    this.service.getAllUsers().subscribe((res: any) => {
      console.log(res);
      for (let i = 0; i < res.membersList.length; i++) {
        this.membersUsername.push(res.membersList[i].name);
      }

      // console.log(this.membersUsername, 'MEMBERS');
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      membersUsername: new FormControl('', [Validators.required]),
      consecutive: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      // time: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    });

    if (this.data.update === false) {
      this.form.patchValue({
        start: this.data,
        end: this.data,
      });
    } else if (this.data.update === true) {
      this.update = true;
      const event = this.data.event;
      // const startFormatted = this.datePipe.transform(
      //   event.start,
      //   'yyyy-MM-dd HH:mm:ss'
      // );
      // const endFormatted = this.datePipe.transform(
      //   event.end,
      //   'yyyy-MM-dd HH:mm:ss'
      // );

      this.form.patchValue({
        title: event.title,
        start: event.start,
        end: event.end,
      });
    }
    // if (this.data) {
    //   this.form.patchValue(this.data);
    //   this.update = true;
    //   this.show = false;
    // }
  }

  onSubmit() {
    console.log(this.form.value);
    console.log(this.form.get('members')?.value);

    // if (this.update) {
    //   this.service.updateUser(this.form.value).subscribe((res: any) => {
    //     console.log(res, 'Update user');
    //     if (res.statusDesc === 'Your request processed successfully') {
    //       this.dRef.close(true);
    //       this.snackBar.open('User Updated!', 'Close', {
    //         duration: 3500,
    //       });
    //     }
    //   });
    // } else {
    this.service.createMeeting(this.form.value).subscribe((res: any) => {
      // console.log(res);
      if (res.statusDesc === 'Your request processed successfully') {
        this.dRef.close(true);
        this.snackBar.open('Meeting Created!', 'Close', {
          duration: 3500,
        });
      } else {
        this.snackBar.open(res.statusDesc, 'Close', {
          duration: 3500,
        });
      }
    });
    // }
  }

  close() {
    this.dRef.close(false);
  }
}
