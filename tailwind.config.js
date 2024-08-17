/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Comic Sans MS', 'Comic Sans', 'System'],
        },
        extend: {
            colors: {
                light_primary: "var(--color-primary)",
                light_secondary: "var(--color-secondary)",
                dark_primary: "var(--color-dark_primary)",
                dark_secondary: "var(--color-dark_secondary)",
                text: "var(--color-text)"
            }
        },
    },
    plugins: [],
};
