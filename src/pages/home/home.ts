import { Component,ViewChild, ElementRef} from '@angular/core';
import { NavController,Platform,ActionSheetController,LoadingController,Loading } from 'ionic-angular';

import { MediaCapture,MediaFile, CaptureError, CaptureImageOptions} from '@ionic-native/media-capture';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { ToastController,AlertController} from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { Media, MediaObject } from '@ionic-native/media';
//posting imports
import { Http, Headers, RequestOptions } from '@angular/http';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';



declare var google;
declare var cordova: any;




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
    
    //image upload new
    lastImage: string = null;
    loading: Loading;





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
  //locatin latitude and logitude for posting to db: 
 //pick the data from this.geolocation.getCurrent(poss.corrds...)
  public lat;
  public long;
  what: string = '';
  title: string = '';
  description: string = '';

  where: string = '';
  why: string = '';
  who: string = '';
  how: string = '';
  when: string = '';

  // date: String = new Date().toISOString();
  // date: String = new Date().toISOString();




  //contact: string = '';

//audio
recording: boolean = false;
filepath: string;
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
    public platform: Platform,
    private transfer: Transfer,
    private filePath: FilePath, 
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController



  ) {

    //current date  working now
    this.currentDate = new Date();
    this.getFormattedDate();

  }



//WORKING WITH IMAGES 
//image action sheeet function 
public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

//function for taking the picture referenced in the present action sheet function with 
//this.takePicture 

public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

//Helper methods for our image capturing process 
// Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}


// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}


private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });

  toast.present();
}


// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
  }

  //UPLOAD NEW IMAGE TO THE SERVER 

  public uploadImage() {

  // Destination URL
  
  var url = "http://crime.hackshadetechs.com/api/crime";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}


  };
//instantiate file transfer
const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });


}




//audio for the app

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
      this.filepath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filepath);
    } else if (this.platform.is('android')) {
      this.filepath = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filepath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filepath);
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
      this.filepath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filepath);
    } else if (this.platform.is('android')) {
      this.filepath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filepath);
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
 ///another test for geo location here 

 getlocation(){
    let val;
    let options = {
      timeout:10000,
      enableHighAccuracy:true
    };
    val = this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log("inside func:",resp)
      return resp;
    });
  return val;
  }

//validations 

validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}

  //end of other test for geo loacation 


     loadMap(){

       this.geolocation.getCurrentPosition().then((position) => {



       var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

       this.lat = position.coords.latitude;
       this.long = position.coords.longitude;




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
  presentToastReport() {
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
                date: this.formattedDate,
                image: this.lastImage,
                lat: this.lat,
                long: this.long

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
