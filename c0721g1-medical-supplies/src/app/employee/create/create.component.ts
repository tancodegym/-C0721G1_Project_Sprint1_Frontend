import {Component, Inject, OnInit} from '@angular/core';
import {Employee} from '../../model/employee';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {PositionService} from '../../service/position.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  employeeCode: Employee;
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
              private toastrService: ToastrService,
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
      // tslint:disable-next-line:no-shadowed-variable
      this.employeeService.getCode().subscribe(next => {
        this.employeeCode = next;
        if (this.employeeCode == null) {
          this.codeB = 'MNV-' + 1;
        } else {
          const a = this.employeeCode.id + 1;
          this.codeB = 'MNV-' + a;
        }
        console.log(this.codeB);
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
    this.employee = this.employeeForm.value;
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
              this.router.navigateByUrl('employee/list');
              this.toastrService.success('Thêm mới thành công');
              this.checkerr = true;
            }, error => {
              this.checkerr = false;
              this.handleError(error);
            });
          });
        })
      ).subscribe();
    } else {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe(() => {
        this.router.navigateByUrl('employee/list');
        this.checkerr = true;
        this.toastrService.success('Thêm mới thành công');
        }, error => {
          this.checkerr = false;
          this.handleError(error);
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
