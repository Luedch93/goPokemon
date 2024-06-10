import { Component, HostListener, Input } from "@angular/core";

import { ButtonDirective } from "../button/button.directive";

@Component({
  selector: "app-sound-button",
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: "./sound-button.component.html",
  styleUrl: "./sound-button.component.scss",
})
export class SoundButtonComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) fileUrl!: string;
  private sound!: HTMLAudioElement;

  @HostListener("click") playSound() {
    try {
      this.sound = new Audio(this.fileUrl);
      this.sound.play();
    } catch (error) {
      console.log(error);
    }
  }
}
