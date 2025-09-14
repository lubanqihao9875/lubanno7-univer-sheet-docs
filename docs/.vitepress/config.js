import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lubanno7 Univer Sheet',
  description: '基于 Univer 的强大电子表格组件',
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '指南', link: '/guide/' },
      { text: 'API 参考', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/lubanqihao9875/lubanno7-univer-sheet' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' }
          ]
        },
        {
          text: '基础',
          items: [
            { text: '基本用法', link: '/guide/basic-usage' },
            { text: '配置选项', link: '/guide/configuration' }
          ]
        },
        {
          text: '高级',
          items: [
            { text: '嵌套表头', link: '/guide/nested-headers' },
            { text: '单元格编辑器', link: '/guide/cell-editors' },
            { text: '事件处理', link: '/guide/events' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '组件属性', link: '/api/' },
            { text: '事件', link: '/api/events' },
            { text: '方法', link: '/api/methods' }
          ]
        }
      ]
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025-present lubanqihao9875'
    },

    search: {
      provider: 'local'
    }
  }
})