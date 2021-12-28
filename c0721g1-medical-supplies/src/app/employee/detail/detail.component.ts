import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {Employee} from '../../model/employee';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  employee!: Employee | any;
  id!: number;

  constructor(private employeeService: EmployeeService, private active: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getDetail();
  }


  getDetail() {
    this.active.params.subscribe(param => {
      this.id = param['id'];
      console.log(this.id);
    });
    this.employeeService.findById(this.id).subscribe(data => {
      this.employee = data;
      console.log(this.employee);
    });
  }
}
