import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {  LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    EditProfileComponent,
    EditProfileFormComponent,
    ProfileViewComponent
  ],
  imports: [
        IonicModule
      ],
  exports:[
    LoginFormComponent,
    RegisterFormComponent,
    EditProfileComponent,
    EditProfileFormComponent,
    ProfileViewComponent
  ]
})

export class ComponentsModule{

}
