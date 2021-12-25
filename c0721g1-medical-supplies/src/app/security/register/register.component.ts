import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {RegisterForm} from '../../model/registerForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    role: new FormControl()
  });
  message = '';
  successMessage = '';
  registerModel: RegisterForm;
  codeInput: string;
  formStatus = false;
  buttonUpdateStatus = false;
  buttonRegisterStatus = false;
  buttonCheckStatus = true;
  h2UpdateStatus = false;
  h2RegisterStatus = true;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  checkCode() {
    this.authService.getRegister(this.codeInput).subscribe(value => {
      if (value === 1) {
        this.message = 'Mã nhân viên không tồn tại';
      } else if (value === 2) {
        this.message = 'Mã nhân viên đã tồn tại nhưng chưa có tài khoản';
        this.formStatus = true;
        this.buttonRegisterStatus = true;
        this.buttonCheckStatus = false;
      } else {
        this.registerModel = value;
        this.registerForm.setValue(this.registerModel);
        this.formStatus = true;
        this.buttonUpdateStatus = true;
        this.buttonCheckStatus = false;
        this.h2RegisterStatus = false;
        this.h2UpdateStatus = true;
      }
    });
  }

  register(): void {
    this.authService.register(this.registerForm.value, this.codeInput).subscribe(value => {
      this.successMessage = value.message;
    }, error => {
      console.log(error);
    });
  }

  update(): void {
    this.authService.editRegister(this.registerForm.value, this.codeInput).subscribe(value => {
      this.successMessage = value.message;
    }, error => {
      console.log(error);
    });
  }
}
