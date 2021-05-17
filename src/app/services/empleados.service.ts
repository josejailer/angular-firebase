import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { COLLECTIONS } from '../const/collections';
import { map } from 'rxjs/operators';
import { IEmpleados } from '../models/IEmpleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private afs: AngularFirestore) { }
  
  public getEmpleados() :Observable<IEmpleados[]>{
		return this.afs.collection<IEmpleados>(COLLECTIONS.EMPLADOS).snapshotChanges()
			.pipe(map(changes => {
				return changes.map(action => {
					const data = action.payload.doc.data() as IEmpleados;
					data.idEmpleado = action.payload.doc.id;
					console.log("fecha" + data);
					return data;
				});
			}));
	}
 /* addtask(task: ITask): void {
		task.userId = this.afsAuth.auth.currentUser.uid;
		this.taskCollection.add(task);
	}
	updatetask(task: ITask): void {
		let idtask = task.id;
		this.taskDoc = this.afs.doc<ITask>(`tasks/${idtask}`);
		this.taskDoc.update(task);
	}
	deletetask(idtask: string): void {
		this.taskDoc = this.afs.doc<ITask>(`tasks/${idtask}`);
		this.taskDoc.delete();
	}*/
  getEmpleadosXid(idEmpleado: string): Observable<any> {
		return this.afs.collection(COLLECTIONS.EMPLADOS).doc(idEmpleado).snapshotChanges();
  }

  addEmpleados(empleados: IEmpleados) : Promise<any> {
	  
		return this.afs.collection<IEmpleados>(COLLECTIONS.EMPLADOS).add(empleados);
	  
	
	}
  updateEmpleados(idEmpleado: string, data:any): Promise<any> {
		return this.afs.collection(COLLECTIONS.EMPLADOS).doc(idEmpleado).update(data);
	  }
 public deleteEmpleado(idEmpleado:string): Promise<any> {
		return this.afs.collection(COLLECTIONS.EMPLADOS).doc(idEmpleado).delete();
	  }
}
