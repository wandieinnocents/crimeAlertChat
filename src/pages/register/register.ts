import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login.response.interface';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(event: LoginResponse){
    if(!event.error){
      this.toastCtrl.create({
        message: 'Account created: ${event.result.email}',
        duration: 3000
      }).present
    }
    else {
      this.toastCtrl.create({
        message: ' Account Not created: ${event.result.email}',
        duration: 3000
      }).present
    }
  }

}
