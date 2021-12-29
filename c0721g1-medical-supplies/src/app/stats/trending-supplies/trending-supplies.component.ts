import { Component, OnInit } from '@angular/core';
import {TrendingSupllies} from "../model/trending-supllies";
import {Router} from "@angular/router";
import {TrendingSuppliesService} from "../service/trending-supplies.service";

@Component({
  selector: 'app-trending-supplies',
  templateUrl: './trending-supplies.component.html',
  styleUrls: ['./trending-supplies.component.css']
})
export class TrendingSuppliesComponent implements OnInit {
  trendingArr: TrendingSupllies[];



  constructor(private router: Router,
              private trendingService: TrendingSuppliesService) {
    this.router.navigateByUrl('financial').then( s => {
    });
    this.trendingService.getAll().subscribe(value=>{
      this.trendingArr = value
    })

  }

  ngOnInit(): void {

  }

}
