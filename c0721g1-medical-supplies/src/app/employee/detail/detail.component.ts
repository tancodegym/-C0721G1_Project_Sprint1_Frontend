import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {Employee} from '../../model/employee';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  employee: Employee;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private http: HttpClient,
  ) {

  }

  ngOnInit(): void {
    this.employeeService.getCode().subscribe(next => {
      this.employee = next;
      console.log(this.employee);
      // this.urlImg = this.employee.image;
    });
  }
  // ngOnInit(): void {
  //   this.employeeService.findById(this.employee.id).subscribe(next => {
  //     this.employee = next;
  //     console.log(this.employee);
  //     // this.urlImg = this.employee.image;
  //   });
  // }


}
