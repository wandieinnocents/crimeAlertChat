import { Component,EventEmitter,Output } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
import  {  Account } from '../../models/account/account.interface';
import { ToastController,NavController} from 'ionic-angular';

import { AuthService } from '../../providers/auth/auth.service';
import { LoginResponse } from '../../models/login/login.response.interface';
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {

  text: string;
  account = {} as Account
  @Output() registerStatus : EventEmitter<LoginResponse>;

  constructor(
    // private afAuth: AngularFireAuth,
    private auth: AuthService,
    private toastCtrl: ToastController,
    private navCtrl: NavController


  ) {
    console.log('Hello RegisterFormComponent Component');
    this.text = 'Hello World';

    this.registerStatus = new EventEmitter<LoginResponse>();
  }

async registerPage(){

  try{
    const result = await this.auth.createUserWithEmailAndPassword(this.account);
    this.registerStatus.emit(result);
    this.toastCtrl.create({
      message: "Account has been created!",
      duration: 3000
    }).present();
    console.log(result);
  }
  catch(e){
    console.error(e);
    this.registerStatus.emit(e);
    this.toastCtrl.create({
      message: e.message,
      duration: 3000
    }).present();
  }

}

loginRedirect(){
  this.navCtrl.push('LoginPage');
}

}
