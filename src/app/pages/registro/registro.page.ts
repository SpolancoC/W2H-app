import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service'; // Asegúrate de que la ruta sea la correcta

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private firebaseService: FirebaseService) {}

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await this.firebaseService.register(this.email, this.password);
      alert('Registro exitoso');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un error al registrar al usuario');
    }
  }
}
