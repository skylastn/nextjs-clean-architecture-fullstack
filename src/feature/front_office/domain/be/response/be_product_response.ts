export class BeProductResponse {
  id?: number;
  code?: string;
  name?: string;
  detail?: string;
  price?: number;
  point?: number;
  qty?: null;
  duration?: number | null;
  cover_path?: null;
  coverUrl?: string;

  constructor(data?: BeProductResponse) {
    this.id = data?.id;
    this.code = data?.code;
    this.name = data?.name;
    this.detail = data?.detail;
    this.price = data?.price;
    this.point = data?.point;
    this.qty = data?.qty;
    this.duration = data?.duration;
    this.cover_path = data?.cover_path;
    this.coverUrl = data?.coverUrl;
  }
}
