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
  public labels: [];

  public data = {
    labels: []
    ,
    datasets: [{
      type: 'bar',
      label: 'Doanh Số',
      data: [10, 20, 30, 40],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)'
    }, {
      type: 'line',
      label: 'Giá trị',
      data: [50, 50, 50, 50],
      fill: false,
      borderColor: 'rgb(54, 162, 235)'
    }]
  };

  constructor(private router: Router,
              private potentialCustomerService: PotentialCustomerService) {
    this.potentialCustomerService.getAll().subscribe(value => {
      this.potentialArr = value;
      for(let i = 0; i < this.potentialArr.length; i++) {
            // @ts-ignore
        this.labels.push([i])
      };
      this.potentialCustomerChart(this.labels, this.data, 'myChart');
    });
  }

  ngOnInit(): void {
  }

  private potentialCustomerChart(labels, data, myChart) {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    // @ts-ignore
    const chart = new Chart(this.ctx, {
      type: 'scatter',
      data: data,
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
