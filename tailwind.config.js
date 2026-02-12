/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                pixel: ["'Press Start 2P'", "system-ui"],
                retro: ["'Outfit'", "system-ui"],
            },
            colors: {
                'cyber-lime': '#ADFF2F',
                'electric-purple': '#BF00FF',
                'midnight': '#0A0A0A',
                'hot-pink': '#FF69B4',
                'pixel-bg': '#1a1a1a',
                'pixel-border': '#333333',
                'pixel-green': '#4ade80',
                'pixel-red': '#f87171',
                'pixel-yellow': '#fbbf24',
            }
        },
    },
    plugins: [],
}
