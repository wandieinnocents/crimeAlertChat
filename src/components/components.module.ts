import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {  LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    EditProfileComponent
  ],
  imports: [
        IonicModule
      ],
  exports:[
    LoginFormComponent,
    RegisterFormComponent,
    EditProfileComponent
  ]
})

export class ComponentsModule{

}
