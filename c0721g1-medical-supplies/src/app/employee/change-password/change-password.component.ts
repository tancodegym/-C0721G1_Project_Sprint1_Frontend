import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UserService} from "../../service/user.service";


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user!: User;
  idParam!: number;
  a!: string;
  b!: string;
  oldPassword!: string

  userForm: FormGroup = new FormGroup({
    id: new FormControl(""),
    username: new FormControl(),
    password: new FormControl(""),

  });

  constructor(private userService: UserService, private active: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getParam();
    this.find();

  }


  getParam() {
    this.active.params.subscribe(param => {
      this.idParam = param['id'];
      console.log(this.idParam);
    });
  }

  updatePassword() {
    console.log(this.userForm.value)
    this.userForm.value.id = this.idParam;
    this.userService.changePass(this.userForm.value, this.idParam).subscribe(next => {
    }, error => {
      console.log(error.message);
    });
    console.log(this.userForm.value);
    console.log(this.idParam);
  }

  find() {
    this.userService.find(this.idParam).subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }

  valueInpput($event: any) {
    this.a = $event.target.value;
    console.log(this.a);
  }

  valueInpput2($event: any) {
    this.b = $event.target.value;
    console.log(this.b);
  }

  valueOldPassword($event: any) {
    this.oldPassword = $event.target.value;
  }
  check() {
    if (this.oldPassword === this.user.password) {
      console.log("ok")
      if (this.a === this.b) {
        // console.log("truong hop dung")
        this.updatePassword();
      } else {
        // console.log("truong hop false");
      }
    } else {
      console.log("Sai");
    }
  }

}
