import {Component, OnInit} from '@angular/core';
import * as AOS from 'aos';
import {FormControl, FormGroup} from "@angular/forms";
import {RequestMail} from "../../model/requestMail";
import {RequestMailService} from "../../service/request-mail.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  requestMail: RequestMail;
  requestForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    content: new FormControl('')
  })

  constructor(private requestMailService: RequestMailService) {
  }

  ngOnInit(): void {
    AOS.init(
      {
        offset: 12,
        duration: 1200,
      }
    );

  }

  sendMail() {
    this.requestMail = this.requestForm.value;
    this.requestMailService.sendEmail(this.requestMail).subscribe();
    this.requestForm.reset()
  }
}


