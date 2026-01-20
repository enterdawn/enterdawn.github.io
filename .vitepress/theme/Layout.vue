<script setup lang="ts">
import { useData } from 'vitepress'

const { site, frontmatter } = useData()

import all_page_metadata  from "../../all-pages.json"
const sortedArticles = [...all_page_metadata].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
})
import { ElPagination } from 'element-plus'
import { ref, computed } from 'vue'


const currentPage = ref(1)
const pageSize = ref(5)

// --- 计算属性：处理切片逻辑 ---
// 根据当前页码和每页条数，从 sortedArticles 中截取对应的数据
const pagedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return sortedArticles.slice(start, end)
})

// --- 事件处理 ---
const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`)
  // 改变每页条数时，通常建议回到第一页
  currentPage.value = 1
}

const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`)
  // 切换页面后滚动到顶部，体验更好
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
import 'element-plus/theme-chalk/dark/css-vars.css'

</script>

<script lang="ts">
import global from '../blogtheme.mts'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import '@fortawesome/fontawesome-free/css/all.min.css'

const scrolls=global.blogtheme.motto
export default {
    data() {
      return {
        scroll:scrolls[0],
        i:0
      };
    },
    mounted() {
        hljs.registerLanguage('javascript', javascript);
        hljs.highlightAll();
        setInterval(() => {
          this.i=(this.i+1)%scrolls.length
          this.scroll=scrolls[this.i]
          let randomInt = Math.floor(Math.random() * 19260817) + 1;
          if(randomInt === 19260817){
            this.scroll="浣犲ソ, 涓栫晫!"
          }
        }, 2000);
    }
};

import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
const open = () => {
    ElMessageBox.alert('暂时没有友情链接', '很遗憾', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '筍岆斕褫眕薊炵桴酗氝樓',
        callback: (action: Action) => {
            ElMessage({
                type: 'info',
                message: `“筍岆斕褫眕薊炵桴酗氝樓”,这不是乱码`,
            })
        },
    })
}

</script>

<template>
  <div class="head">
    <a href="/"><h1>{{ site.title }}</h1></a>
    <p>{{ site.description }}</p>
    <p>{{ scroll }}<br></p>
  </div>

  <div  v-if="frontmatter.home">
    <div class="article_list">
    <ul>
        <li v-for="article in pagedArticles" :key="article.url" style="margin: 16px 0; padding: 8px;">
            <a :href="article.url" style="text-decoration: none; color: inherit;">
                <h2 style="margin: 0 0 8px 0; font-size: 1.2em;">{{ article.title }}</h2>
                <p style="font-size: 0.8em; margin: 0 0 8px 0;">
                    <i class="fa-regular fa-clock" style="margin-right: 4px; font-size: 1em; color: #ffffff;"></i>
                    {{ article.date }} | {{ article.tag }}
                </p>
                <!-- 注意：你的JSON里没有文章摘要，这里暂时留空或写默认值 -->
                <p style="margin: 0; color: #ffffff;">{{ article.description }}</p>
            </a>
        </li>
    
<!--        <li>-->
<!--            <a href="article/2025/v100_for_qwen25vl_finetuning.html">-->
<!--                <h2>在V100上微调Qwen2.5-VL</h2>-->
<!--                <p style="font-size: 0.8em;"><i class="fa-regular fa-clock" style="margin-right: 4px; font-size: 1em; color: #ffffff;"></i>2025-10-26 | 无分类</p>-->
<!--                <p>只是简单微调而已，没什么技术含量</p>-->
<!--            </a>-->
<!--        </li>-->
<!--        <li>-->
<!--            <a href="article/2025/abandon.html">-->
<!--                <h2>abandon</h2>-->
<!--                <p>或许放弃是一种更好的开始</p>-->
<!--            </a>-->
<!--        </li>-->
<!--        <li>-->
<!--            <a href="article/2025/low_cost_postgraduate_entrance_examination.html">-->
<!--                <h2>低成本考研四个月上岸攻略</h2>-->
<!--                <p>虽然但是，建议不要点，大概率会浪费你的时间</p>-->
<!--            </a>-->
<!--        </li>-->
<!--        <li>-->
<!--            <a href="article/2025/raspi_gear_ds1302.html">-->
<!--                <h2>树莓派驱动舵机和DS1302时钟模块</h2>-->
<!--                <p>enterdawn想要搭建一个私有云盘，但由于enterdawn学校宿舍每天晚上11点断电，而且enterdawn的移动硬盘盒有一个物理按键，每天断电后都要按一下，所以enterdawn决定让程序去执行这些事情。</p>-->
<!--            </a>-->
<!--        </li>-->

<!--        <li>-->
<!--          <a href="article/others/about.html">-->
<!--              <h2>关于我</h2>-->
<!--              <p>一些关于站长enterdawn本人的</p>-->
<!--        </a>-->
<!--        </li>-->
    </ul></div>
    <div class="pagination-box">
      <el-pagination
        class="my-pagination"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 40]"
        :background="true"
        layout="sizes, prev, pager, next, jumper"
        :total="sortedArticles.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <div v-else>
      <div class="content">
          <h1>{{frontmatter.title}}</h1>
          <p style="font-size: 1.0em;"><i class="fa-regular fa-clock" style="margin-right: 4px; font-size: 1em; color: #ffffff;"></i>{{frontmatter.date}} | 无分类</p>
          <Content />
      </div>
  </div>

  <div class="footer">
      <div v-html="site.themeConfig.footer.message"></div>
      <div v-html="site.themeConfig.footer.copyright"></div>
      <div @click="open">友情链接：点击查看</div>
      <div>Designed by <a href="article/others/about.html">enterdawn</a></div>
      <div>&copy;2026 enterdawn.top</div>
  </div>
</template>