import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { powerg } from './power';
import { irradianceg } from './irradiance';
import { temperatureg } from './temperature';

import { AuthenticationService } from '../../app/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { FormControl } from '@angular/forms';

export interface Item { name: string; }

interface Location {
  value: string;
  label: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  disableSelect = new FormControl(false);
  checkUser = true;
  location = 'Location';
  total = '1564';
  humidity = '80';
  temperature = '76.1';
  power = '254';
  irradiance = '50';
  timestamp = '25th June 2020 22:10';

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;

  locations: Location[] = [
    {value: 'location1', label: 'Location 1'},
    {value: 'location2', label: 'Location 2'},
    {value: 'location3', label: 'Location 3'},
  ];
  selectedLocation = this.locations[0].value;

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
  constructor(private afs: AngularFirestore, private authC: AuthenticationService, private authCheck: AngularFireAuth){
      this.itemsCollection = afs.collection('items');
      this.items = this.itemsCollection.valueChanges();
      Object.assign(this, { powerg });
      Object.assign(this, { temperatureg });
      Object.assign(this, { irradianceg });
      this.authC.userStatus$.subscribe(value => { //Using JSON observable to monitor Authentication Service user login
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
  ngOnInit(): void {}
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
