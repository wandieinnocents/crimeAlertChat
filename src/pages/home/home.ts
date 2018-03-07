import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MediaCapture,MediaFile, CaptureError, CaptureImageOptions} from '@ionic-native/media-capture';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { ToastController,AlertController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {

  //photo manipulation
  public photos : any;
  public base64Image : string;

  //data submission

  headline: string = '';
  category: string = '';
  what: string = '';

  where: string = '';
  why: string = '';
  who: string = '';
  how: string = '';
  when: string = '';
  contact: string = '';



@ViewChild('myvideo') myVideo: any;
@ViewChild('signupSlider') signupSlider: any;
// @ViewChild('slides') slides: Slides;
slideData: number[] = [];




  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private mediaCapture: MediaCapture,
    public toastCtrl: ToastController,
    private alertCtrl : AlertController



  ) {



  }

  //photo classes
  ngOnInit() {
    this.photos = [];
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

//posting of data
reprtCase()

{

    var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

     let data = {



                headline: this.headline,
                category :this.category,
                what :this.what,
                where :this.where,
                why :this.why,
                who :this.who,
                how :this.how,
                when :this.when,
                contact :this.contact





            };

        //      this.http.post("http://slickstars.com/api/feedback", data,options)
        //   .subscribe(data => {
        //     console.log(data['_body']);
        //     // console.log(data);
        //     // this.data = data._body;
        //
        //  }, error => {
        //   console.log(error);// Error getting the data
        // });
            console.log(data);
        //
        //     this.http.post("http://slickstars.com/api/feedback", data,options);

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
