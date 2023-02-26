import { Component } from "@angular/core";

@Component({
  selector: "app-skeleton-sprite",
  template: `<div class="skeleton-loader"></div>`,
  styles: [
    `
      .skeleton-loader {
        width: 80px;
        height: 80px;
        display: block;
      }
    `,
  ],
})
export class SkeletonSpriteComponent {}
