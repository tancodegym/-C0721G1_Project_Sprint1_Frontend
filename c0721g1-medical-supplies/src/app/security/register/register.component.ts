import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {RegisterForm} from '../../model/registerForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,8}[a-zA-Z0-9]$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,10}$')]),
    role: new FormControl('', [Validators.required])
  });
  message = '';
  successMessage = '';
  validateUsernameMessage = '';
  validatePasswordMessage = '';
  validateUsernameExistMessage = '';
  registerModel: RegisterForm;
  codeInput: string;
  formStatus = false;
  buttonUpdateStatus = false;
  buttonRegisterStatus = false;
  buttonCheckStatus = true;
  h2UpdateStatus = false;
  h2RegisterStatus = true;
  disabledStatus = false;

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
        this.disabledStatus = true;
      }
    });
  }

  register(): void {
    this.authService.register(this.registerForm.value, this.codeInput).subscribe(value => {
      this.successMessage = value.message;
    }, error => {
      this.validateUsernameExistMessage = error.error;
      this.validateUsernameMessage = error.error.username;
      this.validatePasswordMessage = error.error.password;
    });
  }

  update(): void {
    this.authService.editRegister(this.registerForm.value, this.codeInput).subscribe(value => {
      this.successMessage = value.message;
    }, error => {
      this.validatePasswordMessage = error.error.password;
    });
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get role() {
    return this.registerForm.get('role');
  }
}
