import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { ValidationErrors } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  logForm : FormGroup;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public formBuilder:FormBuilder, 
  ) {}
  
  ngOnInit(){
    this.logForm = this.formBuilder.group({
      email: ['',[
        Validators.required, 
        Validators.email, 
        Validators.pattern ("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      password: ['',[
        Validators.required,
        Validators.pattern ("(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}")
      ]],
    })
  }

  redirect_restore(){
    this.router.navigate(['/restore']);
  }

  redirect_register(){
    this.router.navigate(['/register']);
  }
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get errorControl(){
    return this.logForm?.controls;
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.logForm?.valid){
      const user = await this.authService.loginUser(this.logForm.value.email,this.logForm.value.password).catch((error)=>{
        console.log(error);
        loading.dismiss()
      })
      if(user){
        loading.dismiss();
        this.router.navigate(['/home'])
      }else{
        console.log('Ingrese datos validos')
      }
    }
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

