import {Component, OnChanges, OnInit} from '@angular/core';
import {FinancialStats} from '../model/financial-stats';
import {Router} from '@angular/router';
import {FinancialService} from '../service/financial.service';
import {angularMath} from 'angular-ts-math';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent implements OnInit, OnChanges {

  financial: FinancialStats;
  bsValue = new Date();
  date: string;
  revenue: number;
  totalCost: number;
  profit: number;
  public canvas: any;
  //content chart doanh thu
  public ctx: any;
  // content chart chi tiet
  public ctxDetails: any;
  //content chart doanh thu
  public labelsRevenue: [];
  public dataRevenue: [];
  // content chart chi tiet
  public labelsDetail: [];
  public dataDetail: [];


  constructor(private router: Router,
              private financialsv: FinancialService) {

    this.financialsv.getAll().subscribe(
      value => {
        this.financial = value;
        this.revenue = this.financial.income;
        this.totalCost = (this.financial.refund + this.financial.cancelled + this.financial.importMoney);
        this.profit = (this.revenue - this.totalCost);
        this.createRevenueChart(this.labelsRevenue, this.dataRevenue, 'myChart1');
        this.createDetailChart(this.labelsDetail, this.dataDetail, 'myChart');
      }
    );

  }


  // chart doanh thu
  private createRevenueChart(labels, data, myChart1) {
    this.canvas = document.getElementById('myChart1');
    this.ctx = this.canvas.getContext('2d');

    // @ts-ignore
    const chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: ['Tổng thu', 'Tổng chi', 'Lợi nhuận',],
        datasets: [{
          label: 'Hiển thị bảng',

          data: [this.revenue, this.totalCost, this.profit],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'

          ],
          borderWidth: 1
        }]
      },
      // ẩn cái label tiêu đề
      options: {
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  // chart chi tiết
  private createDetailChart(labelsDetail: [], dataDetail: [], myChart: string) {
    this.canvas = document.getElementById('myChart');
    this.ctxDetails = this.canvas.getContext('2d');
    // @ts-ignore
    const chartDetail = new Chart(this.ctxDetails, {
      type: 'pie',
      data: {
        labels: [
          'Bán Hàng',
          'Nhập từ nhà cung cấp',
          'Nhập hàng',
          'Trả hàng',
          'Hủy hàng'
        ],
        datasets: [{
          label: 'My First Dataset',
          // tslint:disable-next-line:max-line-length
          data: [this.financial.income, this.financial.returnMoney, this.financial.importMoney, this.financial.refund, this.financial.cancelled],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
          ]
        }]
      },

    });
  }


  search() {
// console.log(this.bsValue.getFullYear());
// console.log(this.bsValue.getMonth()+1);
// console.log(this.bsValue.getDate());
    this.date = this.bsValue.getFullYear().toString()
      + '-' + (this.bsValue.getMonth() + 1).toString()
      + '-' + this.bsValue.getDate().toString();
    this.financialsv.searchFinancialStats(this.date).subscribe(
      value => {
        this.financial = value;
      }
    )

  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

}
