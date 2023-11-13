import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  usuarioService: UsuarioService = inject(UsuarioService);
  router: Router = inject(Router);
  usuarioForm!: FormGroup;
  usuario!: Usuario;

  constructor(){}

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.usuarioForm = new FormGroup({
      'nombres': new FormControl('', Validators.required),
      'apellidos': new FormControl('', Validators.required),
      'dni': new FormControl('', Validators.required),
      'username': new FormControl('', Validators.email),
      'password': new FormControl('', Validators.required),
    });
  }

  login(){
    if (!this.usuarioForm.valid) {
      alert('Datos incorrectos');
      return;
    }

    let newUser: Usuario = {
      'nombres': this.usuarioForm.get('nombres')?.value,
      'apellidos': this.usuarioForm.get('apellidos')?.value,
      'dni': this.usuarioForm.get('dni')?.value,
      'username': this.usuarioForm.get('username')?.value,
      'password': this.usuarioForm.get('password')?.value,
      'estado': 1
    }

    this.usuarioService.saveUsuario(newUser)
    .subscribe({
      next: (resp)=> console.log('resultado: ', resp),
      error: err=> console.error('error: ', err),
      complete: ()=> {
        console.log('Trabajo completado');
        this.router.navigate(['/']);
      },
    });

  }

}
