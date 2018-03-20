import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InboxPage } from '../../pages/inbox/inbox';
import { ChannelsPage } from '../../pages/channels/channels';
import { ProfilePage } from '../../pages/profile/profile';
import { HomePage } from '../../pages/home/home';


/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

tab1Root: any;
tab2Root: string;
tab3Root: string;
tab4Root: string;
  constructor() {
    this.tab1Root = HomePage;
    this.tab2Root = 'InboxPage';
    this.tab3Root = 'ChannelsPage';
    this.tab4Root = 'ProfilePage';

  }



}
