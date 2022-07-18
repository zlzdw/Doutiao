<template>
  <div class="article" v-if="show">

    <div class="titleImg">
      <h3>{{ title }}</h3>
      <img :src="cover.images[0]" alt="" v-if="cover.type === 1">
    </div>
    <div class="imgBox" v-if="cover.type === 3">
      <img :src="item" alt="" v-for="(item,i) in cover.images" :key="i">
      <!-- <img src="@/assets/logo.png" alt="">
      <img src="@/assets/logo.png" alt=""> -->
    </div>
    <div class="detail">
      <div class="msg">
        <span>作者：{{ author }}</span> <span>评价：{{ cmtCount }}</span> <span>发布时间：{{ time }}</span>
      </div>

      <van-popover v-model="showPopover" overlay placement="left-end" trigger="click" :actions="actions" @select="onSelect">
        <template #reference>
          <van-icon name="cross" />
        </template>
      </van-popover>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant'
require('vue2-animate/dist/vue2-animate.min.css')
export default {
  name: 'ArticleInfo',
  props: {
    title: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    cmtCount: {
      type: [Number, String], // 可以用数组指定多个可能的数据类型
      default: 0
    },
    time: {
      type: String,
      default: '--'
    },
    // 封面信息对象
    cover: {
      type: Object,
      // 通过 default 函数，返回 cover 属性的默认值
      default: () => {
        return { type: 0 }
      }
    }
  },
  data() {
    return {
      // 是否想看到此头条
      show: true,
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [
        { text: '不感兴趣', icon: 'close' },
        { text: '屏蔽作者', icon: 'info-o' },
        { text: '内容不适', icon: 'more-o' }
      ]
    }
  },
  methods: {
    onSelect(action) {
      Notify({ type: 'primary', message: '将减少相关推荐' })
      this.show = false
    }
  }
}

</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.article {
  // position: relative;
  padding: 3vw 0;
  min-height: 7vw;
  border-bottom: 1px solid #000;
  .titleImg {
    display: flex; // 如果想让图片和文字在一行显示，记得将父盒子设为 flex 盒子
    justify-content: space-between;
    h3 {
      font-weight: normal;
    }
    img {
      width: 33%;
    }
  }
  .imgBox {
    margin: 2vh 0;
    width: 100%;
    display: flex;
    img {
      flex: 1;
      width: 1px; // 一定要给宽度才能正常平分 flex 剩余空间
    }
  }
  .detail {
    display: flex;
    justify-content: space-between;
    .msg {
      flex: 7;
      span {
        font-size: 3vw;
        color: #b0afb6;
      }
    }
    /deep/ .van-icon {
      flex: 3;
      margin-right: 0;
      color: #d9d8db;
    }
  }
}
</style>