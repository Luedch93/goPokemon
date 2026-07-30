import { PaginationHelperService } from "./pagination-helper.service";

describe("PaginationHelperService", () => {
  let service: PaginationHelperService;
  beforeEach(() => {
    service = new PaginationHelperService();
  });

  it("should", () => {
    const result = service.getPages(10, 3, 1);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 0, 4]);
  });

  it("should", () => {
    const result = service.getPages(10, 3, 4);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 0, 4]);
  });
});
