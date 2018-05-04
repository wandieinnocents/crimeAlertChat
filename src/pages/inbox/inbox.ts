 import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MESSAGE_LIST } from '../../mocks/messages/messages';
import { Message } from '../../models/message/message.interface';

import 'rxjs/add/operator/map';
import { Http} from '@angular/http';


/**
 * Generated class for the InboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  messageList: Message[] = MESSAGE_LIST;

  posts: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private http: Http
    ) {


  	this.http.get('http://slickstars.com/api/traffic_updates')
  	.map(res => res.json()).subscribe(data => {
        this.posts = data.data;

    });




  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad InboxPage');
    console.log(this.messageList);
  }



 // inboxPage(pageName: string){
 //
 //   this.navCtrl.push(pageName);
 // }
}
