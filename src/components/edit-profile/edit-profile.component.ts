import { Component } from '@angular/core';

/**
 * Generated class for the EditProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.component.html'
})
export class EditProfileComponent {

  text: string;

  constructor() {
    console.log('Hello EditProfileComponent Component');
    this.text = 'Hello World';
  }

}
