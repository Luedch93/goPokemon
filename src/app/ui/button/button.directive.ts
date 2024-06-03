import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  inject,
} from "@angular/core";

@Directive({
  selector: "button[appButton]",
  standalone: true,
})
export class ButtonDirective implements OnInit {
  elRef = inject(ElementRef);
  el = this.elRef.nativeElement as HTMLElement;

  ngOnInit(): void {
    this.el.classList.add("app-button");
  }
}
