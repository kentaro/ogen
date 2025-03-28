import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  const url = new URL(req.url);
  const redirectUrl = `/og?title=OGen&username=example`;
  
  return NextResponse.redirect(new URL(redirectUrl, url.origin));
} 