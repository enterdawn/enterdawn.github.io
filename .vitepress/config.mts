import {defineConfig} from 'vitepress'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitepress.dev/reference/site-config
import {createContentLoader} from 'vitepress'
import {writeFileSync} from 'fs'
import path from 'path'

async function generateAllPagesData() {
    // 1. 使用通配符 **/*.md 递归读取所有 markdown 文件
    const allPosts = await createContentLoader('**/*.md', {
        includeRaw: false, // 不包含原始源码
        render: false,     // 不渲染 HTML，加快速度
        excerpt: false     // 不需要摘要
    }).load()

    // 2. 过滤和转换数据
    const filteredPosts = allPosts
        .map(post => ({
            // 获取相对 URL
            url: post.url,
            // 获取 frontmatter 数据
            title: post.frontmatter.title,
            date: post.frontmatter.date,
            description:post.frontmatter.description,
            tag:post.frontmatter.tag,
            // 你可以获取其他数据，比如分类、标签等
        }))
        // 3. 【核心步骤】过滤掉首页
        // 首页的 url 通常是 '/'，也可以检查 frontmatter.home === true
        .filter(post => post.url !== '/')
        // 4. 按日期排序（如果有 date 字段）
        .sort((a, b) => {
            return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
        })

    // 5. 写入 public 目录，这样前端可以通过 /all-pages.json 访问
    // 确保你的 public 目录存在于 .vitepress/public
    const outputPath = path.resolve(__dirname, '../all-pages.json')
    writeFileSync(outputPath, JSON.stringify(filteredPosts))

    console.log('✅ 所有页面数据已生成，排除首页。')
}


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
            plugins: [
                ElementPlus(),
                {
                    name: 'generate-pages-on-dev-start',
                    configureServer() {
                        // 这里没有 await，也可以用 async configureServer() { ... }
                        generateAllPagesData().catch(err => {
                            console.error('生成 all-pages.json 失败', err)
                        })
                    }
                }
            ],
            ssr: {
                noExternal: ['workbox-window', /vue-i18n/, /element-plus/],
            },
            server:{
                port: 3000,
                host: true
            }
        },
        async buildEnd() {
            await generateAllPagesData()
        }
    }
)
