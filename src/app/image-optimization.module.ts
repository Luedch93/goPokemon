import { NgOptimizedImage, provideImgixLoader } from "@angular/common";
import { NgModule } from "@angular/core";

const POKEMON_SPRITES_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

@NgModule({
  exports: [NgOptimizedImage],
  imports: [NgOptimizedImage],
  providers: [provideImgixLoader(POKEMON_SPRITES_URL)],
})
export class ImageOptimizationModule {}
