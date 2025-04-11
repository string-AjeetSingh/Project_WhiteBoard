import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3500',
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
})

/* 
server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3500',
        changeOrigin: true,
      }
    }
  }

--
 server: {
    middlewareMode: true, // IMPORTANT: Enables full control
    configureServer(server) {
      server.middlewares.use(
        '/api',
        createProxyMiddleware({
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          logLevel: 'debug', // Optional: helps you debug
          pathRewrite: { '^/api': '' },
          onProxyRes(proxyRes, req, res) {
            // Example: Log raw response headers
            console.log('Proxy Response:', proxyRes.statusCode, proxyRes.headers);
          }
        })
      );
    }
}

       */

