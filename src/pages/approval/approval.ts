import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-approval',
  templateUrl: 'approval.html',
})

export class ApprovalPage {
  userStorage
  reorderGroup = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
  ) {
  }

  back() {
    this.navCtrl.push(this.userStorage.dashboard);
  }

  resize(e) {
    e.target.style.height = e.target.value.split('\n').length * 19 + "px";
  }

  formType: object;
  tabApproval = true;
  listParallel = ['Martin', 'Pras', 'Tsasqa'];
  form = {
    requester: '',
    category: '',
    subject: '',
    description: '',
    attachment: '',
    type: 'parallel',
    approval: [],
  };
  errorLabel = {
    category: false,
    subject: false,
    description: false,
    attachment: false,
    approval: false,
  };
  showCategory = false;
  listCategory = [
    {
      name: 'Cuti',
      selected: true
    },
    {
      name: 'Procurement',
      selected: false
    },
    {
      name: 'Sales',
      selected: false
    },
  ];

  onRenderItems(indexes) {
    let element = this.form.approval[indexes.from];
    this.form.approval.splice(indexes.from, 1);
    this.form.approval.splice(indexes.to, 0, element);
    // const draggedItem = this.form.approval.splice(event.detail.from, 1)[0];
    // this.form.approval.splice(event.detail.to, 0, draggedItem);
    // event.detail.complete();
  }

  validation(e){
    this.errorLabel[e] = false;    
  }

  submit() {
    const { requester } = this.form;
    let emptyField = 0;
    for (var e in this.errorLabel) {
      this.errorLabel[e] = this.form[e].length === 0;
      if (this.errorLabel[e]) emptyField++;
    }
    console.log(emptyField);
    if (emptyField === 0) {
      this.successSavedData('Success', 'Successfully Saved data.');
      this.form = {
        requester,
        category: '',
        subject: '',
        description: '',
        attachment: '',
        type: 'parallel',
        approval: [],
      };
    }
  }

  handleChangeCategory(item) {
    this.form.category = item;
    this.listCategory.map(e => {
      if (item === e.name) {
        e.selected = true;
      } else {
        e.selected = false;
      }
    });
    this.showCategory = !this.showCategory;
  }

  changeListener(event) {
    const file = event.target.files[0];
    if (event.target.files.length > 0) {

      console.log('This file size is: ' + file.size / 1024 / 1024 + " MB");
      if (file.size / 1024 / 1024 < 2) {
        const fileToLoad = file;
        const fileReader = new FileReader();
        // let base64File;
        // Reading file content when it's loaded
        fileReader.onload = (base) => {
          // base64File = base.target.result;
          // base64File console
          console.log(base);
        };

        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
        this.form.attachment = file.name;        
      }
    }
  }

  handleApproval(e) {
    this.reorderGroup = !this.reorderGroup;
  }

  ngOnInit() {
    this.formType = {
      type: 'Draft',
      color: 'white',
      backgroundColor: 'grey',
    };
    this.storage.get('User').then(user => {
      console.log(user,"user");
      if (user === null) {
        this.sessionHandler();
      } else {
        this.userStorage = user;
        const params = this.navParams.get('paramsMap');
        console.log(params);
        if (params === undefined) {
          this.navCtrl.push('HomePage');
        } else {
          if (params.acceptForm == 'request') {
            this.formType = params.response;
          } else if (params.acceptForm == 'detail') {
            const { formType, form } = params.response;
            this.formType = formType;
            this.form = form;
          } else {
            this.navCtrl.push('HomePage');
          }
        }
      }
    });

    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // if (id === 'request') {
    //   this.formType = {
    //     type: 'Draft',
    //     color: 'white',
    //     backgroundColor: 'grey',
    //   };
    // } else if (id === 'detail') {
    //   this.activatedRoute.queryParams.subscribe(params => {
    //     params = JSON.parse(params.state);
    //     const { formType, form } = params.data;
    //     this.formType = formType;
    //     this.form = form;
    //   }, error => {
    //     console.log(error);
    //   });
    // } else {
    //   this.router.navigate(['./approval']);
    // }
  }

  downloadAttachment(filename) {
    // tslint:disable-next-line: max-line-length
    const uri = 'http://www.africau.edu/images/default/sample.pdf';
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      document.body.appendChild(link); // Firefox requires the link to be in the body
      link.download = filename;
      link.href = uri;
      link.click();
      document.body.removeChild(link); // remove the link when done
    } else {
      location.replace(uri);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApprovalPage');
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

  approver(data){
    console.log(data);
    this.successSavedData('Success', 'Successfully Saved data.');
  }

  successSavedData(title: string, message: string) {
    const alert = this.alertCtrl.create({
      title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.push("HomePage");
          },
        },
      ],
    });
    alert.present();
  }


}
