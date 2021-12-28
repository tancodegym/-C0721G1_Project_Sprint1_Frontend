import {Component, OnInit} from '@angular/core';
import {Supplies} from "../../model/supplies";
import {SuppliesService} from "../../service/supplies.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-supplies',
  templateUrl: './list-supplies.component.html',
  styleUrls: ['./list-supplies.component.css']
})
export class ListSuppliesComponent implements OnInit {
  suppliesList: Supplies[] = [];

  constructor(private suppliesService: SuppliesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getSuppliesList();

  }

  getSuppliesList() {
    this.suppliesService.getSuppliesList().subscribe(value => {
      this.suppliesList = value.content
    });
  }
}
