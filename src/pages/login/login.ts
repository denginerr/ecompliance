import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  DUMMYDATA = [
    {
      formType: {
        type: 'Approved',
        color: 'white',
        backgroundColor: 'green',
      },
      form: {
        requestStatus: 'A',
        subject: 'Cuti',
        requester: 'Galih',
        lastestApproval: 'Tsasqa(A), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Approved',
            date: '20 Feb 2020 17:45',
          },
          {
            name: 'Martin',
            status: 'Approved',
            date: '20 Feb 2020 17:45',
          },
          {
            name: 'Tsasqa',
            status: 'Approve',
            date: '20 Feb 2020 17:45',
          },
        ]
      },
    },
    {
      formType: {
        type: 'Rejected',
        color: 'black',
        backgroundColor: '#ed1b2e',
      },
      form: {
        requestStatus: 'R',
        subject: 'Cuti',
        requester: 'Galih',
        lastestApproval: 'Tsasqa(R), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Martin',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Tsasqa',
            status: 'Rejected',
            date: '20 Feb 2020 17:45',
          },
        ]
      },
    },
    {
      formType: {
        type: 'Rejected',
        color: 'black',
        backgroundColor: '#ed1b2e',
      },
      form: {
        requestStatus: 'R',
        subject: 'Pembelian Data',
        requester: 'Galih',
        lastestApproval: 'Tsasqa(R), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Martin',
            status: 'Pending',
            date: '18 Feb 2020 17:05',
          },
          {
            name: 'Tsasqa',
            status: 'Rejected',
            date: '20 Feb 2020 15:00',
          },
        ],
      },
    },
    {
      formType: {
        type: 'Pending',
        color: 'grey',
        backgroundColor: 'yellow',
      },
      form: {
        requestStatus: 'P',
        subject: 'Hiring',
        requester: 'Galih',
        lastestApproval: 'Pras(A), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Martin',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Tsasqa',
            status: 'Approved',
            date: '20 Feb 2020 15:00',
          },
        ],
      }
    },
    {
      formType: {
        type: 'Approved',
        color: 'white',
        backgroundColor: 'green',
      },
      form: {
        requestStatus: 'A',
        subject: 'Cuti',
        requester: 'Galih',
        lastestApproval: 'Tsasqa(A), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Approved',
            date: '20 Feb 2020 17:45',
          },
          {
            name: 'Martin',
            status: 'Approved',
            date: '20 Feb 2020 17:45',
          },
          {
            name: 'Tsasqa',
            status: 'Approve',
            date: '20 Feb 2020 17:45',
          },
        ]
      },
    },
    {
      formType: {
        type: 'Rejected',
        color: 'black',
        backgroundColor: '#ed1b2e',
      },
      form: {
        requestStatus: 'R',
        subject: 'Cuti',
        requester: 'Galih',
        lastestApproval: 'Tsasqa(R), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Martin',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Tsasqa',
            status: 'Rejected',
            date: '20 Feb 2020 17:45',
          },
        ]
      },
    },
    {
      formType: {
        type: 'Rejected',
        color: 'black',
        backgroundColor: '#ed1b2e',
      },
      form: {
        requestStatus: 'R',
        subject: 'Pembelian Data',
        requester: 'Galih',
        lastestApproval: 'Tsasqa(R), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Martin',
            status: 'Pending',
            date: '18 Feb 2020 17:05',
          },
          {
            name: 'Tsasqa',
            status: 'Rejected',
            date: '20 Feb 2020 15:00',
          },
        ],
      },
    },
    {
      formType: {
        type: 'Pending',
        color: 'grey',
        backgroundColor: 'yellow',
      },
      form: {
        requestStatus: 'P',
        subject: 'Hiring',
        requester: 'Galih',
        lastestApproval: 'Pras(A), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Martin',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Tsasqa',
            status: 'Approved',
            date: '20 Feb 2020 15:00',
          },
        ],
      }
    },
    {
      formType: {
        type: 'Approved',
        color: 'white',
        backgroundColor: 'green',
      },
      form: {
        requestStatus: 'A',
        subject: 'Cuti',
        requester: 'Dendy',
        lastestApproval: 'Tsasqa(A), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Approved',
            date: '20 Feb 2020 17:45',
          },
          {
            name: 'Martin',
            status: 'Approved',
            date: '20 Feb 2020 17:45',
          },
          {
            name: 'Tsasqa',
            status: 'Approve',
            date: '20 Feb 2020 17:45',
          },
        ]
      },
    },
    {
      formType: {
        type: 'Rejected',
        color: 'black',
        backgroundColor: '#ed1b2e',
      },
      form: {
        requestStatus: 'R',
        subject: 'Cuti',
        requester: 'Dendy',
        lastestApproval: 'Tsasqa(R), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Martin',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Tsasqa',
            status: 'Rejected',
            date: '20 Feb 2020 17:45',
          },
        ]
      },
    },
    {
      formType: {
        type: 'Rejected',
        color: 'black',
        backgroundColor: '#ed1b2e',
      },
      form: {
        requestStatus: 'R',
        subject: 'Pembelian Data',
        requester: 'Dendy',
        lastestApproval: 'Tsasqa(R), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Martin',
            status: 'Pending',
            date: '18 Feb 2020 17:05',
          },
          {
            name: 'Tsasqa',
            status: 'Rejected',
            date: '20 Feb 2020 15:00',
          },
        ],
      },
    },
    {
      formType: {
        type: 'Pending',
        color: 'grey',
        backgroundColor: 'yellow',
      },
      form: {
        requestStatus: 'P',
        subject: 'Hiring',
        requester: 'Dendy',
        lastestApproval: 'Pras(A), 20 Feb 2020 17:45',
        category: 'cuti',
        description: 'Liburan Keluarga',
        attachment: 'Prudential.pdf',
        type: 'parallel',
        approval: [
          {
            name: 'Pras',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Martin',
            status: 'Pending',
            date: '18 Feb 2020 17:00',
          },
          {
            name: 'Tsasqa',
            status: 'Approved',
            date: '20 Feb 2020 15:00',
          },
        ],
      }
    },
  ];
  credentials = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  tap(){
    this.credentials = true;
  }

  login(data) {
    data = data.form.value
    let user = {
      name: data.username.toLowerCase(),
      type: '',
      dashboard: '',
      data: this.DUMMYDATA
    };

    let login = true;

  // userType approver/requester
    switch (data.username.toLowerCase()) {
      case 'tsasqa':
      case 'pras':
      case 'martin':
        user.type = 'approver';
        user.dashboard = 'HomePage';
        break;
      case 'galih':
      case 'dendy':
        user.type = 'requester';
        user.dashboard = 'RequestPage';
        user.data = this.DUMMYDATA.filter(e => e.form.requester.toLowerCase() === user.name);
        break;
      default:
        login = false;
        this.credentials = false
        break;
    }
    if (login) {
      console.log(user);
      this.storage.set('User', user);
      this.navCtrl.push(user.dashboard);
    }
  }

}
