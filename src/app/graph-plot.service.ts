import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';

import { powerg } from './homepage/power';
import { irradianceg } from './homepage/irradiance';
import { temperatureg } from './homepage/temperature';

export interface Data{
  name: string;
  value: number;
}
export interface DataT {
  lastUpdate: number;
}

@Injectable({
  providedIn: 'root'
})
export class GraphPlotService {
  // private powerCollection: AngularFirestoreCollection<Data>;
  // powers: Observable<Data[]>;
  // private tempCollection: AngularFirestoreCollection<Data>;
  // temps: Observable<Data[]>;
  // private iraddCollection: AngularFirestoreCollection<Data>;
  // iradds: Observable<Data[]>;
  // private dataCollection: AngularFirestoreDocument<DataT>;
  // datas: Observable<DataT>;

  // private power: Subject<any> = new Subject<any>();
  // graphPower$ = this.power.asObservable();
  // private temperature: Subject<any> = new Subject<any>();
  // graphTemperature$ = this.temperature.asObservable();
  // private irradiance: Subject<any> = new Subject<any>();
  // graphIrradiance$ = this.irradiance.asObservable();

  locationSelect: string;

  testData: Observable<any>;
  private times: Subject<any> = new Subject<any>();
  dataUpdate$ = this.times.asObservable();
  sensorData: Observable<any>;
  private sensor: Subject<any> = new Subject<any>();
  sensorUpdate$ = this.sensor.asObservable();
  temperatureData: Observable<any>;
  private temperature: Subject<any> = new Subject<any>();
  graphTemperature$ = this.temperature.asObservable();

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase){
   }
   updateLoc(value: string): void{
    console.log(value);
    this.locationSelect = value;
    this.testData = this.db.object('/locations/' + this.locationSelect + '/lastUpdate').valueChanges();
    this.testData.forEach(x => {
      this.times.next(x);
    });
    this.sensorData = this.db.list('locations/' + this.locationSelect + '/sensors', ref => ref.limitToLast(10)).valueChanges();
    this.sensorData.forEach(x => {
      this.sensor.next(x);
    });
    this.temperatureData = this.db.list('locations/' + this.locationSelect + '/sensors', ref => ref.limitToLast(100)).valueChanges();
    this.temperatureData.forEach(x => {
      this.temperature.next(x);
    });
    // this.dataCollection = this.afs.doc<DataT>(this.locationSelect + '/lastUpdate');
    // this.datas = this.dataCollection.valueChanges();
    // this.datas.forEach(x => {
    //   // console.log(x);
    //   this.times.next(x);
    // });
    // this.powerCollection = this.afs.collection<Data>('location1/power/series');
    // this.powers = this.powerCollection.valueChanges();
    // this.powers.forEach(x => {
    //   powerg[0].series = x;
    //   // console.log(powerg);
    //   this.power.next(powerg);
    // });
    // this.iraddCollection = this.afs.collection<Data>('location1/irradiance/series');
    // this.iradds = this.iraddCollection.valueChanges();
    // this.iradds.forEach(x => {
    //   irradianceg[0].series = x;
    //   // console.log(irradianceg);
    //   this.irradiance.next(irradianceg);
    // });
    // this.tempCollection = this.afs.collection<Data>('location1/temperature/series');
    // this.temps = this.tempCollection.valueChanges();
    // this.temps.forEach(x => {
    //   temperatureg[0].series = x;
    //   // console.log(temperatureg);
    //   this.temperature.next(temperatureg);
    // });
  }
}
