export default {
  title: 'Lubanno7UniverSheet',
  description: 'Lubanno7UniverSheet 组件文档',
  lang: 'zh-CN',
  base: '/lubanno7-univer-sheet-docs/',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '资源', link: '/resources/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lubanqihao9875/lubanno7-univer-sheet' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/' },
            { text: '基础用法', link: '/guide/basic-usage' },
            { text: '高级配置', link: '/guide/advanced-config' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: '属性', link: '/api/' },
            { text: '方法', link: '/api/methods' },
            { text: '事件', link: '/api/events' },
          ]
        }
      ],
      '/resources/': [
        {
          text: '资源',
          items: [
            { text: '常见问题', link: '/resources/' },
            { text: '更新日志', link: '/resources/changelog' },
            { text: '相关链接', link: '/resources/links' },
          ]
        }
      ]
    },
    footer: {
      message: 'Lubanno7UniverSheet 基于 MIT 许可发布',
      copyright: '作者：lubanqihao9875'
    },
    search: {
      provider: 'local'
    }
  }
}