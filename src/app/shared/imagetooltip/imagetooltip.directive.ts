import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appImageTooltip]'
})
export class ImagetooltipDirective {
  @Input() imageSrc: string=''; // Path to your image
  @Input() content!: TemplateRef<any>; // Reference to custom content template

  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.el.nativeElement.title = ''; // Clear default title
  }

  showTooltip() {
    // Create a new view context for the custom content component
    const context = { $implicit: this.imageSrc };
    this.viewContainerRef.createEmbeddedView(this.content, context);
  }

  hideTooltip() {
    this.viewContainerRef.clear();
  }
}
