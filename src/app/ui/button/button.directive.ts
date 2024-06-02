import { Directive, ElementRef, OnInit, inject } from "@angular/core";

@Directive({
  selector: "button[appButton]",
  standalone: true,
})
export class ButtonDirective implements OnInit {
  elRef = inject(ElementRef);
  el = this.elRef.nativeElement as HTMLElement;

  ngOnInit(): void {
    this.el.style.backgroundColor = "#8a2be2";
    this.el.style.padding = "5px 15px";
    this.el.style.color = "white";
    this.el.style.borderRadius = "15px";
  }
}
