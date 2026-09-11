import { AxiosResponse } from "axios";

export interface MetaResponse {
  first: number;
  last: number;
}

export class ResponseModel<T = unknown> {
  status = false;
  message?: string;
  total?: number;
  perPage?: number;
  currentPage?: number;
  data?: T;
  meta?: MetaResponse;

  static from<T>(
    res: AxiosResponse<{
      status?: boolean;
      message?: string;
      total?: number;
      perPage?: number;
      currentPage?: number;
      data?: T;
      meta?: MetaResponse;
    }>,
  ): ResponseModel<T> {
    return {
      status: res.data.status ?? false,
      message: res.data.message ?? res.statusText ?? "Success",
      total: res.data.total,
      perPage: res.data.perPage,
      currentPage: res.data.currentPage,
      data: res.data.data,
      meta: res.data.meta,
    };
  }

  static fromError(error: unknown): ResponseModel<never> {
    const res = new ResponseModel<never>();
    res.status = false;
    res.message = error instanceof Error ? error.message : "Unknown error";
    return res;
  }
}
