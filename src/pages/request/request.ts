import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Api } from '../../providers';

/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {
  minIndex: number = 0;
  maxPerPage: number = 10;
  maxIndex: number = 9;
  activePage: number = 0;
  numberOfPages: any[] = [];
  goToPageInput: number;

  searchKey: any = {
    subject: '',
    approver: '',
    lastestApproval: '',
  };

  dataBody: any = {
    Authorization: '',
    body: {
      searchKey: this.searchKey,
      sortBy: 'subject',
      sortType: 'desc',
      page: 1,
      size: 10,
    },
  };

  userStorage
  requestNumber = "all"
  selectRow = 10
  data = []
  dataResponse
  searchOpen = false
  colTable = [
    {
      text: 'Action',
      name: '',
      open: false
    },
    {
      text: 'Subject',
      name: 'subject',
      open: false
    },
    {
      text: 'Approver',
      name: 'approver',
      open: false
    },
    {
      text: 'Lastest Approval',
      name: 'lastestApproval',
      open: false
    },
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public API: Api,
    public alertCtrl: AlertController,
  ) {
    this.storage.get('User').then(user => {
      console.log(user, "user");
      if (user === null) {
        this.sessionHandler();
      } else {
        this.dataResponse = user.data.map((e) => {
          const { subject, lastestApproval, approval } = e.form
          return {
            ...e,
            subject,
            approver: approval.map((data) => data.name).join(', '),
            lastestApproval,
          }
        });;
        if (user.type === 'approver') {
          this.navCtrl.push(user.dashboard);
        }
        this.userStorage = user;
        this.loadAll();
      }
    });
    this.API.get('products/').subscribe((data)=>{
      console.log(data);
      
    })
  }

  loadAll() {
    this.loadData();
    
  }

  loadData() {
    const body = this.dataBody.body;
    let res = this.dataResponse;
    for (var e in this.searchKey) {
      if (body.searchKey[e] != '') {
        res = res.filter(search => {
          var name = String(search[e]).toUpperCase();
          var findme = new RegExp(String(body.searchKey[e]).toUpperCase(), 'g');
          return name.match(findme);
        });
      }
    }

    res = this.sortBy(res, body.sortBy, body.sortType);
    this.pagesCounter(res.length);

    let index = 0;
    res = res.filter(e => {
      if (
        index >= (body.page - 1) * Number(body.size) &&
        index < (body.page - 1) * Number(body.size) + Number(body.size)
      ) {
        index++;
        return true;
      } else {
        index++;
        return false;
      }
    });
    
    if (this.requestNumber != 'all') {
      res = res.filter((data) => data.form.requestStatus === this.requestNumber);
    }
    

    this.data = res;
  }

  sessionHandler() {
    const alert = this.alertCtrl.create({
      title: "Warning",
      message: "You are not logged in, please login first.",
      buttons: [{
        text: "OK",
        handler: () => {
          this.navCtrl.push("LoginPage");
        }
      }]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

  logout() {
    this.storage.remove('User');
    this.navCtrl.push('LoginPage');
  }

  navDetail(data) {
    this.navCtrl.push('ApprovalPage', {
      paramsMap: {
        response: data,
        acceptForm: 'detail'
      }
    });
  }

  newRequest() {
    this.navCtrl.push('ApprovalPage', {
      paramsMap: {
        response: {
          type: 'Draft',
          color: 'white',
          backgroundColor: 'grey',
        },
        acceptForm: 'request'
      }
    });
  }

  sortTable(e, index) {
    e = e.target.parentElement;
    e.setAttribute('is-asc', e.getAttribute('is-asc') == 'true' ? false : true);
    this.dataBody.body = {
      ...this.dataBody.body,
      sortBy: this.colTable[index].name,
      sortType: e.getAttribute('is-asc') == 'true' ? 'desc' : 'asc'
    };
    this.loadData();
  }

  searchTable(index) {
    const col = this.colTable[index]
    if (col.open) {
      this.searchKey[col.name] = "";
      this.loadData();
    }
    this.colTable[index] = { ...col, open: !col.open }
    this.searchOpen = this.colTable.filter(e => e.open).length > 0
  }

  pagesCounter(item_length) {
    let m = Math.ceil(item_length / this.maxPerPage);
    if (m <= 1) {
      m = 1;
    }
    this.numberOfPages = Array(m)
      .fill(0, 0)
      .map((x, i) => i);
  }

  openPage(selected_page) {
    let page = selected_page + 1;

    this.dataBody.body.page = page;
    this.loadData();

    this.maxIndex = page * this.maxPerPage - 1;
    this.minIndex = page * this.maxPerPage - this.maxPerPage;
    this.activePage = selected_page;
  }

  changeMaxPerPage(e) {
    console.log(e);

    let page = 1;
    this.maxPerPage = e;

    this.dataBody.body.size = e;
    this.openPage(0);
    this.loadData();
    this.maxIndex = page * this.maxPerPage - 1;
    this.minIndex = page * this.maxPerPage - this.maxPerPage;
    this.activePage = 0;
  }

  goToPage() {
    let page = this.goToPageInput - 1;
    if (typeof page === 'number' && page <= this.numberOfPages.length - 1 && page >= 0) {
      this.openPage(page);
    }
  }

  sortData(e, id) {
    let a = e.target;
    let getAttribute = a.getAttribute('is-asc');
    a.setAttribute('is-asc', getAttribute == 'true' ? false : true);
    this.dataBody.body.sortBy = id;
    this.dataBody.body.sortType = getAttribute == 'true' ? 'desc' : 'asc';
    this.loadData();
  }

  filter(e, col) {
    this.searchKey[col] = e.target.value;
    if (e.keyCode == 13) {
      this.openPage(0);
    }
  }

  sortBy(data, colIndex, srt) {
    function normalize(value) {
      var padding = '000000000000000';
      value = value.replace(/(\d+)((\.\d+)+)?/g, function ($0, integer, decimal, $3) {
        if (decimal !== $3) {
          return padding.slice(integer.length) + integer + decimal;
        }
        decimal = decimal || '.0';
        return padding.slice(integer.length) + integer + decimal + padding.slice(decimal.length);
      });
      return value;
    }
    const mount = (a, b) => {
      var aMixed = normalize(a);
      var bMixed = normalize(b);
      return aMixed < bMixed ? -1 : 1;
    };
    data.sort((a, b) => mount(String(a[colIndex]).toLowerCase(), String(b[colIndex]).toLowerCase()));
    let temp = [[]];
    let j = 0;
    data.map((e, i) => {
      temp[j].push(e);
      if (i < data.length - 1 && e[colIndex]) {
        if (String(e[colIndex][0]).toLowerCase() != String(data[i + 1][colIndex][0]).toLowerCase()) {
          j++;
          temp[j] = [];
        }
      }
    });
    let change = [];
    temp.map((e, i) => {
      change.push(...e.sort((a, b) => mount(String(a[colIndex]), String(b[colIndex]))));
    });
    return srt == 'asc' ? change : change.reverse();
  }

  changeRequest() {
    if (this.requestNumber != 'all') {
      this.data = this.dataResponse.filter((data) => data.form.requestStatus === this.requestNumber);
    } else {
      this.data = [...this.dataResponse]
    }
  }

}
