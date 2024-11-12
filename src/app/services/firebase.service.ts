import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth;

  constructor() {
    // Inicializa la aplicación de Firebase
    const firebaseApp = initializeApp({
      apiKey: "AIzaSyCzqepEmHDl_3RF463Is0Fs1-vT9T7xEMo",
      authDomain: "w2h-app.firebaseapp.com",
      projectId: "w2h-app",
      storageBucket: "w2h-app.firebasestorage.app",
      messagingSenderId: "278396831171",
      appId: "1:278396831171:web:3a4455b3864374e891a976"
    });

    // Inicializa el servicio de autenticación
    this.auth = getAuth(firebaseApp);
  }

  // Función para registrar un nuevo usuario
  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  // Función para iniciar sesión
  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  // Función para recuperar contraseña
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      throw error;
    }
  }
}
