import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name: any;
  address: any;
  amount: any;
  phone: any;
  service: any;
  response: any;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();
    this.name =  await this.storage.get('name');
    this.address =  await this.storage.get('address');
    this.amount =  await this.storage.get('amount');
    this.phone =  await this.storage.get('phone');
    this.service =  await this.storage.get('service');

    if(this.name == undefined){
      this.navCtrl.navigateForward('/login');
    }
  }


  async reload(){
    location.reload();
  }

  async logout(){
    this.storage.clear();
    this.navCtrl.navigateForward('/login');
  }

  pay(){

    let data = {
      price : this.amount
    }

      console.log('the data is',data)
      this.presentLoading('Proccessing transaction...').then( ()  => {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });
      this.http.post('https://hifa.utande.co.zw/battery/pya.php',data,options)
      .pipe(map(res => res.json()))
      .subscribe( async res => {
       this.response =res;
        console.log(this.response);
        this.presentAlert(this.response);
      });
      
      });
  }
  

  async presentAlert(val) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Transaction',
      // subHeader: 'Subtitle',
      message: val,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // this.home();
          }
        }]
      
      
    });
    
    await alert.present();
  }

  async presentLoading(value) {
    const loading = await this.loadingCtrl.create({
        message: value,
        duration : 16000,
        translucent: true,
        cssClass: 'custom-class custom-loading'
    });

    
    return await loading.present();
}

}
