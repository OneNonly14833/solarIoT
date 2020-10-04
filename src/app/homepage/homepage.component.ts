import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { multi } from './data';

import { AuthenticationService } from '../../app/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

export interface Item { name: string; }

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  checkUser = true;
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;

  multi: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  constructor(private afs: AngularFirestore, private authC: AuthenticationService, private authCheck: AngularFireAuth){
      this.itemsCollection = afs.collection('items');
      this.items = this.itemsCollection.valueChanges();
      Object.assign(this, { multi });
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
