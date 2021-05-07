import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit, OnDestroy {
local : any;
  postData = {
    username: '',
    password: '',
    passwordb: ''
  };

  constructor(public alertController: AlertController, private router: Router) { 

  }

  goBack() {
    this.router.navigate(['/about'])
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // Likewise, this will may not consistently fire when you navigate away
    // from the component
    console.log("LoginPage - OnDestroy")
  }
    
  // However, Ionic provides lifecycle hooks of its own that
  // will fire consistently during route navigation

  ionViewWillEnter() {
    // This method will be called every time the component is navigated to
    // On initialization, both ngOnInit and this method will be called

    console.log("LoginPage - ViewWillEnter")
  }

  ionViewWillLeave() {
    // This method will be called every time the component is navigated away from
    // It would be a good method to call cleanup code such as unsubscribing from observables

    console.log("LoginPage - ViewWillLeave")
  }

  async presentAlert(elheader, elmessage) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      subHeader: elheader,
      message: elmessage,
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  validateInputs() {
    
    if(this.postData.username.trim().length <=0 || this.postData.password.trim().length <=0 || this.postData.passwordb.trim().length <=0){
      this.presentAlert("Campos incompletos", "Por favor, completa todos los campos.");
    }else if(this.postData.username.toString() != "admin"){
      this.presentAlert("Usuario Incorrecto", "Por favor verifica que el usuario sea el correcto.");
    }else if(this.postData.password.toString() != "123456"){
      this.presentAlert("Contraseña Incorrecta", "Por favor verifica que la contraseña sea la correcta.");
    }else{
      this.goBack();
    }
  }


}
