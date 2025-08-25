import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Enable esbuild's tree shaking
      treeShaking: true,
    },
    // Force include these dependencies for optimization
    include: [
      'react',
      'react-dom',
      '@react-three/fiber',
      '@react-three/drei',
      'three',
      'three-stdlib'
    ],
  },
  build: {
    // Increase the chunk size warning limit
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', 'three-stdlib'],
          'r3f-vendor': ['@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  server: {
    // Enable HMR
    hmr: {
      overlay: false
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    force: true
  }
});
