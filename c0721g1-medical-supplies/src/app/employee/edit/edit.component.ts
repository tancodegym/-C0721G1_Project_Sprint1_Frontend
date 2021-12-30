import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {PositionService} from '../../service/position.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Position} from '../../model/position';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router,
              private employeeService: EmployeeService,
              private positionService: PositionService,
              private activeRouter: ActivatedRoute,
              private toastrService: ToastrService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  // tslint:disable-next-line:ban-types
  employee: any;
  positionList: Position[];
  public errorDB = [];
  // tslint:disable-next-line:ban-types
  checkerr: Boolean;
  selectedImage: any = null;
  urlImg = 'https://i.imgur.com/7Vtlcpx.png';
  employeeForm = new FormGroup({
    id: new FormControl(),
    code: new FormControl(),
    name: new FormControl('', Validators.compose([Validators.required])),
    birthday: new FormControl('', Validators.compose([Validators.required])),
    image: new FormControl(''),
    address: new FormControl('', Validators.compose([Validators.required])),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^((090)|(091))[\\d]{7}$')])),
    gender: new FormControl('', Validators.compose([Validators.required])),
    position: new FormControl('', Validators.compose([Validators.required]))
  });
  ngOnInit(): void {
    this.positionService.getListPosition().subscribe(next => {
      this.positionList = next;
      this.activeRouter.paramMap.subscribe(paramMap => {
        const idEmp = +paramMap.get('id');
        // tslint:disable-next-line:no-shadowed-variable
        this.employeeService.findById(idEmp).subscribe(next => {
          this.employee = next;
          if (this.employee.image !== null) {
            this.urlImg = this.employee.image;
          }
          this.employeeForm.setValue(this.employee);
        });
      });
    });
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  submit() {
    // upload image to firebase
    console.log(this.selectedImage);
    if (this.selectedImage != null) {
      const nameImg = this.getCurrentDateTime() + this.selectedImage;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          // tslint:disable-next-line:no-shadowed-variable
          fileRef.getDownloadURL().subscribe((url) => {
            // tslint:disable-next-line:max-line-length
            this.employeeForm.patchValue({image: url + ''});
            this.employeeService.updateEmployee(this.employeeForm.value).subscribe(() => {
              this.router.navigateByUrl('employee/list');
              this.toastrService.success('Cập nhật thành công');
              this.checkerr = true;
            }, error => {
              this.checkerr = false;
              this.handleError(error);
            });
          });
        })
      ).subscribe();
    } else {
      this.employeeService.updateEmployee(this.employeeForm.value).subscribe(() => {
        this.router.navigateByUrl('employee/list');
        this.toastrService.success('Cập nhật thành công');
        this.checkerr = true;
      }, error => {
        this.handleError(error);
        this.checkerr = false;
      });
    }
  }
  handleError(code) {
    this.errorDB = code.error;
    // console.log(this.errorDB[0].defaultMessage);
    // console.log(this.errorDB[1].defaultMessage);
    // console.log(code.status);
    // console.log(code.error);
    // console.log(code.message);
  }
  compareSuppliesType(c1: Position, c2: Position): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  get code() {
    return this.employeeForm.get('code');
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get birthday() {
    return this.employeeForm.get('birthday');
  }

  get phone() {
    return this.employeeForm.get('phone');
  }

  get gender() {
    return this.employeeForm.get('gender');
  }

  get address() {
    return this.employeeForm.get('address');
  }

  get position() {
    return this.employeeForm.get('position');
  }

  get image() {
    return this.employeeForm.get('image');
  }

}
