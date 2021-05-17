import { ToastrService } from 'ngx-toastr';
import { IEmpleados } from 'src/app/models/IEmpleados';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { AlertComfirmacionComponent } from "../alert-comfirmacion/alert-comfirmacion.component";
@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombreEmpleado','cargoEmpleado','edadEmpleado', 'fechaContratacionEmplado','idEmpleado'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private empleadosService: EmpleadosService,
     private toastr: ToastrService,
     public dialogo: MatDialog
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
        this.dialogo
          .open(AlertComfirmacionComponent, {
            data: `¿Estas seguro de eliminar este Empleado?`
          })
          .afterClosed()
          .subscribe((confirmado: Boolean) => {
            if (confirmado) {
              this.empleadosService.deleteEmpleado(idEmpleado).then(() => {
                console.log('empelado eliminado con exito');
                this.toastr.error('El empleado fue eliminado con exito', 'Registro eliminado!', {
                  positionClass: 'toast-bottom-right'
                });
              }).catch(error => {
                console.log(error);
              });
            } else {
            }
      });
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

