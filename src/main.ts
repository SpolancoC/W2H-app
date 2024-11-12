import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Importa Firebase
import { initializeApp } from "firebase/app";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCzqepEmHDl_3RF463Is0Fs1-vT9T7xEMo",
  authDomain: "w2h-app.firebaseapp.com",
  projectId: "w2h-app",
  storageBucket: "w2h-app.firebasestorage.app",
  messagingSenderId: "278396831171",
  appId: "1:278396831171:web:3a4455b3864374e891a976"
};

// Inicializa Firebase
initializeApp(firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
