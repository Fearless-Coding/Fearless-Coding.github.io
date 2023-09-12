export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"heroImage\":\"/logo.png\",\"heroText\":\"Fearless Blog\",\"actions\":[{\"text\":\"进入主页\",\"link\":\"home\",\"type\":\"primary\"}],\"features\":[{\"title\":\"学习笔记\",\"details\":\"互联网主流技术选型，Spring全家桶、MyBatis Plus、Validator、Swagger、Vue、设计模式、算法 等技术栈;\"},{\"title\":\"工作栈\",\"details\":\"享受 Vue 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。\"},{\"title\":\"问题记录\",\"details\":\"VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。\"}],\"footer\":null,\"footerHtml\":true},\"headers\":[],\"git\":{},\"filePathRelative\":\"README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
