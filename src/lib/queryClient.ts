// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

const fetchApi = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`http://localhost:3000${url}`, options);
  if (!response.ok) throw { status: response.status, message: response.statusText };
  
  return await response.json();
};

let isRefreshing = false;
let failedQueue: Array<(token: string) => void> = [];

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach( async (prom) => (error ? prom(await Promise.reject(error)) : prom(await Promise.resolve(token!))));
  failedQueue = [];
};

const urlArray=['/Card/new','/Card/all']
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => { 
        const [url] = queryKey as [string];
       if ( urlArray.includes(url)) {
        return await fetchApi(url);
       }else{
        const session = await import('next-auth/react').then((mod) => mod.getSession());
        if (!session) throw new Error('Unauthorized');
        const token = session.accessToken;
        try {
          return await fetchApi(url, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (error: any) {
          if (error.status === 401 && !isRefreshing) {

            isRefreshing = true;
            try {
              const res = await fetch('http://localhost:3000/auth/refreshtoken', {
                mode: 'cors',
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${session}`,
                },
                body: JSON.stringify({
                  refreshtoken:`${session.refreshToken}`
                }),
              }).then(res=>res.json())
              
  
           if (!res.ok) throw { status: res.status, message: res.statusText };
           const {accessToken: newToken }=res.json()
              await fetch('/api/auth/update-token/router', {
                method: 'POST',
                body: JSON.stringify({ accessToken: newToken }),
              });
              processQueue(null, newToken);
              isRefreshing = false;
              return fetchApi(url, {
                headers: { Authorization: `Bearer ${newToken}` },
              });
            } catch (refreshError) {
              processQueue(refreshError);
              isRefreshing = false;
              console.log("刷新失败，登出用户");
              signOut(); // 刷新失败，登出用户
              throw refreshError;
            }
          } else if (error.status === 401) {
            return new Promise((resolve) => {
              failedQueue.push((newToken) =>
                resolve(fetchApi(url, { headers: { Authorization: `Bearer ${newToken}` } }))
              );
            });
          }
          throw error;
        }
       }
        
      },
   
      retry: false,
    },
  
  },
});
