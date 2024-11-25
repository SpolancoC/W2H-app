import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;
  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {
    this.user = authService.getProfile
  }

  async logOut(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.authService.singOut().then(()=>{
      loading.dismiss()
      this.router.navigate(['/start'])
    }).catch((error)=>{
      console.log(error);
      loading.dismiss()
    })
  }

  async exitLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'Saliendo...',
      cssClass: 'custom-loader'
    });

    loading.present();
  }


}
