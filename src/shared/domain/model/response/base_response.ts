export class MetaResponse {
  first?: number;
  last?: number;

  constructor(first?: number, last?: number) {
    this.first = first;
    this.last = last;
  }
}

export class BaseResponse<T> {
  status?: boolean;
  code?: number;
  message?: string;
  total?: number;
  perPage?: number;
  currentPage?: number;
  data?: T;
  meta?: MetaResponse;

  constructor(
    status?: boolean,
    code?: number,
    message?: string,
    total?: number,
    perPage?: number,
    currentPage?: number,
    data?: T,
    meta?: MetaResponse,
  ) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.total = total;
    this.perPage = perPage;
    this.currentPage = currentPage;
    this.data = data;
    this.meta = meta;
  }
}
