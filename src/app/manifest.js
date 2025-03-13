export default function manifest() {
    return {
        name: 'Hargile presentation site',
        short_name: 'Hargile presentation site',
        description: 'Hargile presentation site',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
