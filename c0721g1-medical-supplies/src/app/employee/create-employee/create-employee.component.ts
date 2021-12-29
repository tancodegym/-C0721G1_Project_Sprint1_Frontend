import {Component, Inject, OnInit} from '@angular/core';
import {Employee} from '../../model/employee';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {PositionService} from '../../service/position.service';
import {Position} from '../../model/position';
import {Observable} from 'rxjs';
import {count, finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';


@Component({
  selector: 'app-create',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee;
  positionList: Position[];
  public errorDB = [];
  codeB: string;
  selectedImage: any = null;
// tslint:disable-next-line:ban-types
  checkerr: Boolean;

  constructor(private http: HttpClient,
              private router: Router,
              private employeeService: EmployeeService,
              private positionService: PositionService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
  ) {
  }

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(),
    code: new FormControl(),
    name: new FormControl('', Validators.compose([Validators.required])),
    birthday: new FormControl('', Validators.compose([Validators.required])),
    image: new FormControl(),
    address: new FormControl('', Validators.compose([Validators.required])),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^((090)|(091))[\\d]{7}$')])),
    gender: new FormControl('', Validators.compose([Validators.required])),
    position: new FormControl('', Validators.compose([Validators.required]))
  });


  ngOnInit(): void {
    this.positionService.getListPosition().subscribe(next => {
      console.log(next);
      this.positionList = next;
      this.employeeService.getCode().subscribe(next => {
        this.employee = next;
        if (this.employee == null) {
          this.codeB = 'Nhân Viên - ' + 1;
        } else {
        const a = this.employee.id + 1;
        this.codeB = 'Nhân Viên - ' + a;
      }
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
            this.employeeService.createEmployee(this.employeeForm.value).subscribe(() => {
              // this.router.navigateByUrl('employee/list');
              this.checkerr = true;
            }, error => {
              this.checkerr = false;
              this.handleError(error);
              console.log(error);
            });
          });
        })
      ).subscribe();
    } else {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe(() => {
          // this.router.navigateByUrl('employee/list');
          this.checkerr = true;
        }, error => {
          this.checkerr = false;
          this.handleError(error);
          console.log(error);
        }
      );
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
