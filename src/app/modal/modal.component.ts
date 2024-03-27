import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ModalService} from "../core/services/modal.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnDestroy {
  title = 'Modal Title';
  message = 'This is a sample message.';
  private modalSubscription: Subscription;

  isOpen: boolean = false

  constructor(
      private modalService: ModalService,
      private elementRef: ElementRef,
      private renderer: Renderer2
  ) {
    this.modalSubscription = this.modalService.getModalState().subscribe((isOpen) => {
      if (isOpen) {
        this.openModal();
      } else {
        this.closeModal();
      }
    });
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  openModal(): void {
    // Use Renderer2 to safely manipulate the DOM
    const modalElement = this.elementRef.nativeElement.querySelector('.modal');
    if (modalElement) {
      this.renderer.setStyle(modalElement, 'display', 'block');
    }
  }

  closeModal(): void {
    // Use Renderer2 to safely manipulate the DOM
    const modalElement = this.elementRef.nativeElement.querySelector('.modal');
    if (modalElement) {
      this.renderer.setStyle(modalElement, 'display', 'none');
    }
  }
}