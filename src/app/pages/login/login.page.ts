import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private firebaseService: FirebaseService) {}

  async onLogin() {
    try {
      await this.firebaseService.login(this.email, this.password);
      alert('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un error al iniciar sesión');
    }
  }
}
