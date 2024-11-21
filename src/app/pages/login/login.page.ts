import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  redirect_restore(){
    this.router.navigate(['/restore']);
  }

  redirect_register(){
    this.router.navigate(['/register']);
  }
  

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'Iniciando sesión...',
      cssClass: 'custom-loader'
    });

    loading.present();
  }

}

//this.showLoading();
//this.loadingCtrl.dismiss();