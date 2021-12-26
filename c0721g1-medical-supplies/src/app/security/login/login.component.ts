import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService) {
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
    this.authService.login(this.loginForm.value).subscribe(value => {
      if (this.loginForm.value.rememberMe) {
        this.tokenStorageService.saveTokenLocal(value.accessToken);
        this.tokenStorageService.saveUserLocal(value);
      } else {
        this.tokenStorageService.saveTokenSession(value.accessToken);
        this.tokenStorageService.saveUserSession(value);
      }
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
      this.loginForm.reset();
      this.router.navigateByUrl(this.returnUrl);
      this.toastrService.success('Đăng nhập thành công');
    }, error => {
      this.toastrService.error('Đăng nhập thất bại');
      this.authService.isLoggedIn = false;
    });
  }

}
