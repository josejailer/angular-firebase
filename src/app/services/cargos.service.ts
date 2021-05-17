import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { COLLECTIONS } from '../const/collections';
import { map } from 'rxjs/operators';
import { ICargos } from '../models/ICargos';
@Injectable({
  providedIn: 'root'
})
export class CargosService {

  constructor(private afs: AngularFirestore) { }
  
  public getCargos(area:string) :Observable<ICargos[]>{
		return this.afs.collection<ICargos>(COLLECTIONS.CARGOS+area).snapshotChanges()
			.pipe(map(changes => {
				return changes.map(action => {
					const data = action.payload.doc.data() as ICargos;
					data.idCargo= action.payload.doc.id;
					console.log("fecha" + data);
					return data;
				});
			}));
	}
}
