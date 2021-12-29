import {Component, OnInit} from '@angular/core';
import {SuppliesService} from '../../service/supplies.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Supplies} from '../../model/supplies';

@Component({
  selector: 'app-detail-supplies',
  templateUrl: './detail-supplies.component.html',
  styleUrls: ['./detail-supplies.component.css']
})
export class DetailSuppliesComponent implements OnInit {
  idSupplies: number;
  supplies: Supplies;

  constructor(
    private suppliesService: SuppliesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idSupplies = +paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.suppliesService.findById(this.idSupplies).subscribe(value => {
      this.supplies = value;
    });
  }

  addToCart() {
    localStorage.setItem(String(this.idSupplies),  this.supplies.name + ',' + this.supplies.image + ',' + this.supplies.price);
  }

}
