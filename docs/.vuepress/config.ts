import { defineUserConfig, defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
    base: '/ago-docs/',
    lang: 'en-US',
    title: 'Ago',
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
    theme: defaultTheme({
        navbar: [
            {
                text: 'Documentation',
                link: '/',
            },
            {
                text: 'Usage example',
                link: 'https://replit.com/@SerhiiCho/Usage-of-ago-package',
            },
            {
                text: 'GitHub',
                link: 'https://github.com/SerhiiCho/ago',
            },
            {
                text: '📃 Changelog',
                link: 'https://github.com/SerhiiCho/ago/blob/master/CHANGELOG.md',
            },
            {
                text: '👨🏻‍💻 Author',
                link: 'https://serhii.io/about-me',
                rel: 'author',
            },
            {
                text: '☕️ By me a coffee',
                link: 'https://www.buymeacoffee.com/serhiicho',
            },
        ],
    }),
})
