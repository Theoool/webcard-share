import { io, Socket } from "socket.io-client";

const clientId = Date.now().toString(); // 生成唯一客户端ID

// 创建WebSocket连接
const connectWebSocket = (): Socket => {
  const socket = io("http://localhost:3000", {
    path: "/ws",
    transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 3000
  });
  // 连接建立后的处理
  socket.on('connect', () => {
    console.log('WebSocket连接已建立');
  });

  // 连接错误处理
  socket.on('error', (error) => {
    console.error('WebSocket连接错误:', error);
  });

  // 连接关闭处理
  socket.on('disconnect', () => {
    console.log('WebSocket连接已关闭，5秒后尝试重连...');
    setTimeout(() => {
      socket.connect();
    }, 5000);
  });

  // 监听服务器消息
  socket.on("progress", (data) => {
    console.log(data);
    
  try {
      // 处理连接状态消息
      if (data.type === 'connection_status') {
        console.log('连接状态:', data.status);
        return;
      }
      
      // 处理进度更新消息
      if (data.status === 'processing') {
        console.log('进度更新:', data);
        updateProgressBar(data.progress);
      }
    } catch (error) {
      console.error('消息解析错误:', error);
    }
  });

  return socket;
};

// 初始化WebSocket连接（仅在客户端）
let socket: Socket | null = null;

// 获取socket实例的函数
export const getSocket = (): Socket => {
  if (typeof window !== 'undefined' && !socket) {
    socket = connectWebSocket();
  }
  return socket as Socket;
};

// 提交检测任务
export async function submitUrls(urls: string[]) {
  // 确保在客户端环境中初始化socket
  if (typeof window !== 'undefined') {
    getSocket();
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/url-check?clientId=${clientId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls })
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    if (typeof window !== 'undefined') {
         (window as any).currentTaskId = result.taskId;
       }
       
       // 使用Socket.io的方式发送绑定消息
       if (socket && socket.connected) {
         socket.emit('bind-task', result.taskId);
       }
   
    console.log('任务ID:', result.taskId);
    return result;
  } catch (error) {
    console.error('提交任务失败:', error);
    throw error;
  }
}

// 进度条更新函数
function updateProgressBar(progress: any) {
  if (!progress) return;
  
  // 记录进度到控制台
  console.log(`处理进度: ${progress.processed}/${progress.total}`);
  console.log(`成功: ${progress.success} 失败: ${progress.failed}`);
  console.log(`完成百分比: ${progress.percentage}%`);
  
  // 触发自定义事件，让组件可以监听到进度更新
  if (typeof window !== 'undefined') {
    const progressEvent = new CustomEvent('url-analysis-progress', { 
      detail: progress 
    });
    window.dispatchEvent(progressEvent);
  }
}
