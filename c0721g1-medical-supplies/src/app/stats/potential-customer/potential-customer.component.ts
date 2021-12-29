import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PotentialCustomerService} from '../service/potential-customer.service';
import {PotentialCustomer} from '../model/potential-customer';

@Component({
  selector: 'app-potential-customer',
  templateUrl: './potential-customer.component.html',
  styleUrls: ['./potential-customer.component.css']
})
export class PotentialCustomerComponent implements OnInit {
  potentialArr: PotentialCustomer[];
  startDate: string;
  endDate: string;
  canvas: any;
  ctx: any;
  bsRangeValue: Date[];
  maxDate = new Date();
  bsValue = new Date();
  check = false;

  //data for chart
  private data = {
    labels: []
    ,
    datasets: [


      {
        type: 'bar',
        label: 'Doanh Số',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
      },

      {
        type: 'line',
        label: 'Giá trị',
        data: [],
        fill: false,
        borderColor: 'rgb(54, 162, 235)'
      }]
  };

  constructor(private router: Router,
              private potentialCustomerService: PotentialCustomerService) {
    this.potentialCustomerService.getAll().subscribe(value => {
      this.potentialArr = value;
      this.maxDate.setDate(this.maxDate.getDate() + 7);
      this.bsRangeValue = [this.bsValue, this.maxDate];
      this.getName(value);
      this.potentialCustomerChart("abc", this.data, 'myChart');

    });
  }

  ngOnInit(): void {


  }

  //get label for Chart
  private getName(arr: PotentialCustomer[]) {
    for (let i = 0; i < arr.length; i++) {
      this.data.labels.push(arr[i].name);
      this.data.datasets[0].data.push(arr[i].quantity);
      this.data.datasets[1].data.push(arr[i].total);
    }
    ;
  };


  private potentialCustomerChart(labels, data, myChart) {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    // @ts-ignore
    const chart = new Chart(this.ctx, {
      type: 'scatter',
      data: this.data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  search() {
    //fromDate

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
    }else{
      this.startDate = this.bsRangeValue[0].getFullYear().toString()
        + '-' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-' + this.bsRangeValue[0].getDate().toString();
    }
    ;
    //endDate
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
    } else{
      this.endDate = this.bsRangeValue[0].getFullYear().toString()
        + '-' + (this.bsRangeValue[0].getMonth() + 1).toString()
        + '-' + this.bsRangeValue[0].getDate().toString();
    }



    this.potentialCustomerService.searchCustomerStats(this.startDate, this.endDate).subscribe(value => {
      this.potentialArr = value;

    },error => {
      this.check = true;
      this.potentialArr = [];
      this.getName([]);
      this.potentialCustomerChart("abc", this.data, 'myChart');
    })

  }
}

