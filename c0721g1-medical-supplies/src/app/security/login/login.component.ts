import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material/dialog';

/*
Creator: PhuocPD
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    // tslint:disable-next-line:max-line-length
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,8}[a-zA-Z0-9]$')]),
    // tslint:disable-next-line:max-line-length
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[a-zA-Z0-9]{3,10}$')]),
    rememberMe: new FormControl('')
  });
  username: string;
  successMessage = '';
  roles: string[] = [];
  returnUrl: string;
  flag = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService,
              private matDialogRef: MatDialogRef<LoginComponent>) {
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(value => {
      if (this.loginForm.value.rememberMe) {
        this.tokenStorageService.saveTokenSession(value.token);
        this.tokenStorageService.saveUserSession(value);
        this.flag = true;
      } else {
        this.tokenStorageService.saveTokenLocal(value.token);
        this.tokenStorageService.saveUserLocal(value);
      }
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
      if (this.returnUrl) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.router.navigateByUrl('/system');
      }
      this.matDialogRef.close();
      this.toastrService.success('Đăng nhập thành công', 'Tin nhắn từ hệ thống');
    }, error => {
      this.toastrService.error('Đăng nhập thất bại', 'Tin nhắn từ hệ thống');
      this.authService.isLoggedIn = false;
    });
  }
}
