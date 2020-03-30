import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  public doLogOut() {
    this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        Swal.fire('Error al cerrar sesión', error.message, 'error');
      });
  }
}
