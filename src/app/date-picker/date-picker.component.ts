import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { NeoStatsService } from '../neo-stats.service';
Chart.register(...registerables);

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  speeds: any = {};
  avarages: any = [];
  chartData: any = {};

  chart!: Chart<'bar', string[], string>;
  constructor(private neoStatsService: NeoStatsService) {}

  //onFormSubmit

  onFormSubmit(range: any) {
    console.log(range);
    let startDate: string = range.StartDate;
    let endDate: string = range.Enddate;
    // this.rangePost.reset();
    console.log(startDate);
    this.neoStatsService.getRange(startDate, endDate).subscribe((data: any) => {
      console.log(data);
      console.log(data.near_earth_objects);
      let totalArray = Object.entries(data.near_earth_objects);
      console.log(totalArray);

      let array: any = [];

      for (let earthObject in data.near_earth_objects) {
        let childObj = data.near_earth_objects[earthObject];
        for (let i = 0; i < childObj.length; i++) {
          array.push(childObj[i]);
        }
      }
      console.log(array);

      let velocity: any = [];

      for (let j = 0; j < array.length; j++) {
        velocity.push(
          array[j].close_approach_data[0].relative_velocity.kilometers_per_hour
        );
      }
      console.log(velocity);
      // Sort the numbers in ascending order:
      velocity.sort(function (a: any, b: any) {
        return a - b;
      });

      let highest = velocity[velocity.length - 1];
      console.log(highest);

      let obj: any = {};
      for (let k = 0; k < array.length; k++) {
        if (
          array[k].close_approach_data[0].relative_velocity
            .kilometers_per_hour === highest
        ) {
          obj.id = array[k].id;
          obj.speed =
            array[
              k
            ].close_approach_data[0].relative_velocity.kilometers_per_hour;
        }
      }
      console.log(obj);
      this.speeds = obj;

      let diameterObj: any = {};
      for (let k = 0; k < array.length; k++) {
        let avarage =
          (array[k].estimated_diameter.kilometers.estimated_diameter_min +
            array[k].estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        diameterObj.id = array[k].id;
        diameterObj.min =
          array[k].estimated_diameter.kilometers.estimated_diameter_min;
        diameterObj.max =
          array[k].estimated_diameter.kilometers.estimated_diameter_max;
        diameterObj.avarage = avarage;
        this.avarages.push(diameterObj);

        //console.log(diameterObj);
      }
      console.log(this.avarages);

      //chart calculation
      let dateArray: any = [];
      let AsteriodCount: any = [];
      console.log(totalArray);
      for (let m = 0; m < totalArray.length; m++) {
        console.log(totalArray[m]);
        let childArray: any = totalArray[m];
        for (let n = 0; n < childArray.length; n++) {
          console.log(childArray[n]);
          if (n === 0) {
            dateArray.push(childArray[n]);
            console.log(childArray[n]);
          } else if (n === 1) {
            AsteriodCount.push(childArray[n].length);
            console.log(childArray[n].length);
          }
          //console.log();
        }
        //dateArray.push(dateArray.push(childArray[0]));
        //let arraymmm: any = totalArray[m][1];
        //let length: number = arraymmm.length;
        //AsteriodCount.push(dateArray.push(childArray.length));
      }
      this.chartData.date = dateArray;
      this.chartData.count = AsteriodCount;
      console.log(dateArray);
      console.log(AsteriodCount);

      //console.log(this.chartData);
      this.chart = new Chart('MyChart', {
        type: 'bar',

        data: {
          labels: this.chartData.date,
          datasets: [
            {
              label: 'total number of asteroids',
              data: this.chartData.count,
              backgroundColor: 'blue',
            },
          ],
        },
        options: {
          aspectRatio: 2.5,
        },
      });
    });
  }
  // createChart

  ngOnInit(): void {}
}
