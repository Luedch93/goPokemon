import { PaginationHelperService } from "./pagination-helper.service";

fdescribe("PaginationHelperService", () => {
  let service: PaginationHelperService;
  beforeEach(() => {
    service = new PaginationHelperService();
  });

  it("should", () => {
    const result = service.getPages(10, 3, 1);

    expect(result).toBe([1, 2, 3, 4, 5, 0, 10]);
  });
});
