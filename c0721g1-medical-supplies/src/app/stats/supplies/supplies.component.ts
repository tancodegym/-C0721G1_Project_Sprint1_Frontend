import {Component, OnInit} from '@angular/core';
import {SuppliesStats} from '../../model/SuppliesStats';
import {Router} from '@angular/router';
import {SuppliesStatsService} from '../../service/supplies-stats.service';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {

  suppliesArr: SuppliesStats[];
  startDate: string;
  endDate: string;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  canvas: any;
  ctx: any;
  check = false;

  constructor(private router: Router,
              private suppliesService: SuppliesStatsService) {
    this.suppliesService.getAll().subscribe(value => {
      this.suppliesArr = value;
      this.getName(value);
      this.createDetailChart('abc', this.data, 'myChart');
      this.maxDate.setDate(this.maxDate.getDate() + 7);
      this.bsRangeValue = [this.bsValue, this.maxDate];
    });

  }

  ngOnInit(): void {
  }

  search() {
    if (this.bsRangeValue[0].getMonth() < 10 && this.bsRangeValue[0].getDate() < 10) {
      this.startDate = this.bsRangeValue[0].getFullYear().toString()
        + '-0' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-0' + this.bsRangeValue[0].getDate().toString();
    } else if (this.bsRangeValue[0].getMonth() < 10) {
      this.startDate = this.bsRangeValue[0].getFullYear().toString()
        + '-0' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-' + this.bsRangeValue[0].getDate().toString();
    } else if (this.bsRangeValue[0].getDate() < 10) {
      this.startDate = this.bsRangeValue[0].getFullYear().toString()
        + '-' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-0' + this.bsRangeValue[0].getDate().toString();
    } else {
      this.startDate = this.bsRangeValue[0].getFullYear().toString()
        + '-' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-' + this.bsRangeValue[0].getDate().toString();
    }
    if (this.bsRangeValue[0].getMonth() < 10 && this.bsRangeValue[0].getDate() < 10) {
      this.endDate = this.bsRangeValue[0].getFullYear().toString()
        + '-0' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-0' + this.bsRangeValue[0].getDate().toString();
    } else if (this.bsRangeValue[0].getMonth() < 10) {
      this.endDate = this.bsRangeValue[0].getFullYear().toString()
        + '-0' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-' + this.bsRangeValue[0].getDate().toString();
    } else if (this.bsRangeValue[0].getDate() < 10) {
      this.endDate = this.bsRangeValue[0].getFullYear().toString()
        + '-' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-0' + this.bsRangeValue[0].getDate().toString();
    } else {
      this.endDate = this.bsRangeValue[0].getFullYear().toString()
        + '-' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-' + this.bsRangeValue[0].getDate().toString();
    }
    this.suppliesService.searchSuppliesStats(this.startDate, this.endDate).subscribe(
      value => {
        this.suppliesArr = value;
        this.getName(value);
        this.createDetailChart('abc', this.data, 'myChart');
      },
      error => {
        this.check = true;
        this.suppliesArr = [];
        this.getName([]);
        this.createDetailChart('abc', this.data, 'myChart');
      }
    );
  }

  private data = {

    labels: [],
    datasets: [
      {

        data: [],
        borderColor: 'red',
        fill: true
      },
      {
        data: [],
        borderColor: 'green',
        fill: true
      },
      {
        data: [],
        borderColor: 'blue',
        fill: true
      },
      {
        data: [],
        borderColor: 'rgb(255, 205, 86)',
        fill: true
      },
      {
        data: [],
        borderColor: 'rgb(240, 115, 111)',
        fill: true
      }],
    HoverOfSet: 4
  };
  private createDetailChart(labels, data, myChart) {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    // @ts-ignore
    const chart = new Chart(this.ctx, {
      type: 'line',
      data: this.data,
    });
  }
  private getName(arr: SuppliesStats[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      this.data.labels.push(arr[i].name);
      this.data.datasets[0].data.push(arr[i].import_quantity);
      this.data.datasets[1].data.push(arr[i].quantity);
      this.data.datasets[2].data.push(arr[i].normal_supplies);
      this.data.datasets[3].data.push(arr[i].another);

    }
  }
}
