import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SuppliesStatsService} from '../service/supplies-stats.service';
import {SuppliesStats} from '../model/supplies-stats';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {

  suppliesArr: SuppliesStats[];

  constructor(private router: Router,
              private suppliesService: SuppliesStatsService) {
    this.suppliesService.getAll().subscribe(value => {
      this.suppliesArr = value;
    });
  }

  ngOnInit(): void {
  }

}
