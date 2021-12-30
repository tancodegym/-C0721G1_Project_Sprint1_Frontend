import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {Employee} from '../../model/employee';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  employee: Employee ;
  id: number;

  constructor(private employeeService: EmployeeService, private active: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getDetail();
  }


  getDetail() {
    this.active.params.subscribe(param => {
      this.id = param['id'];
    });
    this.employeeService.findById(this.id).subscribe(value => {
      this.employee = value;
      console.log(this.employee);
    });
  }
}
