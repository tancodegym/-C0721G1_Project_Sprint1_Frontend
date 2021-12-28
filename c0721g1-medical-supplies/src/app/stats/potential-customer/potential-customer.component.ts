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
  public canvas: any;
  public ctx: any;

  //data for chart
  private data = {
    labels: []
    ,
    datasets: [{
      type: 'bar',
      label: 'Doanh Số',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)'
    }, {
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
      this.getName(value);
      this.potentialCustomerChart("abc", this.data, 'myChart');

    });
  }

  ngOnInit(): void {


  }

    //get label for Chart
    private getName(arr: PotentialCustomer[]) {
        for(let i = 0; i<arr.length; i++) {
          this.data.labels.push(arr[i].name);
          this.data.datasets[0].data.push(arr[i].quantity) ;
          this.data.datasets[1].data.push(arr[i].total);
    };
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
}
