// middleware/auth.js
import { Use } from 'next-auth';
export function middleware(req) {
  // 排除健康检查端点
  if (req.nextUrl.pathname === '/api/healthcheck') {
    return;
  }

  const token = req.headers.get('authorization')?.split(' ')[1];
  
  if (!token || !verifyToken(token)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
