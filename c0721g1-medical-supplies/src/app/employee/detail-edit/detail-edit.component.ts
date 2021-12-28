// @ts-ignore
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user';
import {EmployeeService} from '../../service/employee.service';
import {PositionService} from '../../service/position.service';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';


// @ts-ignore
@Component({
  selector: 'app-detail-edit',
  templateUrl: './detail-edit.component.html',
  styleUrls: ['./detail-edit.component.css']
})
export class DetailEditComponent implements OnInit {


  employeeDetailEditForm: FormGroup = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.pattern('(NV-)(\\d{4})$')]),
      name: new FormControl('', [Validators.required]),
      // tslint:disable-next-line:max-line-length
      birthday: new FormControl('', [Validators.required, Validators.pattern('^(?:19\\d{2}|20\\d{2})[-/.](?:0[1-9]|1[012])[-/.](?:0[1-9]|[12][0-9]|3[01])$')]),
      image: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      // tslint:disable-next-line:max-line-length
      phone: new FormControl('', [Validators.required, Validators.pattern('^(0|(\\(84\\)\\+))+([9][0-1][0-9]{7})$')]),
      // tslint:disable-next-line:max-line-length
      address: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),

    }
  );

  positions: Position[] = [];
  users: User[] = [];
  selectedImage: any = null;
  private id: number;

  constructor(private employeeService: EmployeeService,
              private positionService: PositionService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.getAllPosition();
    this.getAllUser();
  }

  getAllPosition() {
    this.positionService.getAll().subscribe(data => {
    // @ts-ignore
      this.positions = data;
      console.log(this.positions);
    });
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  submit() {
    // upload image to firebase
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        // tslint:disable-next-line:no-shadowed-variable
        fileRef.getDownloadURL().subscribe((url) => {
          // tslint:disable-next-line:max-line-length
          this.employeeDetailEditForm.patchValue({image: url + ''});
          this.employeeService.save(this.employeeDetailEditForm.value).subscribe(() => {
            // this.router.navigateByUrl('supplies/list').then(r => this.t.success('Thêm mới thành công'));
          });
        });
      })
    ).subscribe();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  getAllUser() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    });
  }

  editDetailEmployee() {
    const employee = this.employeeDetailEditForm.value;
    this.employeeService.update(employee).subscribe();
    alert('Cập nhập thành công');


  }


  // comparePosition(c1: Position, c2: Position): boolean {
  //     return c1 && c2 ? c1.id === c2.id : c1 === c2;
  //   }

  compareUser(c1: User, c2: User): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  get code() {
    return this.employeeDetailEditForm.get('code');
  }

  get name() {
    return this.employeeDetailEditForm.get('name');
  }

  get birthday() {
    return this.employeeDetailEditForm.get('birthday');
  }

  get image() {
    return this.employeeDetailEditForm.get('image');
  }

  get gender() {
    return this.employeeDetailEditForm.get('gender');
  }

  get phone() {
    return this.employeeDetailEditForm.get('phone');
  }

  get address() {
    return this.employeeDetailEditForm.get('address');
  }

  get position() {
    return this.employeeDetailEditForm.get('position');
  }

  get user() {
    return this.employeeDetailEditForm.get('user');
  }

}



