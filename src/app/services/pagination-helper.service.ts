import { Injectable } from "@angular/core";

@Injectable()
export class PaginationHelperService {
  total: number = 0;
  limit: number = 0;
  current: number = 0;
  pagesTotal: number = 0;
  private numberOfItems = 6;

  getPages(total: number, limit: number, current: number): number[] {
    this.total = total;
    this.limit = limit;
    this.current = current;
    this.pagesTotal = Math.ceil(this.total / this.limit);

    const pages = this.processPages();
    return pages;
  }

  private processPages() {
    let result: number[] = [];
    if (this.current >= 1 && this.current <= this.numberOfItems - 1) {
      result = [...Array.from({ length: this.numberOfItems }, (_, i) => i + 1)];
      result.push(0);
      result.push(this.pagesTotal);

      return result;
    }

    if (this.current >= this.pagesTotal - (this.numberOfItems - 2)) {
      result.push(1);
      result.push(0);
      result = [
        ...result,
        ...Array.from(
          { length: this.numberOfItems },
          (_, i) => i + this.pagesTotal - (this.numberOfItems - 1),
        ),
      ];

      return result;
    }

    result.push(1);
    result.push(0);
    result = [
      ...result,
      ...Array.from(
        { length: this.numberOfItems },
        (_, i) => i + this.current - Math.ceil(this.numberOfItems / 2),
      ),
    ];
    result.push(0);
    result.push(this.pagesTotal);

    return result;
  }
}
