import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

 constructor(
   public fireservices:AngularFirestore
   ){

 }
}
