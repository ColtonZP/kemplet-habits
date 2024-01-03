/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            black: '#000',
            white: '#fff',
            licorice: 'rgb(var(--color-licorice) / <alpha-value>)',
            'ghost-white': 'rgb(var(--color-ghost-white) / <alpha-value>)',
            'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        extend: {},
    },
    plugins: [],
};
