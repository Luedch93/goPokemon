import { Injectable } from "@angular/core";

@Injectable()
export class PaginationHelperService {
  total: number = 0;
  limit: number = 0;
  current: number = 0;
  numberOfPages: number = 0;

  getPages(total: number, limit: number, current: number): number[] {
    this.total = total;
    this.limit = limit;
    this.current = current;
    this.numberOfPages = Math.ceil(this.total / this.limit);

    const pages = this.processPages();
    return pages;
  }

  private processPages() {
    let result: number[] = [];
    if (this.current >= 1 && this.current <= 4) {
      result = [...Array.from({ length: 5 }, (_, i) => i + 1)];
      result.push(0);
      result.push(this.numberOfPages);

      return result;
    }

    if (this.current >= this.numberOfPages - 5) {
      result.push(1);
      result.push(0);
      result = [
        ...result,
        ...Array.from({ length: 5 }, (_, i) => i + this.numberOfPages - 4),
      ];

      return result;
    }

    result.push(1);
    result.push(0);
    result = [
      ...result,
      ...Array.from({ length: 5 }, (_, i) => i + this.current - 2),
    ];
    result.push(0);
    result.push(this.numberOfPages);

    return result;
  }
}
