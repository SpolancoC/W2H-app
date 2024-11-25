import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  regForm : FormGroup;
  showPassword: boolean = false;

  constructor(
    public formBuilder:FormBuilder, 
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    private router: Router
  ) {}

  redirect_login(){
    this.router.navigate(['/login']);
  }

  ngOnInit(){
    this.regForm = this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[
        Validators.required, 
        Validators.email, 
        Validators.pattern ("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      password: ['',[
        Validators.required,
        Validators.pattern ("(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}")
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator }); // Aplicamos el validador al FormGroup
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get passwordControl() {
    return this.regForm.controls?.['password'];
  }

  get hasUpperCase() {
    return /[A-Z]/.test(this.passwordControl?.value || '');
  }

  get hasNumber() {
    return /\d/.test(this.passwordControl?.value || '');
  }

  // Función de validación de contraseñas coincidentes
  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    // Si las contraseñas no coinciden
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null; // Si coinciden, no hay error
  }


  async singUp(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.regForm?.valid){
      //const user = await this.authService.registerUser(email,password)
    }
  }
}
