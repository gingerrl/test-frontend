import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgEventBus } from 'ng-event-bus';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-moda-delete',
  templateUrl: './moda-delete.component.html',
  styleUrl: './moda-delete.component.scss',
})
export class ModaDeleteComponent {
  @Output() closeModal = new EventEmitter();

  constructor(
    private readonly deleteService: UserService,
    private readonly eventBus: NgEventBus,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onButtonCancel(): void {
    this.closeModal.emit();
  }

  onButtonConfirm(): void {
    this.deleteService.delete(this.data.id).subscribe(() => {
      this.eventBus.cast('delete-item');
    });
  }
}
