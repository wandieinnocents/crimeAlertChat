import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { RegisterPage } from '../../pages/register/register';
import { InboxPage } from '../../pages/inbox/inbox';
import { TabsPage } from '../../pages/tabs/tabs';
import { HomePage } from '../../pages/home/home';
import { LoginResponse } from '../../models/login/login.response.interface';
import { EditProfilePage } from '../../pages/edit-profile/edit-profile';

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


  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

// registerPage(pageName: string)
// {
//   this.navCtrl.push(pageName);
// }
//
inboxPage(pageName: string){


  // pageName === 'TabsPage' ? this.navCtrl.setRoot(pageName) : this.navCtrl.push(pageName);
  // this.navCtrl.setRoot('TabsPage');
}



login(event: LoginResponse){
if(!event.error){
  this.toastCtrl.create({
      message: 'welcome to crime alert ',
      duration: 3000
  }).present()
  // this.navCtrl.setRoot('EditProfilePage');

    this.navCtrl.setRoot('TabsPage');
}
else{
  this.toastCtrl.create({
    message: event.error.message,
    duration: 3000

  }).present();
}
  // console.log(event);
}






















}
