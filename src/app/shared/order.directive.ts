import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appOrder]'
})
export class OrderDirective {
  @Input() appOrder!: number;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.classList.add(`order-${this.appOrder}`);
  }
}