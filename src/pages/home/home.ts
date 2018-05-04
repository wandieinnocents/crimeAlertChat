import { Component,ViewChild, ElementRef} from '@angular/core';
import { NavController,Platform } from 'ionic-angular';

import { MediaCapture,MediaFile, CaptureError, CaptureImageOptions} from '@ionic-native/media-capture';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { ToastController,AlertController} from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { Media, MediaObject } from '@ionic-native/media';
//posting imports
import { Http, Headers, RequestOptions } from '@angular/http';

import { File } from '@ionic-native/file';
import moment from 'moment'


declare var google;



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  

  public date : number   = Date.now();
  currentDate;
  formattedDate;


  //photo manipulation
  public photos : any;
  public base64Image : string;

  //data submission

  headline: string = '';
  //active only
  category: string = '';
  what: string = '';
  title: string = '';
  description: string = '';

  where: string = '';
  why: string = '';
  who: string = '';
  how: string = '';
  when: string = '';

  // date: String = new Date().toISOString();
  date: String = new Date().toISOString();




  //contact: string = '';

//audio
recording: boolean = false;
filePath: string;
fileName: string;
audio: MediaObject;
audioList: any[] = [];


//audio x

//test data here
data = {}
  // first_name: string = '';
  // contact: string = '';
  // location: string = '';
  //


@ViewChild('myvideo') myVideo: any;
@ViewChild('signupSlider') signupSlider: any;
@ViewChild('map') mapElement: ElementRef;
  map: any;
// @ViewChild('slides') slides: Slides;
slideData: number[] = [];
marker: any;
latLng: string;
myform: any;


  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private mediaCapture: MediaCapture,
    public toastCtrl: ToastController,
    private alertCtrl : AlertController,
    private geolocation: Geolocation,
    private media: Media,
    private file: File,
     public http: Http,
    public platform: Platform



  ) {

    //current date  working now
    this.currentDate = new Date();
    this.getFormattedDate();

  }

  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }



  ionViewWillEnter() {
    this.getAudioList();
  }
  startRecord() {
    if (this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }

    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  playAudio(file,idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }

  //date function here working function
  getFormattedDate(){

    var dateObj = new Date();
    var year = dateObj.getFullYear().toString();
    var month = dateObj.getMonth().toString();
    var date = dateObj.getDate().toString();

   // var monthArray = ['Jan','Feb','Mar','April','May'];
    var monthArray = ['1','2','3','4','5'];

    this.formattedDate =  year + '-' + monthArray[month] + '-' + date;
  }

  ionViewDidLoad(){

      // let loader = this.loadingCtrl.create({
      //   content: "Please wait...",
      //   duration: 1000
      // });
      // loader.present();

      this.loadMap();

     }

     loadMap(){

       this.geolocation.getCurrentPosition().then((position) => {



       var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);




       let mapOptions = {
         center: latLng,
         zoom: 17,

         mapTypeId: google.maps.MapTypeId.ROADMAP
         //mapTypeId: google.maps.MapTypeId.ROADMAP

       }



       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

       this.marker = new google.maps.Marker({
       map: this.map,
       position: latLng ,  //here in marker set the center position
       //label:"Your Here ",
       animation: google.maps.Animation.DROP,
       icon: ''
     });

       //console.log(position.coords.latitude);
       console.log('position gotten now: long:',position.coords.latitude,' lat:',position.coords.longitude);

     }, (err) => {
       console.log(err);
     });

   }
  //photo classes
  ngOnInit() {
    this.photos = [];
  }
  //form submission and reste

  onSubmit() {
    if (this.myform.valid) {
      console.log("Form Submitted!");
      this.myform.reset();
    }
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
        title: 'Sure you want to delete this photo? There is NO undo!',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
            }
          }
        ]
      });
    confirm.present();
  }

  // takePhoto(){
  //
  // console.log("Take Photo");

  // }

  takePhoto() {
    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });


  }


//permissions
//toast here
  presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Report sent successfully',
        duration: 3000
      });
      toast.present();
    }


  onSlideChanged() {
   let currentIndex = this.signupSlider.getActiveIndex();
   console.log(currentIndex);
 }
  // slideDidChange () {
  //   this.slidesMoving = false;
  //   let slideIndex : number = this.slides.getActiveIndex();
  //   let currentSlide : Element = this.slides._slides[slideIndex];
  //   this.slidesHeight = currentSlide.clientHeight;
  // }



  //   slideWillChange () {
  //   this.slidesMoving = true;
  // }

  resetFields(){

    let title = this.title;
    let description = this.description;

    this.title = '';
    this.description = '';

  }


//posting of data
reprtCase()

{

    var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

     let data = {



                // headline: this.headline,
                //category :this.category,
                title :this.title,
                description :this.description,
                date: this.formattedDate

                // latLng: this.latLng
                // where :this.where,
                // why :this.why,
                // who :this.who,
                // how :this.how,
                // when :this.when,
                // contact :this.contact








            };

             this.http.post("http://127.0.0.1:8000/api/crime", data,options)
          .subscribe(data => {
            console.log(data['_body']);
            // console.log(data);
            // this.data = data._body;

         }, error => {
          console.log(error);// Error getting the data
        });
            console.log(data);
        //
             this.http.post("http://127.0.0.1:8000/api/crime", data,options);

}

  //form wizard
  next(){
        this.signupSlider.slideNext();
    }

    prev(){
        this.signupSlider.slidePrev();
    }




  startrecording()
  {

    this.mediaCapture.captureVideo((videodata) =>{
      alert(JSON.stringify(videodata));
    })
  }


selectvideo(){
let video = this.myVideo.nativeElement;
var options = {
  sourceType: 2,
  mediaType: 1
};
this.camera.getPicture(options)
.then((data) =>{
  video.src = data;
  video.play();
})
}

}
