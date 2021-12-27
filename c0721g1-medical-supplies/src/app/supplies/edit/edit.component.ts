// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Producer} from '../../model/producer';
import {SuppliesType} from '../../model/supplies-type';
import {SuppliesService} from '../../service/supplies.service';
import {SuppliesTypeService} from '../../service/supplies-type.service';
import {ProducerService} from '../../service/producer.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  suppliesEditForm: FormGroup = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.pattern('(NV-)(\\d{4})$')]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      producer: new FormControl('', [Validators.required]),
      suppliesType: new FormControl('', [Validators.required]),
      // tslint:disable-next-line:max-line-length
      productionDate: new FormControl('', [Validators.required, Validators.pattern('^(?:19\\d{2}|20\\d{2})[-/.](?:0[1-9]|1[012])[-/.](?:0[1-9]|[12][0-9]|3[01])$')]),
      // tslint:disable-next-line:max-line-length
      expiryDate: new FormControl('', [Validators.required, Validators.pattern('^(?:19\\d{2}|20\\d{2})[-/.](?:0[1-9]|1[012])[-/.](?:0[1-9]|[12][0-9]|3[01])$')]),
      introduce: new FormControl('', [Validators.required]),
      technicalInformation: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    }
  );
  producers: Producer[] = [];
  suppliesTypes: SuppliesType[] = [];
  private id: number;

  constructor(private suppliesService: SuppliesService,
              private suppliesTypeService: SuppliesTypeService,
              private producerService: ProducerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.getAllSuppliesType();
    this.getAllProducer();
  }

  getAllSuppliesType() {
    this.suppliesTypeService.getAll().subscribe(data => {
      this.suppliesTypes = data;
    });
  }

  getAllProducer() {
    this.producerService.getAll().subscribe(data => {
      this.producers = data;
    });
  }

  editSupplies() {
    const supplies = this.suppliesEditForm.value;
    this.suppliesService.update(supplies).subscribe();
    alert('Cập nhập thành công');
    // this.router.navigateByUrl('/supplies/list');

  }

  compareProducer(c1: Producer, c2: Producer): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareSuppliesType(c1: SuppliesType, c2: SuppliesType): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  get code() {
    return this.suppliesEditForm.get('code');
  }

  get name() {
    return this.suppliesEditForm.get('name');
  }

  get price() {
    return this.suppliesEditForm.get('price');
  }

  get suppliesType() {
    return this.suppliesEditForm.get('suppliesType');
  }

  get producer() {
    return this.suppliesEditForm.get('producer');
  }

  get productionDate() {
    return this.suppliesEditForm.get('productionDate');
  }

  get expiryDate() {
    return this.suppliesEditForm.get('expiryDate');
  }

  get introduce() {
    return this.suppliesEditForm.get('introduce');
  }

  get technicalInformation() {
    return this.suppliesEditForm.get('technicalInformation');
  }

  get image() {
    return this.suppliesEditForm.get('image');
  }


}
