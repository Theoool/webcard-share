// app/api/auth/update-token/route.ts
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

export default async function POST(req: any) {
  const session = await getSession({ req });
  if (!session) throw {error: 'Unauthorized' , status: 401 };
  // throw { status: response.status, message: response.statusText };
  const { accessToken } = await req.json();
  session.accessToken = accessToken; // 更新 session

  console.log("更新成功");
   
   throw { message: 'Token updated' };
}
