import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "weightHeight",
  standalone: true,
})
export class WeightHeightPipe implements PipeTransform {
  transform(value: any, type: "weight" | "height"): any {
    let valueToString = value.toString();
    if (valueToString.length === 1) {
      valueToString = `0,${valueToString}`;
    } else {
      valueToString = `${valueToString.substring(
        0,
        valueToString.length - 1,
      )},${valueToString[valueToString.length - 1]}`;
    }
    if (type === "height") {
      valueToString += " m";
    } else {
      valueToString += " Kg";
    }
    return valueToString;
  }
}
