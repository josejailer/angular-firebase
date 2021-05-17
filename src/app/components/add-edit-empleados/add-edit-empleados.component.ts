import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICargos } from 'src/app/models/ICargos';
import { IPaises } from 'src/app/models/IPaises';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { PaisesService } from 'src/app/services/paises.service';
import { CargosService } from '../../services/cargos.service'
@Component({
  selector: 'app-add-edit-empleados',
  templateUrl: './add-edit-empleados.component.html',
  styleUrls: ['./add-edit-empleados.component.css']
})
export class AddEditEmpleadosComponent implements OnInit {
  empleadosForm: FormGroup;
  idEmpleado: any;
  idEmpleadoDetalle: any;
  mostrarBotonSubmit:boolean=true;
  submitted = false;
  fontStyleControl = new FormControl();
  areaCargos?: string;
  isChecked :boolean=true;
  loading: boolean = false;
  titulo: string = "Nuevo Empleado";
  listCargos: Array<ICargos> = [];
  listPaises: Array<IPaises> = [];
  selected = 'option2';


  public format: string = 'yyyy-MM-dd HH:mm';
  constructor(
    private formBuilder: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private cargosService: CargosService,
    private toastr: ToastrService,
    private empleadosService: EmpleadosService,
    private paisesService: PaisesService,
  ) {
    this.empleadosForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      pais: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      fechaContratacion: ['', Validators.required],
      estado: ['', Validators.required],
      area: ['', Validators.required],
      cargo: ['', Validators.required],
      comision:  [''],
      edad: ['', Validators.required, Validators.min(18)],
    });

    this.idEmpleado = this.aRoute.snapshot.paramMap.get('idEmpleado');
    this.idEmpleadoDetalle = this.aRoute.snapshot.paramMap.get('idEmpleadoDetalle');
  }

  ngOnInit(): void {
    this.listaPaises();
    if (this.idEmpleado !== undefined && this.idEmpleado !==null) {
      this.esEditar();
     }
     if (this.idEmpleadoDetalle !== undefined && this.idEmpleadoDetalle !== null) {
      this.detalle();

     }
  }
  public listaCargos(area:string) {
    this.cargosService.getCargos(area).subscribe(rs => {
      this.listCargos = rs;
      console.log(rs);
    });
  }

  public listaPaises() {
    this.paisesService.getAllPaises().subscribe(rs => {
      this.listPaises = rs;
      console.log(rs);
    });
  }
  agregarEditarEmpleado() {
    this.submitted = true;
    if (this.empleadosForm.invalid) {
      return;}
    if (this.idEmpleado === null || this.idEmpleado === undefined) {
      this.agregarEmpleado();
    } else {
      this.actualizarEmpleado(this.idEmpleado);
    }
  }
  agregarEmpleado() {
    const empleado: any = {
      nombreEmpleado: this.empleadosForm.value.nombre,
      fechaNacimientoEmplado: this.empleadosForm.value.fechaNacimiento,
      paisEmplado: this.empleadosForm.value.pais,
      nombreUsuario: this.empleadosForm.value.nombreUsuario,
      fechaContratacionEmplado: this.empleadosForm.value.fechaContratacion,
       estadoEmpleado: this.empleadosForm.value.estado,
      areaEmpleado: this.empleadosForm.value.area,
      cargoEmpleado: this.empleadosForm.value.cargo,
      edadEmpleado: this.empleadosForm.value.edad,
      comision: this.empleadosForm.value.comision,
    }
    this.loading = true;
    this.empleadosService.addEmpleados(empleado).then(() => {
      this.toastr.success('El empleado fue registrado con exito!', 'Empleado Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/empleados']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  actualizarEmpleado(idEmpleado: string) {
    const empleado: any = {
      nombreEmpleado: this.empleadosForm.value.nombre,
      fechaNacimientoEmplado: this.empleadosForm.value.fechaNacimiento,
      paisEmplado: this.empleadosForm.value.pais,
      nombreUsuario: this.empleadosForm.value.nombreUsuario,
      fechaContratacionEmplado: this.empleadosForm.value.fechaContratacion,
        estadoEmpleado: this.empleadosForm.value.estado,
      areaEmpleado: this.empleadosForm.value.area,
      cargoEmpleado: this.empleadosForm.value.cargo,
      edadEmpleado: this.empleadosForm.value.edad,
      comision: this.empleadosForm.value.comision,
    }
    this.loading = true;
    this.empleadosService.updateEmpleados(idEmpleado, empleado).then(() => {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito', 'Empleado modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/empleados']);
    })
  }

  esEditar() {
    this.titulo = 'Editar Empleado'
      this.empleadosService.getEmpleadosXid(this.idEmpleado).subscribe(data => {
        this.empleadosForm.setValue({
          nombre: data.payload.data()['nombreEmpleado'],
          fechaNacimiento: data.payload.data()['fechaNacimientoEmplado'],
          pais: data.payload.data()['paisEmplado'],
          nombreUsuario: data.payload.data()['nombreEmpleado'],
          fechaContratacion: data.payload.data()['fechaContratacionEmplado'],
          estado: data.payload.data()['estadoEmpleado'],
          area: data.payload.data()['areaEmpleado'],
          cargo: data.payload.data()['cargoEmpleado'],
          edad: data.payload.data()['edadEmpleado'],
          comision: data.payload.data()['comision'],

        })
      })
  }
  detalle() {
    this.titulo = 'Detalle Empleado'
    this.empleadosForm.disable();
    this.mostrarBotonSubmit=false;
      this.empleadosService.getEmpleadosXid(this.idEmpleadoDetalle).subscribe(data => {
        this.empleadosForm.setValue({
          nombre: data.payload.data()['nombreEmpleado'],
          fechaNacimiento: data.payload.data()['fechaNacimientoEmplado'],
          pais: data.payload.data()['paisEmplado'],
          nombreUsuario: data.payload.data()['nombreEmpleado'],
          fechaContratacion: data.payload.data()['fechaContratacionEmplado'],
          area: data.payload.data()['areaEmpleado'],
          cargo: data.payload.data()['cargoEmpleado'],
          edad: data.payload.data()['edadEmpleado'],
          comision: data.payload.data()['comision'],
          estado: data.payload.data()['estadoEmpleado'],

        })
      })
  }
}
