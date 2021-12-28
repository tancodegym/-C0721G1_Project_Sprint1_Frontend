import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user: User[];
  userForm: FormGroup = new FormGroup({
  });
  constructor() { }

  ngOnInit(): void {
  }

}
