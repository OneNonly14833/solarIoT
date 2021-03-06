import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraphPlotService } from '../graph-plot.service';
import { AuthenticationService } from '../../app/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { FormControl } from '@angular/forms';
import { Router, Route } from '@angular/router';

export interface Item {
  name: string;
  value: number;
}

export interface Location {
  value: string;
  label: string;
  name: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})

export class HomepageComponent implements OnInit {
  total = 1564;
  humidity = 80.0;
  temperature = 36.1;

  aCurrent = 0;
  aDCRef = 3.3;
  supVolt = 2.34;
  aSensitiv = 44;
  aCal = 0.3;
  power = 254;

  pCurrent = 0;
  irradiance = 50;

  timestamp: any;
  newData: Location[];
  powerg: any[];
  irradianceg: any[];
  temperatureg: any[];
  view: any[] = [600, 300];
  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  autoScale: boolean = true;
  xAxisLabel1: string = 'Time (min)';
  yAxisLabel1: string = 'Temperature (°C)';
  xAxisLabel2: string = 'Time (min)';
  yAxisLabel2: string = 'Irradiance (W/m²)';
  xAxisLabel3: string = 'Time (min)';
  yAxisLabel3: string = 'Power (W)';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  disableSelect = new FormControl(false);
  checkUser = true;
  location = 'Location';
  selectedLocation: any;

  private dataCollection: AngularFirestoreCollection<Location>;
  datas: Observable<Location[]>;
  dataTest: Observable<any>;

  datar: any;
  temp: any[];
  today: number = Date.now();
  constructor(private db: AngularFireDatabase, private afs: AngularFirestore, private authC: AuthenticationService, private authCheck: AngularFireAuth, private graphP: GraphPlotService, public router: Router){
    this.graphP.dataUpdate$.subscribe(value => {
      // this.timestamp = value.lastUpdate.toDate();
      this.timestamp = value;
      // console.log(this.timestamp);
    });
    this.graphP.sensorUpdate$.subscribe(value => {
      this.humidity = value[9].humd;
      this.temperature = value[9].temp;
      this.irradiance = value[9].humd;
      console.log(Number(value[9].aCur));
      this.aCurrent = (((((Number(value[9].aCur) * this.aDCRef) / 1024) - this.supVolt) * 1000) / this.aSensitiv) + this.aCal;
      console.log(this.aCurrent);
      this.power = 240 * this.aCurrent;
      console.log(value);
    });
    // this.graphP.graphPower$.subscribe(value => {
    //   this.powerg = [...value];
    // });
    // this.graphP.graphIrradiance$.subscribe(value => {
    //   this.irradianceg = [...value];
    // });
    this.graphP.graphTemperature$.subscribe(value => {
      // console.log(value);
      value.forEach(x => {
          console.log(x.time);
          console.log(x.temp);
      });
      // this.temperatureg = [...value];
    });
    this.authC.userStatus$.subscribe(value => { // Using JSON observable to monitor Authentication Service user login
      // console.log(value);
      // this.checkUser = value;
      if (localStorage.getItem('currentUser')) {
        this.checkUser = false;
        console.log('User exist');
      }else{
        this.checkUser = true;
        console.log('No user');
      }
    });
    authCheck.onAuthStateChanged((success) => { // Replaces previous function
      if (success) {
        this.checkUser = false;
        console.log('User logged in');
      }
    });
  }
  logout(): void{
    this.authC.logout();
  }

  updateParam(value): void{
    console.log('Update Trigger');
    this.router.navigate(['/dashboard'], { queryParams: { loc: value } });
    this.graphP.updateLoc(value);
    this.location = value;
  }
  ngOnInit(): void {
    // this.dataCollection = this.afs.collection<Location>('users/ZEOIOT/locations');
    // this.datas = this.dataCollection.valueChanges();
    // this.datas.forEach(x => {
    //   this.newData = x;
    //   this.selectedLocation = this.newData[0].label;
    //   // console.log(this.selectedLocation);
    //   this.router.navigate(['/dashboard'], { queryParams: { loc: this.selectedLocation } });
    //   console.log('Init Trigger');
    //   this.graphP.updateLoc(this.selectedLocation);
    // });
    this.dataTest = this.db.list('users/ZEO/locations').valueChanges();
    this.dataTest.forEach(x => {
      console.log(x);
      this.newData = x;
      this.selectedLocation = this.newData[0];
      // console.log(this.selectedLocation);
      this.router.navigate(['/dashboard'], { queryParams: { loc: this.selectedLocation.value } });
      console.log('Init Trigger');
      this.graphP.updateLoc(this.selectedLocation.value);
      this.location = this.selectedLocation.value;
    });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
