import { ToastrService } from 'ngx-toastr';
import { IEmpleados } from 'src/app/models/IEmpleados';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombreEmpleado','edadEmpleadp', 'fechaContratacionEmplado','idEmpleado'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private empleadosService: EmpleadosService,
     private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.empleadosService.getEmpleados()
      .subscribe(posts => (this.dataSource.data = posts));
    this.listaEmplados();
  }
  public listaEmplados() {
    this.empleadosService.getEmpleados().subscribe(rs => {
      this.dataSource.data = rs;
      console.log(rs);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  deleteEmpleado(idEmpleado: any) {
    if (idEmpleado !== undefined) {
      if (confirm('¿Estas seguro de borrar esta Empleado?')) {
        this.empleadosService.deleteEmpleado(idEmpleado).then(() => {
          console.log('empelado eliminado con exito');
          this.toastr.error('El empleado fue eliminado con exito', 'Registro eliminado!', {
            positionClass: 'toast-bottom-right'
          });
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

