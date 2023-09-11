import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
const srcPath = path.resolve(__dirname, 'src')
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: path.resolve(srcPath, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep']
        }),
        ElementPlusResolver()
      ],
      dts: path.resolve(srcPath, 'components.d.ts')
    }),
    Icons({
      autoInstall: true
    }),
    viteMockServe({
      mockPath: './src/api/mock',
      enable: true,
      watchFiles: true
    }),
    Inspect()
  ],
  resolve: {
    alias: {
      '@': srcPath
    }
  }
})
