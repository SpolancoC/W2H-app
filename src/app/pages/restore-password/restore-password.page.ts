import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./restore-password.page.scss'],
})
export class RestorePasswordPage {
  restForm : FormGroup;
  email: any;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public formBuilder:FormBuilder, 
  ) {}

  ngOnInit(){
    this.restForm = this.formBuilder.group({
      email: ['',[
        Validators.required, 
        Validators.email, 
        Validators.pattern ("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
    })
  }

  get errorControl(){
    return this.restForm?.controls;
  }

  async restorePassword(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.authService.restorePassword(this.email).then(()=>{
      loading.dismiss()
      console.log('Mensaje de recuperación enviado')
      this.router.navigate(['/login'])
    }).catch((error)=>{
      console.log(error);
      loading.dismiss()
    })
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'Enviando solicitud...',
      cssClass: 'custom-loader'
    });

    loading.present();
  }

}