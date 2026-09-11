import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // TODO: guard sesi berbasis cookie. Token saat ini disimpan di localStorage
  // sehingga tidak bisa dibaca middleware; sementara dibiarkan lolos seperti sebelumnya.
  return NextResponse.next();
}

export const config = {
  matcher: ["/welcome"],
};
