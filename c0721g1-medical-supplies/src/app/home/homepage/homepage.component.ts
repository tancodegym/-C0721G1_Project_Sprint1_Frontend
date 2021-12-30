import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestMail} from '../../model/RequestMail';
import {FormControl, FormGroup} from '@angular/forms';
import {RequestMailService} from '../../service/request-mail.service';
import * as AOS from 'aos';

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
