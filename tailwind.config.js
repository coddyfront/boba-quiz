module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./app/components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "main_blue": '#534fb3',
                "main_blue-50": 'rgba(83,79,179,0.5)',
                "main_red": '#534fb3',
            },
        },
        fontSize: {
            'default': '2rem',
            'medium': '1.5rem',
            'small': '1.2rem',
            'h1': '3.5rem',
            'h2': '1.25rem',
            'h3': '1.563rem',
            'h4': '1.953rem',
            'h5': '2.441rem',
            'h6': '3.052rem',
        }

    },
    plugins: [],
}
