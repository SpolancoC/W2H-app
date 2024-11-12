import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage {
  email: string = '';

  constructor(private firebaseService: FirebaseService) {}

  async onResetPassword() {
    try {
      await this.firebaseService.resetPassword(this.email);
      alert('Correo de recuperación enviado');
    } catch (error) {
      console.error('Error al enviar correo de recuperación:', error);
      alert('Hubo un error al enviar el correo');
    }
  }
}