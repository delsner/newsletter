import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBarConfig, MatSnackBar, MatDialogConfig} from '@angular/material';
import {LoginComponent} from '../../shared/molecules/login/login.component';
import {AuthService} from '../../shared/services/auth.service';
import {EmailService} from '../shared/email.service';
import {User} from '../../shared/types';

const EMAIL_DEFAULT = {
  meta: {
    heading: 'Free Newsletter November 2016'
  },
  general: {
    heading: 'Newsletter',
    subheading: 'November 2016',
    logo: 'https://cdn2.iconfinder.com/data/icons/miscellaneous-12/24/miscellaneous-62-128.png'
  },
  colors: {
    primary: '#12569E',
    secondary: '#ffffff',
    third: '#ffffff',
    fourth: '#6DBBEF',
    fifth: '#f7ffff',
    sixth: '#ADACB2',
    seventh: '#44525f',
    eighth: '#2f3942',
    ninth: '#153643'
  },
  introduction: {
    heading: 'News in November',
    text: 'These are the news in November 2016, stay tuned.'
  },
  sections: [
    {
      heading: 'First story',
      text: 'This is the text for the story in the first section, feel free to change it to whatever you want to say. You can also add new sections through the controls on the left.',
      img: 'https://cdn2.iconfinder.com/data/icons/miscellaneous-12/24/miscellaneous-62-128.png',
      button: 'Continue reading...',
      link: 'https://delsner.github.io/newsletter'
    }
  ],
  bottom: {
    text: 'Tired of this newsletter? Click unsubscribe below to stop receiving this newsletter.',
    unsubscribe: 'Unsubscribe',
    link: 'https://delsner.github.io/newsletter'
  },
  imprint: {
    company: 'Company Inc.',
    street: 'North Street 1',
    city: '12323 Newsletter-Town',
    website: 'http://delsner.github.io/newsletter',
    responsibilities: 'Chairmen: John News & Jake Letter'
  }
};

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public dialogRef: MatDialogRef<LoginComponent>;
  public selectedEmail: any;
  public fetchedEmails: any[];
  public user: User;
  public email: any = EMAIL_DEFAULT;

  constructor(public dialog: MatDialog,
              public viewContainerRef: ViewContainerRef,
              public snackbar: MatSnackBar,
              private authService: AuthService,
              private emailService: EmailService) {
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
      this.fetchEmails();
    });
  }

  addSection() {
    this.email.sections.push({
      heading: 'Heading',
      text: 'Text',
      img: 'https://cdn2.iconfinder.com/data/icons/miscellaneous-12/24/miscellaneous-62-128.png',
      button: 'Continue reading...',
      link: 'https://delsner.github.io/newsletter'
    });
    this.openSnackbar(`Added section.`);
  }

  removeSection(index: number) {
    this.email.sections.splice(index, 1);
    this.openSnackbar(`Removed section.`);
  }

  moveSectionUp(index: number) {
    const movingSection = this.email.sections[index];
    if ((index - 1) >= 0) {
      this.email.sections[index] = this.email.sections[index - 1];
      this.email.sections[index - 1] = movingSection;
    }
  }

  moveSectionDown(index: number) {
    const movingSection = this.email.sections[index];
    if (index + 1 <= this.email.sections.length - 1) {
      this.email.sections[index] = this.email.sections[index + 1];
      this.email.sections[index + 1] = movingSection;
    }
  }

  open() {
    const config = new MatDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    this.dialogRef = this.dialog.open(LoginComponent, config);
  }

  logout() {
    this.openSnackbar(`Bye bye.`);
    this.selectedEmail = null;
    this.fetchedEmails = null;
    this.email = EMAIL_DEFAULT;
    return this.authService.logout();
  }

  fetchEmails() {
    this.emailService.getEmails().subscribe((emails) => {
      this.fetchedEmails = emails;
      this.openSnackbar('Fetched stored emails...');
      if (this.selectedEmail) {
        this.selectedEmail = this.fetchedEmails.filter((e) => e._id === this.selectedEmail._id)[0];
      }
    });
  }

  storeEmail() {
    this.emailService.postEmail(this.email).subscribe((email) => {
      this.openSnackbar('Email stored!');
      this.fetchEmails();
    });
  }

  createNewEmail() {
    if (this.email['_id']) {
      delete this.email['_id'];
    }
    this.email.meta.heading = 'NEW NEWSLETTER';
    this.selectedEmail = null;
  }

  deleteEmail() {
    this.emailService.deleteEmail(this.selectedEmail._id).subscribe((email) => {
      this.selectedEmail = null;
      this.email = EMAIL_DEFAULT;
      this.fetchEmails();
    });
  }

  onChange(newValue) {
    this.selectedEmail = newValue;
    if (newValue !== '') {
      this.email = newValue.content;
      this.email['_id'] = newValue._id;
      this.openSnackbar(`Switched to email: ${this.email.meta.heading}.`);
    } else {
      this.email = EMAIL_DEFAULT;
      this.openSnackbar(`Switched to default email.`);
    }
  }

  openSnackbar(message) {
    const config = new MatSnackBarConfig();
    this.snackbar.open(message, 'Ok', config);
  }

}
