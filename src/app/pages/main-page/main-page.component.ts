import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgEventBus } from 'ng-event-bus';
import { ModalUserComponent } from '../../components/modal-user/modal-user.component';
import { Department, Post, User } from '../../interfaces/user-interface';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  public dialog = inject(MatDialog);
  listUser: User[] = [];
  listDepartment: Department[] = [];
  listPosition: Post[] = [];
  dataSource = new MatTableDataSource<User>();

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
      this.form.controls['department'].valueChanges.subscribe((value) =>
        this.applyFilter(value)
      );
      this.form.controls['post'].valueChanges.subscribe((value) =>
        this.applyFilter(value)
      );
    });
  }

  applyFilter(value: string): void {
    this.dataSource.filter = value;
  }

  filterPredicate(data: User, filter: string) {
    const departmentMatch = data.department === filter;
    const postMatch = data.post === filter;

    return departmentMatch || postMatch;
  }
  resetFilter(): void {
    this.dataSource.filter = ''; // Limpiar el filtro
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
