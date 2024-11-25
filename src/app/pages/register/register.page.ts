import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { ValidationErrors } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  regForm : FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    public formBuilder:FormBuilder, 
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    private firestore: AngularFirestore,
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
    }, { validators: this.passwordMatchValidator }); 
  }

  get errorControl(){
    return this.regForm?.controls;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
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

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  async register() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.regForm.valid) {
      const { email, password, firstName, lastName } = this.regForm.value;

      try {
        // Registra al usuario con correo y contraseña
        const userCredential = await this.authService.registerUser(email, password);
        
        // Guarda el nombre y apellido en Firestore
        await this.firestore.collection('users').doc(userCredential.user.uid).set({
          firstName,
          lastName,
          email
        });

        loading.dismiss();
        this.router.navigate(['/login']);
      } catch (error) {
        console.error("Error al registrar: ", error);
        loading.dismiss();
      }
    }
  }
}
