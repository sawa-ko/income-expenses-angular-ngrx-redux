import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import 'firebase/firestore';

import { User } from 'firebase';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
  ) {}

  public crearUsuario(nombre: string, email: string, password: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((resp: any) => {
        this.firestore
          .collection(resp.user.uid)
          .doc('usuario')
          .set({ nombre, email, password, uid: resp.user.uid })
          .then(() => {
            this.router.navigate(['/dashboard']);
          })
          .catch(error => {
            this.auth.signOut();
            Swal.fire('Tenemos problemas', error.message, 'error');
          });
      })
      .catch(error => {
        Swal.fire('Tenemos problemas', error.message, 'error');
      });
  }

  public login(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        Swal.fire('Tenemos problemas', error.message, 'error');
      });
  }

  public initAuthListener() {
    this.auth.authState.subscribe((user: User) => {
      console.log(user);
    });
  }

  public isAuth() {
    return this.auth.authState.pipe(
      map(user => {
        if (user == null) {
          this.router.navigate(['login']);
        }

        return user != null;
      }),
    );
  }
}
