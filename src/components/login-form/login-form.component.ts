import { Component,EventEmitter,Output } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { AngularFireAuth } from 'angularfire2/auth';
import  {  Account } from '../../models/account/account.interface';
import { ToastController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/login.response.interface';
import { AuthService } from '../../providers/auth/auth.service';

/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.component.html'
})
export class LoginFormComponent{


//text: string;
account = {} as Account

@Output() loginStatus: EventEmitter<LoginResponse>;

  constructor(
    private navCtrl: NavController,
    private auth:  AuthService,
    // private afAuth: AngularFireAuth,
    private toastCtrl: ToastController
  ) {

    this.loginStatus = new EventEmitter<any>();
  //  console.log('Hello LoginFormComponent Component');
  //  this.text = 'Hello World';
  }


  async login(){
    const loginResponse = await this.auth.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(loginResponse);
  //using auth service


    //normal lloginn
    // try{
    //   const result: LoginResponse = {
    //
    //   result: await this.afAuth.auth.signInWithEmailAndPassword(this.account.email,this.account.password)
    //
    //   }
    //
    //   this.toastCtrl.create({
    //     message: "Login Successfull",
    //     duration: 3000
    //
    //   }).present();
    //   console.log(result);
    //   this.loginStatus.emit(result);
    // }
    // catch(e){
    //
    //
    //   this.toastCtrl.create({
    //     message: e.message,
    //     duration: 3000
    //
    //   }).present();
    //   console.error(e);
    //   const error: LoginResponse = {
    //   error: e
    //   }
    //
    //
    //   this.loginStatus.emit(error);
    // }


  }
  registerPage()
  {
    this.navCtrl.push('RegisterPage');
  }

  // inboxPage(pageName: string){
  //
  //
  //   pageName === 'TabsPage' ? this.navCtrl.setRoot(pageName) : this.navCtrl.push(pageName);
  // }

}
