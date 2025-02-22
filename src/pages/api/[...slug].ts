
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

// 排除代理的特殊路由
const EXCLUDE_ROUTES = [
  '/cards'
];

// 单例代理实例
const proxy:any = httpProxy.createProxyServer({
  target: process.env.NESTJS_API_URL,
  changeOrigin: true,
  proxyTimeout: 5000,
  xfwd: true,
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 环境变量校验
  if (!process.env.NESTJS_API_URL) {
    console.error('NESTJS_API_URL is not configured');
    return res.status(500).json({ 
      code: 'CONFIG_ERROR',
      message: 'Server configuration error' 
    });
  }

  try {
    // 统一添加CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 处理预检请求
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // 检查是否排除路由
    const requestPath = req.url || '/';
    if (EXCLUDE_ROUTES.some(route => requestPath.startsWith(`/api${route}`))) {
      return res.status(404).json({ 
        code: 'ROUTE_NOT_FOUND',
        message: 'This route is handled by specific API endpoint' 
      });
    }

    // 转发时保留原始路径（移除/api前缀）
    const originalUrl = requestPath.replace(/^\/api/, '');
    
    return new Promise((resolve) => {
      proxy.web(req, res, { 
        target: process.env.NESTJS_API_URL + originalUrl,
        headers: {
          // 添加认证头（根据NestJS需求配置）
          'X-Forwarded-Client': req.headers['x-forwarded-for'] || req.socket.remoteAddress
        }
      }, (err) => {
        if (err) {
          console.error(`Proxy error: ${err.message}`, {
            url: originalUrl,
            method: req.method,
            headers: req.headers
          });
          res.status(502).json({
            code: 'PROXY_ERROR',
            message: 'Backend service unavailable'
          });
        }
        resolve(undefined);
      });
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({
      code: 'SERVER_ERROR',
      message: 'Internal server error'
    });
  }
}
