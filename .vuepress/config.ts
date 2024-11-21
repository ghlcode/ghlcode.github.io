import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { sitemapPlugin } from '@vuepress/plugin-sitemap'

export default defineUserConfig({
  title: "GHLcode",
  description: "山高水长，怕什么来不及，慌什么到不了。",
  bundler: viteBundler(),
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }]
  ],
  plugins: [
    sitemapPlugin({
      hostname: 'https://ghlcode.cn'
    }),
  ],
  // bundler: webpackBundler(),
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.ico",
    author: "Ghlerrix",
    authorAvatar: "/head.png",
    repo: "https://github.com/ghlcode",
    // docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
    // docsBranch: "main",
    // docsDir: "example",
    // lastUpdatedText: "",
    pages: [
      {
        path: '/server-manual',
        layout: 'Layout',
      },
    ],

    // // series 为原 sidebar
    // series: {
    //   "/docs/theme-reco/": [
    //     {
    //       text: "module one",
    //       children: ["home", "theme"],
    //     },
    //     {
    //       text: "module two",
    //       children: ["api", "plugin"],
    //     },
    //   ],
    // },

    navbar: [
      { text: "首页", link: "/" },
      { text: "时间轴", link: "/timeline.html"},
      // { text: "Categories", link: "/categories/blogs/1.html" },
      // { text: "Tags", link: "/tags/tag/1.html" },
      // {
      //   text: "Docs",
      //   children: [
      //     { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
      //     { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
      //   ],
      // },
    ],

    // 自动设置分类
    autoSetBlogCategories: true,
    // 自动将分类和标签添加至头部导航条
    autoAddCategoryToNavbar: {
      location: 1, // 插入位置，默认 0
      showIcon: true, // 展示图标，默认 false
    },
    // 当 autoAddCategoryToNavbar 为 true 时，则全部取默认值
    // autoAddCategoryToNavbar: true,

    tip: '提示',
    info: '信息',
    danger: '危险',
    warning: '警告',
    details: '详情',
    tagsText: '标签',
    backToHome: '返回首页',
    categoriesText: '分类',
    catalogTitle: '页面导航',
    editLinkText: '编辑当前页面',
    lastUpdatedText: '最后更新时间',
    selectLanguageName: '简体中文',
    notFound: '哇哦，没有发现这个页面！',
    inputPasswordText: '请输入密码',
    unlockSucessText: '密码正确，玩得开心！',
    unlockFailuerText: '密码错误，请重新输入！'

    // bulletin: {
    //   body: [
    //     {
    //       type: "text",
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "QQ 群",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "GitHub",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "buttongroup",
    //       children: [
    //         {
    //           text: "打赏",
    //           link: "/docs/others/donate.html",
    //         },
    //       ],
    //     },
    //   ],
    // },

    // commentConfig: {
    //   type: 'valine',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
