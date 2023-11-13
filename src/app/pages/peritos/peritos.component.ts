import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Perito } from '../../models/perito';
import { PeritosService } from '../../services/peritos.service';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-peritos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DataTablesModule],
  templateUrl: './peritos.component.html',
  styles: ``
})
export class PeritosComponent implements OnInit {
  peritoForm!: FormGroup;
  peritos: Perito[] = [];
  edit = false;
  nuevo = false;

  peritoService: PeritosService = inject(PeritosService);

  constructor() {}

  ngOnInit() {
    this.crearFormulario();
    this.cargarPeritos();
  }

  crearFormulario() {
    this.peritoForm = new FormGroup({
      'apellidos': new FormControl('', Validators.required),
      'nombres': new FormControl('', Validators.required),
      'estado': new FormControl(1, Validators.required),
      'id': new FormControl(''),
    });
  }

  cargarPeritos() {
    this.peritoService.getPeritos()
    .subscribe({
      next: (resp: Perito[])=>{
        this.peritos = resp || [];
        console.log('respuesta: ', resp);
      },
      error: err=> console.error(err),
      complete: ()=> {
        console.log('Se termino de hacer la consulta');
      }
    });
  }

  registrar() {
    if (this.peritoForm.invalid) {
      alert("Debe rellenar correctamente los campos");
      return;
    }

    let perito: Perito = {
      apellidos: this.peritoForm.value.apellidos,
      nombres: this.peritoForm.value.nombres,
    };

    this.peritoService.savePerito(perito)
    .subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: err=> console.log(err),
      complete: ()=>this.limpiarForm()
    });
  }

  editar(perito: Perito) {
    this.peritoForm.setValue({
      apellidos: perito.apellidos,
      nombres: perito.nombres,
      estado: perito.estado,
      id: perito.id,
    });

    console.log(perito);

    this.edit = true;
    this.nuevo = true;
  }

  actualizar() {
    if (this.peritoForm.invalid) {
      alert("Debe rellenar correctamente los campos");
      return;
    }

    let peri: Perito = {
      apellidos: this.peritoForm.value.apellidos,
      nombres: this.peritoForm.value.nombres,
      estado: this.peritoForm.value.estado,
      id: this.peritoForm.value.id,
    };

    this.peritoService.editPerito(peri).subscribe({
      next: (resp) => {
        console.log(resp);
        this.limpiarForm();
      },
      error: err=>console.error(err),
      complete: ()=> {
        console.log('Perito actualizado')
      }
    });
  }

  eliminar(id: any) {
    if (confirm("¿esta seguro?")) {
      this.peritoService.deletePerito(Number(id)).subscribe((resp) => {
        console.log(resp);
        this.limpiarForm();
      });
    }
  }

  limpiarForm() {
    this.peritoForm.reset();
    this.cargarPeritos();
      this.edit = false;
      this.nuevo = false;
  }
}
