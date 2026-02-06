/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0ea5e9', // Sky 500
                secondary: '#10b981', // Emerald 500
                accent: '#6366f1', // Indigo 500
                surface: '#ffffff',
                background: '#f8fafc', // Slate 50
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
