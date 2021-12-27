// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Producer} from '../../model/producer';
import {SuppliesType} from '../../model/supplies-type';
import {SuppliesService} from '../../service/supplies.service';
import {SuppliesTypeService} from '../../service/supplies-type.service';
import {Router} from '@angular/router';
import {ProducerService} from '../../service/producer.service';
import {Supplies} from '../../model/supplies';
import {ToastrService} from 'ngx-toastr';



// @ts-ignore
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  supplies: Supplies;
  producers: Producer[] = [];
  suppliesTypes: SuppliesType[] = [];
  // @ts-ignore
  suppliesForm: FormGroup = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.pattern('(MVT-)(\\d{4})$')]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      price: new FormControl('', [Validators.required]),
      producer: new FormControl('', [Validators.required]),
      suppliesType: new FormControl('', [Validators.required]),
      // tslint:disable-next-line:max-line-length
      productionDate: new FormControl('', [Validators.required, Validators.pattern('^(?:19\\d{2}|20\\d{2})[-/.](?:0[1-9]|1[012])[-/.](?:0[1-9]|[12][0-9]|3[01])$')]),
      // tslint:disable-next-line:max-line-length
      expiryDate: new FormControl('', [Validators.required, Validators.pattern('^(?:19\\d{2}|20\\d{2})[-/.](?:0[1-9]|1[012])[-/.](?:0[1-9]|[12][0-9]|3[01])$')]),
      introduce: new FormControl('', [Validators.required]),
      technicalInformation: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    }
  );

  constructor(private suppliesService: SuppliesService,
              private suppliesTypeService: SuppliesTypeService,
              private producerService: ProducerService,
              private t: ToastrService,
              private router: Router) {
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

  submit() {
    const supplies = this.suppliesForm.value;
    this.suppliesService.save(supplies).subscribe(data => {
      // this.supplies = data;
    }, error => {});
    this.suppliesForm.reset();
    this.t.success('Thêm mới thành công');
  }

  get code() {
    return this.suppliesForm.get('code');
  }

  get name() {
    return this.suppliesForm.get('name');
  }

  get price() {
    return this.suppliesForm.get('price');
  }

  get suppliesType() {
    return this.suppliesForm.get('suppliesType');
  }

  get producer() {
    return this.suppliesForm.get('producer');
  }

  get productionDate() {
    return this.suppliesForm.get('productionDate');
  }

  get expiryDate() {
    return this.suppliesForm.get('expiryDate');
  }

  get introduce() {
    return this.suppliesForm.get('introduce');
  }

  get technicalInformation() {
    return this.suppliesForm.get('technicalInformation');
  }

  get image() {
    return this.suppliesForm.get('image');
  }


}
