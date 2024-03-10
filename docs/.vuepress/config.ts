import { defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import customStyles from './modules/customStyles'

export default defineUserConfig({
    base: '/ago-docs/',
    lang: 'en-US',
    title: 'Ago',
    head: [
        ['style', { type: 'text/css' }, customStyles]
    ],
    description: 'Date/time converter into "n time ago" format that supports multiple languages',
    plugins: [
        searchPlugin({
            locales: {
                '/': {
                    placeholder: 'Search',
                },
            },
        })
    ],
    bundler: viteBundler({
        viteOptions: {},
        vuePluginOptions: {},
    }),
    theme: defaultTheme({
        navbar: [
            {
                text: 'Documentation',
                link: '/',
            },
            {
                text: 'GitHub',
                link: 'https://github.com/SerhiiCho/ago',
            },
            {
                text: '📃 Changelog',
                link: 'https://github.com/SerhiiCho/ago/blob/master/CHANGELOG.md',
            },
        ],
    }),
})
