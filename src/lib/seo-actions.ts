"use server";

import 'server-only';

import type { ReadableStream } from 'stream/web';

export const parseSeoAction = async (url: string):Promise<any> => {
  try {
    const response = await fetch(
      `http://localhost:3000/search/cards/parse?url=${encodeURIComponent(url)}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`请求失败: ${response.status} - ${errorText}`);
    }

    if (!response.body) {
      throw new Error("响应体不可读");
    }

    return response.body;
    
  } catch (error) {
    console.error('SEO解析错误:', error);
    throw new Error(typeof error === 'string' ? error : '解析失败');
  }
};
