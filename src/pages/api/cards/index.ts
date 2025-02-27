import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  console.log(session);
  
  // 身份验证
  if (!session?.user) {
    console.log(session);
    return res.status(401).json({ 
      code: 'UNAUTHORIZED',
      message: '需要登录才能执行此操作' 
    })
  }

  // 仅处理POST请求
  if (req.method === 'POST') {
    try {
      // 验证请求数据
      const { title, url } = req.body
      if (!title || !url) {
        return res.status(400).json({
          code: 'MISSING_REQUIRED_FIELDS',
          message: '标题和URL为必填字段'
        })
      }

      // 转发请求到NestJS后端
      const response = await fetch(`${process.env.NEST_URL}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        body: JSON.stringify({
          ...req.body,
        })
      })

      // 处理后端响应
      if (!response.ok) {
        const errorData = await response.json()
        return res.status(response.status).json({
          code: 'BACKEND_ERROR',
          message: errorData.message || '后端服务错误',
          details: errorData
        })
      }

      const data = await response.json()
      return res.status(201).json(data)
      
    } catch (error) {
      console.error('卡片创建失败:', error)
      return res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: '服务器内部错误'
      })
    }
  }
  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED', 
    message: '不支持的请求方法'
  })
}
