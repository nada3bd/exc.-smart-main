/* FILENAME: scripts/tailwind-setup.js */

window.tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                // Primary color palette
                primary: {
                    DEFAULT: '#00668c',
                    hover: '#005a7a',
                    light: '#71c4ef',
                    dark: '#00668c',
                },
                accent: {
                    DEFAULT: '#71c4ef',
                    hover: '#5bb0e0',
                    light: '#b6ccd8',
                },
                bg: {
                    primary: '#fffefb',
                    secondary: '#f5f4f1',
                    card: '#d4eaf7',
                    accent: '#b6ccd8',
                },
                text: {
                    primary: '#3b3c3d',
                    secondary: '#3b3c3d',
                    muted: '#3b3c3d',
                },
                border: {
                    DEFAULT: '#cccbc8',
                    light: '#b6ccd8',
                },
                // Legacy AI colors - mapped to new palette
                ai: {
                    50: '#d4eaf7',
                    100: '#b6ccd8',
                    400: '#71c4ef',
                    500: '#71c4ef',
                    600: '#00668c',
                    700: '#005a7a',
                    900: '#313d44',
                    sky: '#71c4ef',
                },
                // Updated slate colors to match new palette
                slate: {
                    50: '#f5f4f1',
                    100: '#d4eaf7',
                    200: '#b6ccd8',
                    300: '#cccbc8',
                    400: '#b6ccd8',
                    500: '#3b3c3d',
                    600: '#3b3c3d',
                    700: '#313d44',
                    800: '#313d44',
                    900: '#1d1c1c',
                },
                // Sky colors mapped to accent
                sky: {
                    50: '#d4eaf7',
                    100: '#b6ccd8',
                    400: '#71c4ef',
                    600: '#71c4ef',
                    900: '#313d44',
                },
                // Teal colors mapped to primary
                teal: {
                    50: '#d4eaf7',
                    100: '#b6ccd8',
                    400: '#71c4ef',
                    600: '#00668c',
                    900: '#313d44',
                },
                // Blue colors mapped to accent
                blue: {
                    50: '#d4eaf7',
                    100: '#b6ccd8',
                    400: '#71c4ef',
                    600: '#00668c',
                    900: '#313d44',
                },
                // Dark mode colors
                dark: {
                    bg: '#1d1c1c',
                    card: '#313d44',
                    accent: '#3b3c3d',
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        }
    }
}