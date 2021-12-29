import {Component, OnInit} from '@angular/core';
import {Supplies} from '../../model/supplies';
import {Producer} from '../../model/producer';
import {SuppliesType} from '../../model/supplies-type';
import {SuppliesService} from '../../service/supplies.service';
import {SuppliesTypeService} from '../../service/supplies-type.service';
import {ProducerService} from '../../service/producer.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  suppliesList: Supplies[];
  producerList: Producer[];
  suppliesTypeList: SuppliesType[];

  constructor(private suppliesService: SuppliesService,
              private suppliesTypeService: SuppliesTypeService,
              private producerService: ProducerService) {
  }

  ngOnInit(): void {
    this.getListSuppliesType();
    this.getListProducer();
    this.getListSupplies();
  }

  private getListSuppliesType() {
    this.suppliesTypeService.getAll().subscribe(value => {
      this.suppliesTypeList = value;
    });
  }

  private getListProducer() {
    this.producerService.getAll().subscribe(value => {
      this.producerList = value;
    });
  }

  private getListSupplies() {
    this.suppliesService.getAll().subscribe(data => {
      this.suppliesList = data;
    });
  }
}
