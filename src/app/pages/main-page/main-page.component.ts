import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgEventBus } from 'ng-event-bus';
import { ModalUserComponent } from '../../components/modal-user/modal-user.component';
import { Department, Post, User } from '../../interfaces/user-interface';
import { UserService } from '../../services/user-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  public dialog = inject(MatDialog);
  listUser: User[] = [];
  dataListFilter: User[] = [];
  listDepartment: Department[] = [];
  listPosition: Post[] = [];
  dataSource = new MatTableDataSource<User>();
  dataSourceFilter: any[] = [];

  form: FormGroup = this.fb.group({
    department: [''],
    post: [''],
  });

  constructor(
    private readonly eventBus: NgEventBus,
    private readonly listService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.eventBus.on('add-list').subscribe(() => {
      this.onListUser();
    });
    this.eventBus.on('update-list').subscribe(() => {
      this.onListUser();
    });
    this.eventBus.on('delete-item').subscribe(() => {
      this.onListUser();
    });

    this.onListUser();
    this.onServiceDepart();
    this.onServicePost();
  }

  onListUser() {
    this.listService.getLists().subscribe((data) => {
      this.dataSource.data = data;

      this.dataSource.filterPredicate = this.filterPredicate;
      this.form.valueChanges.subscribe((value) => this.applyFilter(value));
    });
  }

  applyFilter(value: string): void {
    console.log('value', value);
    this.dataSource.filter= value;
    this.dataSourceFilter = this.dataSource.filteredData;
    console.log("filterrr", this.dataSourceFilter)

  }

  filterPredicate(data: User, filter: string) {
    console.log('data', data.department.nameDepa, filter);
    const departmentMatch = data.department.nameDepa === filter;
    const postMatch = data.post.namePost === filter;

    return departmentMatch;
  }
  onButtonAdd() {
    const dialogRef = this.dialog.open(ModalUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onServiceDepart() {
    this.listService.getDepartment().subscribe((dept) => {
      this.listDepartment = dept;
    });
  }

  onServicePost() {
    this.listService.getPosition().subscribe((post) => {
      this.listPosition = post;
    });
  }
}
