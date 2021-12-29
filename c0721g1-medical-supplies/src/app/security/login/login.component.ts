import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
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

  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
      rememberMe: ['']
    });
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  onSubmit(): void {
    if (this.tokenStorageService.getUser()) {
      this.router.navigateByUrl('/system');
    }
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
      this.router.navigateByUrl('/system');
      this.matDialogRef.close();
      // this.router.navigateByUrl(this.returnUrl);
      this.toastrService.success('Đăng nhập thành công');
    }, error => {
      this.toastrService.error('Đăng nhập thất bại');
      this.authService.isLoggedIn = false;
    });
  }

}
