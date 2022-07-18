<template>
  <div class="home-container">
    <van-nav-bar title="头条" fixed placeholder />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
      <van-list :immediate-check="false" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleInfo v-for="item in artlist" :key="item.id" :title="item.title" :author="item.aut_name" :cmt-count="item.comm_count" :time="item.pubdate" :cover="item.cover"></ArticleInfo>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
// 导入需要的 API 接口
import { getArticleListAPI } from '@/api/articleAPI'

// 导入组件
import ArticleInfo from '@/components/Article/ArticleInfo.vue'
export default {
  name: 'Home_zujian',
  data() {
    return {
      // 页码值
      page: 1,
      // 每页显示多少数据
      limit: 10,
      // 文章的数组
      artlist: [],
      // 是否正则加载下一页数据，如果 loading 为 true, 则不会返回触发 load 事件
      loading: true,
      // 所有数据是否加载完毕了，如果没有更多数据了，要把 finished 改为 true
      finished: false,
      // 是否加载失败
      error: false,
      isLoading: false
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticleList(isRefresh) {
      // 发起 GET 请求，获取文章的列表数据
      const { data: res } = await getArticleListAPI(this.page, this.limit)
      // this.artlist = res
      if (isRefresh) {
        // 下拉刷新，新数据在前，旧数据在后
        this.artlist = [...res, ...this.artlist]
        this.isLoading = false
      } else {
        // 如果上拉加载更多，那么应该用 扩展运算符把新数据往旧数据后拼接
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }

      // 如果请求的数据为空，直接把 finished 改为 true, 表示数据全部加载完毕
      if (res.length === 0) this.finished = true
      // this.loading = true
    },
    // 只要 onLoad 被调用，就应该请求下一页数据
    onLoad() {
      // 页码值加 1
      this.page++
      // 重新调用数据
      this.initArticleList()
    },
    onRefresh() {
      this.page++
      this.initArticleList(true)
    }
  },
  // 注册组件
  components: {
    ArticleInfo
  }
}
</script>

<style lang="less" scoped >
.home-container {
  user-select: none;
  // overflow-x: hidden; 这个样式会无限触发 onLade 上拉刷新函数
  padding-bottom: 50px;
  padding-right: 4vw;
  padding-left: 4vw;
  /deep/ .van-nav-bar {
    background-color: #fff;
    .van-nav-bar__title {
      color: #000;
    }
  }
}
</style>