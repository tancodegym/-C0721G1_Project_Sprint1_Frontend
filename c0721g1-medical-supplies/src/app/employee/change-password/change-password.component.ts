import {Component, DoCheck, OnInit} from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, DoCheck {
  user!: User;
  idParam!: number;
  newPass!: string;
  confirm!: string;
  oldPassword!: string
  checkConFirmPass: string;
  checkNewPass: string;
  checkAll: string;
  checkPassOld: string;
  checkUpdate: boolean = false;


  constructor(
    private userService: UserService,
    private active: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getParam();
  }

  getParam() {
    this.active.params.subscribe(param => {
      this.idParam = Number(param['id']);
      this.find(this.idParam)
    });
  }

  find(id: number) {
    this.userService.find(id).subscribe(data => {
      this.user = data;
    });
  }

  valueInput($event: any) {
    this.newPass = $event.target.value;

  }

  valueInput2($event: any) {
    this.confirm = $event.target.value;
    this.check()
  }

  valueOldPassword($event: any) {
    this.oldPassword = $event.target.value;
  }

  check() {
    if (this.oldPassword != this.newPass) {
      if (this.newPass === this.confirm) {
        this.checkConFirmPass = null;
        this.checkNewPass = null;
        this.checkUpdate = true;
      } else {
        this.checkUpdate = false;
        this.checkNewPass = null;
        this.checkConFirmPass = 'Nhập lại mật khẩu sai !';
      }
    } else {
      this.checkUpdate = false;
      this.checkNewPass = "Mật khẩu mới trùng mật khẩu cũ ! ";
    }
    if (this.oldPassword == '' || this.newPass == '' || this.confirm == '' || this.oldPassword == null || this.newPass == null || this.confirm == null) {
      // this.checkAll = "Tất cả các tryường không được để trống !"
      this.checkUpdate = false;
      this.checkNewPass = null;
      this.checkPassOld = null;
    } else {
      this.checkAll = null;
    }
  }

  ngDoCheck(): void {
    this.check()
  }
  updatePassword() {
    this.checkAll = "Tất cả các trường không được để trống !";
    if (this.oldPassword == this.user.password) {
      this.user.password = this.newPass;
      this.checkPassOld = null;
      this.userService.changePass(this.user).subscribe()
    } else {
      this.checkPassOld = "Sai mật khẩu cũ !"
    }
  }

}
