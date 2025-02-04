/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#1a51a2",
                "primary-200": "rgba(231,241,255,1)",
                "background-light": "#F8F7FA",
                "background-gray-light": "#F7F7F7",
                "background-gray-light-100": "rgba(247,247,247,0.83)",
            }
        },
    },
    plugins: [],
}