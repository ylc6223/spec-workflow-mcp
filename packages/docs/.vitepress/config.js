import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SpecFlow MCP',
  description: 'AI规范驱动开发平台 - 构建AI敏捷开发闭环，让每一行代码都有据可循',
  
  // Ignore dead links during development
  ignoreDeadLinks: true,
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'MCP Server', link: '/guide/mcp-server' },
            { text: 'Dashboard', link: '/guide/dashboard' }
          ]
        },
        {
          text: 'Customization',
          items: [
            { text: 'Custom UI Elements', link: '/guide/custom-ui' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Core API', link: '/api/core' },
            { text: 'MCP Tools', link: '/api/mcp-tools' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jerry-spec/specflow-mcp' }
    ],

    footer: {
      message: 'Released under the GPL-3.0 License.',
      copyright: 'Copyright © 2024 SpecFlow MCP'
    }
  },

  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:title', content: 'Spec Workflow MCP | Documentation' }],
    ['meta', { name: 'og:site_name', content: 'Spec Workflow MCP' }],
    ['meta', { name: 'og:url', content: 'https://spec-workflow-mcp.dev/' }]
  ]
})