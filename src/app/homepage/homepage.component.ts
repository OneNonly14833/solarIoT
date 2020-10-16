import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})

export class HomepageComponent implements OnInit {
  total = '1564';
  humidity = '80';
  temperature = '76.1';
  power = '254';
  irradiance = '50';
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

  locations: Location[] = [
    {value: 'location1', label: 'Location 1'},
    {value: 'location2', label: 'Location 2'},
    {value: 'location3', label: 'Location 3'},
  ];
  selectedLocation = this.locations[0].value;

  private dataCollection: AngularFirestoreCollection<Location>;
  datas: Observable<Location[]>;

  datar: any;
  temp: any[];
  today: number = Date.now();
  constructor(private afs: AngularFirestore, private authC: AuthenticationService, private authCheck: AngularFireAuth, private graphP: GraphPlotService, public router: Router){
    this.graphP.dataUpdate$.subscribe(value => {
      this.timestamp = value.lastUpdate.toDate();
      // console.log(this.timestamp);
    })
    this.graphP.graphPower$.subscribe(value => {
      this.powerg = [...value];
    });
    this.graphP.graphIrradiance$.subscribe(value => {
      this.irradianceg = [...value];
    });
    this.graphP.graphTemperature$.subscribe(value => {
      this.temperatureg = [...value];
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
  }

  ngOnInit(): void {
    this.dataCollection = this.afs.collection<Location>('users/ZEOIOT/locations');
    this.datas = this.dataCollection.valueChanges();
    this.datas.forEach(x => {
      this.newData = x;
      this.selectedLocation = this.newData[0].label;
      // console.log(this.selectedLocation);
      this.router.navigate(['/dashboard'], { queryParams: { loc: this.selectedLocation } });
      console.log('Init Trigger');
      this.graphP.updateLoc(this.selectedLocation);
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
