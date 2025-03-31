import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../interfaces/user-interface';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { ModaDeleteComponent } from '../moda-delete/moda-delete.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
})
export class TableListComponent implements AfterViewInit, OnChanges {
  public dialog = inject(MatDialog);
  @Input() dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'user',
    'name',
    'surnames',
    'dept',
    'position',
    'email',
    'actions',
  ];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes",changes)
    if (changes['dataSource']) {
      this.dataSource = changes['dataSource'].currentValue

    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onButtonEdit(item: User) {
    console.log('editar', item);
    const dialogRef = this.dialog.open(ModalUserComponent, {
      data: item,
    });

    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onButtonDelete(item: User) {
    const dialogRef = this.dialog.open(ModaDeleteComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
