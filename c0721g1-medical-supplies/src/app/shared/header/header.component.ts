import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../security/login/login.component';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isLoginFail = true;
  username: string;
  idEmployee: number;
  currentUser: any;
  nameEmployee: string;

  constructor(private matDialog: MatDialog,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  openLoginDialog() {
    const dialogLogin = this.matDialog.open(LoginComponent, {height: '500px', width: '500px'});
    dialogLogin.afterClosed().subscribe(value => {
      if (this.tokenStorageService.getToken()) {
        this.username = this.tokenStorageService.getUser().username;
        this.idEmployee = this.tokenStorageService.getUser().employee.id;
        this.currentUser = this.tokenStorageService.getUser();
        this.nameEmployee = this.tokenStorageService.getUser().employee.name;
        this.isLoggedIn = true;
        this.isLoginFail = false;
      }
    });
  }

  logOut() {
    this.tokenStorageService.logout();
    this.isLoginFail = true;
    this.isLoggedIn = false;
    this.router.navigateByUrl('/home');
  }
}
