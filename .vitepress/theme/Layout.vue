<script setup lang="ts">
import { useData } from 'vitepress'

const { site, frontmatter } = useData()

</script>

<script lang="ts">
import global from '../blogtheme.mts'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

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

  <div v-if="frontmatter.home">
    <ul>
        <li>
            <a href="article/2025/abandon.html">
                <h2>abandon</h2>
                <p>或许放弃是一种更好的开始</p>
            </a>
        </li>
        <li>
            <a href="article/2025/low_cost_postgraduate_entrance_examination.html">
                <h2>低成本考研四个月上岸攻略</h2>
                <p>虽然但是，建议不要点，大概率会浪费你的时间</p>
            </a>
        </li>
        <li>
            <a href="article/2025/raspi_gear_ds1302.html">
                <h2>树莓派驱动舵机和DS1302时钟模块</h2>
                <p>enterdawn想要搭建一个私有云盘，但由于enterdawn学校宿舍每天晚上11点断电，而且enterdawn的移动硬盘盒有一个物理按键，每天断电后都要按一下，所以enterdawn决定让程序去执行这些事情。</p>
            </a>
        </li>

        <li>
          <a href="article/others/about.html">
              <h2>关于我</h2>
              <p>一些关于站长enterdawn本人的</p>
        </a>
        </li>
    </ul>
  </div>
  <div v-else>

      <div class="content">
          <Content />
      </div>
  </div>

  <div class="footer">
      <div v-html="site.themeConfig.footer.message"></div>
      <div v-html="site.themeConfig.footer.copyright"></div>
      <div @click="open">友情链接：点击查看</div>
      <div>Designed by <a href="article/others/about.html">enterdawn</a></div>
      <div>&copy;2025 enterdawn.top</div>
  </div>
</template>