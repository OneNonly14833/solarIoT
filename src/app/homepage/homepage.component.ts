import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import * as $ from 'jquery';
// import * as CanvasJS from '../assets/canvasjs.min';

export interface Item { name: string; }

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;
  constructor(private afs: AngularFirestore){
      this.itemsCollection = afs.collection('items');
      this.items = this.itemsCollection.valueChanges();
  }
  ngOnInit(): void {
    // const dataPoints = [];
    // let dpsLength = 0;
    // const chart = new CanvasJS.Chart("chartContainer",{
    //   exportEnabled: true,
    //   title:{
    //     text:"Live Chart with Data-Points from External JSON"
    //   },
    //   data: [{
    //     type: "spline",
    //     dataPoints : dataPoints,
    //   }]
    // });
    // any.getJSON('https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=25&length=20&type=json&callback=?', (data) => {
    //   any.each(data, function(key, value){
    //     dataPoints.push({x: value[0], y: parseInt(value[1])});
    //   });
    //   dpsLength = dataPoints.length;
    //   chart.render();
    //   updateChart();
    // });
    // function updateChart() {
    //   $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dpsLength + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json&callback=?", function(data) {
    //   $.each(data, function(key, value) {
    //     dataPoints.push({
    //       x: parseInt(value[0]),
    //       y: parseInt(value[1])
    //       });
    //       dpsLength++;
    //     });
    //     if (dataPoints.length >  20 ) {
    //           dataPoints.shift();
    //         }
    //     chart.render();
    //     setTimeout(function(){updateChart()}, 1000);
    //   });
    // }
  }
}
