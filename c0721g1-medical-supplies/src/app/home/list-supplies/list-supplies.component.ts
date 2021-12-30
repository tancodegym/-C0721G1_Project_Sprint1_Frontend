import {Component, OnInit} from '@angular/core';
import {Supplies} from "../../model/supplies";
import {SuppliesService} from "../../service/supplies.service";
import {Router} from "@angular/router";
import * as AOS from 'aos';

@Component({
  selector: 'app-list-supplies',
  templateUrl: './list-supplies.component.html',
  styleUrls: ['./list-supplies.component.css']
})
export class ListSuppliesComponent implements OnInit {
  suppliesList: Supplies[] = [];
  page=0;
  totalPage :number;

  constructor(private suppliesService: SuppliesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.suppliesService.getSuppliesList(this.page).subscribe(value => {
      console.log(value);
      this.suppliesList =value.content;
      this.totalPage = value.totalPages;
    });
    this.getSuppliesList();
    AOS.init({

    })

  }

  getSuppliesList() {
    this.suppliesService.findAll().subscribe(value => {
      this.suppliesList = value.content
    });
  }
  nextPage() {
    this.page +=1;
    this.ngOnInit();
  }

  previousPage() {
    this.page -=1;
    this.ngOnInit();
  }

  lastPage() {
    this.page=this.totalPage-1;
    this.ngOnInit();
  }
}
