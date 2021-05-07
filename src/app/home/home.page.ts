import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  botonliberado = false;
  usuarioliberado = false;
  datos = [{user:"admin", pass:"123456"}]
  postData = {
    username: '',
    password: '',
    usuario: '',
    contra: '',
    contra2: ''
  };

  data: any;

  constructor(public alertController: AlertController, private router: Router) {}

  goBack() {
    this.router.navigate(['/about', {usuario:"va"}])
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

registrate(){
  this.botonliberado = true;
}

volver(){
  this.botonliberado = false;
}

  validateInputs() { 
    if(this.botonliberado == false){
    if(this.postData.username.trim().length <=0 || this.postData.password.trim().length <=0){
      this.presentAlert("Campos incompletos", "Por favor, completa todos los campos.");
    }else{
     const resultado = this.datos.findIndex( valores => valores.user === this.postData.username );
    const resultado2 = this.datos.findIndex( valores => valores.pass === this.postData.password );
    if(resultado === resultado2){
      this.presentAlert("¡BIENVENIDO!", "Te has logueado con éxito ;)");
      this.postData.username = "";
        this.postData.password = "";
      
    }else{
      this.presentAlert("Datos incorrectos", "Los datos no son correctos.");
    }
    }
  }else{
    if(this.postData.usuario.trim().length <=0 || this.postData.contra.trim().length <=0 || this.postData.contra2.trim().length <=0){
      this.presentAlert("Campos incompletos", "Por favor, completa todos los campos.");
    }else if(this.postData.contra.trim() !== this.postData.contra2.trim()){
      this.presentAlert("Contraseñas no coinciden", "Las contraseñas deben coincidir");
    }else{
      const resultado = this.datos.findIndex( valores => valores.user === this.postData.usuario );
      if(resultado >=0){
        this.presentAlert("Usuario existente", "Por favor, intenta con otro nombre de usuario.");
      }else{
        let algo = this.datos;
        algo.push({user:this.postData.usuario, pass:this.postData.contra});
        this.datos = algo;
        this.presentAlert("¡FELICIDADES!", "Ya puedes ingresar con tus datos registrados.");
        this.botonliberado = false;
        this.postData.usuario = "";
        this.postData.contra = "";
        this.postData.contra2 = "";
      }
    }
  }
}

}
