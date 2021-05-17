import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListEmpleadosComponent} from './components/list-empleados/list-empleados.component';
import {AddEditEmpleadosComponent} from './components/add-edit-empleados/add-edit-empleados.component';


const routes: Routes = [
  { path: '', redirectTo: 'empleados', pathMatch: 'full' },
  { path: 'empleados', component: ListEmpleadosComponent },
  { path: 'crear-empleado', component: AddEditEmpleadosComponent },
  { path: 'editarEmpleado/:id', component: AddEditEmpleadosComponent },
  { path: 'detalleEmpleado/:id', component: AddEditEmpleadosComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
