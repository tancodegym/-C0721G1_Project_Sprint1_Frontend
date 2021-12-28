import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EmployeeService} from '../../service/employee.service';
import {PositionService} from '../../service/position.service';
import {Position} from '../../model/position';
import {PageEmployeeDTO} from '../../dto/PageEmployeeDTO';
import {Employee} from '../../model/employee';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page = 0;
  size = 2;
  pageEmployee: any;
  employeeList: Employee[];
  positionList: Position[];
  searchForm: FormGroup;
  pageEmployeeDTO: PageEmployeeDTO;
  constructor(private employeeService: EmployeeService,
              private positionService: PositionService) {
    this.searchForm = new FormGroup({
        code: new FormControl(''),
        name: new FormControl(''),
        positionId: new FormControl(''),
        page: new FormControl(this.page),
        size: new FormControl(this.size),
      }
    );
  }

  ngOnInit(): void {
    this.getListPosition();
    this.getListEmployee();
  }
  getListPosition() {
    this.positionService.getListPosition().subscribe(value => {
        this.positionList = value;
    });
  }
  getListEmployee() {
    this.pageEmployeeDTO = this.searchForm.value;
    this.employeeService.getListEmployee(this.pageEmployeeDTO).subscribe(value => {
      this.pageEmployee = value;
      this.employeeList = value.content;
      console.log(this.pageEmployee);
    });
  }

  previousPage() {
    this.page--;
    this.searchForm = new FormGroup({
        code: new FormControl(''),
        name: new FormControl(''),
        positionId: new FormControl(''),
        page: new FormControl(this.page),
        size: new FormControl(this.size),
      }
    );
    this.ngOnInit();
  }

  nextPage() {
    this.page++;
    this.searchForm = new FormGroup({
        code: new FormControl(''),
        name: new FormControl(''),
        positionId: new FormControl(''),
        page: new FormControl(this.page),
        size: new FormControl(this.size),
      }
    );
    this.ngOnInit();
  }
}
