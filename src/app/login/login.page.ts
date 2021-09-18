import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username : any;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public alertController: AlertController
  ) { }

  async ngOnInit() {
    await this.storage.create();
  }

  async signin(){
    console.log(this.username);
    
    if(this.username == "gilbert"){
      await this.storage.set('service', 'Premium Response Services');
      await this.storage.set('name', 'Gilbert Mupande');
      await this.storage.set('address', '56 Samora Machel , HRE , ZW');
      await this.storage.set('amount', '$ 540');
      await this.storage.set('phone', '+263 77 242 3623');
      this.navCtrl.navigateForward('/home')
    }
    else if(this.username == "masimba"){
      await this.storage.set('service', 'Standard Response Services');
      await this.storage.set('name', 'Mr Masimba');
      await this.storage.set('address', '56 Samora Machel , HRE , ZW');
      await this.storage.set('amount', '$ 330');
      await this.storage.set('phone', '+263 77 348 1057');
      this.navCtrl.navigateForward('/home')
    }
    else if(this.username == "mupande"){
      await this.storage.set('service', 'Lite Response Services');
      await this.storage.set('name', 'Mr Mupande');
      await this.storage.set('address', '56 Samora Machel , HRE , ZW');
      await this.storage.set('amount', '$ 100');
      await this.storage.set('phone', '+263 77 242 3623');
      this.navCtrl.navigateForward('/home')
    }
    else
    {
      this.presentAlert('Error','Login','You have entered a wrong username')
    }
    
  }

  async presentAlert(val1,val2,val3) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: val1,
      subHeader: val2,
      message: val3,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



}
