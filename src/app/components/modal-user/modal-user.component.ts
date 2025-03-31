import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgEventBus } from 'ng-event-bus';
import { Department, Post } from '../../interfaces/user-interface';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.scss',
})
export class ModalUserComponent implements OnInit {
  isCreate = true;
  showModalClose = false;
  form: FormGroup = this.fb.group({
    id:[''],
    user: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
    firstName: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    middleName: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    firstSurname: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(100)],
    ],
    secondLastName: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(100)],
    ],
    department: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    post: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],

    email: ['', [Validators.required, Validators.email]],
  });
  listDepartment: Department[] = [];
  listPosition: Post[] = [];
  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService,
    private readonly eventBus: NgEventBus,
    @Inject(MAT_DIALOG_DATA) public updateData: any
  ) {}

  ngOnInit(): void {
    if (this.updateData) {
      this.isCreate = false;
      this.onListChanges();
    }
    this.userService.getDepartment().subscribe((dept) => {
      this.listDepartment = dept;
    });
    this.userService.getPosition().subscribe((post) => {
      this.listPosition = post;
    });
  }

  onButtonSave() {
    if (this.isCreate) return this.onListAdd();
    this.onListUpdate();
  }

  onListAdd() {
    this.form.patchValue({
      id: Math.random().toString(16).slice(2),
    });
    this.userService.addProduct(this.form.value).subscribe((data) => {
      this.eventBus.cast('add-list', data);
      this.showModalClose = true;
    });
  }

  onListUpdate() {
    this.userService.updateProduct(this.form.value).subscribe((data) => {
      this.eventBus.cast('update-list', data);
      this.showModalClose = true;
    });
  }

  onListChanges() {
    this.form.setValue({
      id: this.updateData.id,
      user: this.updateData.user,
      firstName: this.updateData.firstName,
      middleName: this.updateData.middleName,
      firstSurname: this.updateData.firstSurname,
      secondLastName: this.updateData.secondLastName,
      department: this.updateData.department,
      post: this.updateData.post,
      email: this.updateData.email,
    });
  }
}
