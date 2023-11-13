import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Usuario } from '../../models/usuario';

import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { UsuarioService } from '../../services/usuario.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  // styleUrl: './login.component.css'
})
export class LoginComponent {

  loginService: LoginService = inject(LoginService);

  formLogin!: FormGroup;
  error: String = "";
  remember: boolean = false;
  credentials = {
    usuario: '',
    password: ''
  }

  usuarioCero: boolean = true;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.crearFormulario();
    // this.verificarUsuarios();
    // this.verificarRecordar();
  }

  // verificarUsuarios() {
  //   this.usuarioService.getUsuarios()
  //     .subscribe((resp: any) => {
  //       if (resp) {
  //         console.log('Usuarios encontrados');
  //       }
  //     }, (err) => {
  //       console.error('error encontrado', err.error)
  //       this.usuarioCero = true;
  //     });
  // }

  crearFormulario() {
    if (localStorage.getItem('recordar')) {
      this.formLogin = this.fb.group({
        username: [localStorage.getItem('usuario'), Validators.required],
        password: [localStorage.getItem('password'), Validators.required],
        recordar: [true]
      });
    } else {
      this.formLogin = this.fb.group({
        username: [, Validators.required],
        password: [, Validators.required],
        recordar: []
      });
    }
  }

  recordar(valor: boolean) {
    if (valor) {
      localStorage.setItem('recordar', 'OK');
      localStorage.setItem('usuario', this.formLogin.value.username);
      localStorage.setItem('password', this.formLogin.value.password);
    } else {
      localStorage.removeItem('recordar');
      localStorage.removeItem('usuario');
      localStorage.removeItem('password');
    }
  }

  acceder() {
    let usuario: Usuario = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    };

    if (this.formLogin.invalid) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Ingrese correctamente sus credenciales'
      });
      return;
    }

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully"
    });

    this.loginService.getLogin(usuario)
      .subscribe({
        next: (resp: any) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('userid', resp.usuario.id);
          localStorage.setItem('username', resp.usuario.username);
          localStorage.setItem('role', resp.usuario.rol.nombre);
          Toast.fire({
            icon: 'success',
            title: 'Acceso correcto'
          });

          this.recordar(this.formLogin.value.recordar);

          this.router.navigate(['pages/dashboard']);
        },
        error: err => {
          console.error('Error', err.error.message);
          this.error = err.error.message;
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: ' ' + this.error
          });
        },
        complete: () => { }
      });
  }

}
