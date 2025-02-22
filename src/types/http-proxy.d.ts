declare module 'http-proxy' {
  interface ServerOptions {
    proxyTimeout?: number;
  }

  export function createProxyServer(arg0: { target: string | undefined; changeOrigin: boolean; proxyTimeout: number; xfwd: boolean; }) {
    throw new Error('Function not implemented.');
  }
}
