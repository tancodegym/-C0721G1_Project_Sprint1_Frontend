import {Component, OnInit} from '@angular/core';
import {Employee} from '../../model/employee';
import {EmployeeService} from '../../service/employee.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  employee: Employee;
  id: number;

  constructor(private employeeService: EmployeeService, private active: ActivatedRoute) {
    this.id = this.active.snapshot.params.id;
    this.getDetail();
  }

  ngOnInit(): void {
  }


  getDetail() {
    this.employeeService.findByIdByUser(this.id).subscribe(value => {
      // @ts-ignore
      this.employee = value;
    });
  }
}
