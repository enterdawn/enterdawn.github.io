import { defineConfig } from 'vitepress'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "enterdawn",
  description: "enterdawn's blog",
  head: [
    ['script', { 
      src: './js/getip.js',      // 需放在 public/js 目录
      async: 'true',                // 异步加载
    }]],
  sitemap: {
    hostname: 'https://enterdawn.top'
  },
  themeConfig: {
    logo: '/logo.png',
    footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer"> 辽ICP备19018622号-1 </a><a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=21102102000151" target="_blank" rel="noopener noreferrer">     辽公网安备 21102102000151号</a>',
      copyright: '<a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" style="display:flex;align-items:center;justify-content:center;"> 本网站由<img src="/pic/2024/uplogo.webp" width="59px" height="30px" />提供cdn加速/云存储服务</a>'
    }
  },
  vite: {
    plugins: [ElementPlus()],
    ssr: {
      noExternal: ['workbox-window', /vue-i18n/, /element-plus/],
    },
  } 
}
)
