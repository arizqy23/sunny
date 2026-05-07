/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // Sunny Brand Palette
                sunny: {
                    50:  '#fffef0',
                    100: '#fffbe0',
                    200: '#fff4a3',
                    300: '#ffe946',
                    400: '#ffd700',
                    500: '#f5c800',
                    600: '#d4a800',
                    700: '#a67c00',
                    800: '#7a5a00',
                    900: '#4a3600',
                },
                lime: {
                    50:  '#f7ffe0',
                    100: '#edffc3',
                    200: '#d9ff87',
                    300: '#bef74a',
                    400: '#a3e635',
                    500: '#84cc16',
                    600: '#65a30d',
                    700: '#4d7c0f',
                    800: '#3f6212',
                    900: '#365314',
                },
                fresh: {
                    lemon:  '#FFF44F',
                    lime:   '#AADF28',
                    citrus: '#FF9500',
                    mint:   '#00C896',
                    white:  '#FAFFFE',
                    cream:  '#FFFDF0',
                },
            },
            fontFamily: {
                display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
                body:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
                accent:  ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            },
            animation: {
                'float':        'float 6s ease-in-out infinite',
                'float-slow':   'float 9s ease-in-out infinite',
                'spin-slow':    'spin 20s linear infinite',
                'pulse-soft':   'pulse-soft 3s ease-in-out infinite',
                'fade-up':      'fadeUp 0.7s ease forwards',
                'slide-in':     'slideIn 0.6s ease forwards',
                'shimmer':      'shimmer 2.5s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%':      { transform: 'translateY(-20px)' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%':      { opacity: '0.85', transform: 'scale(1.03)' },
                },
                fadeUp: {
                    from: { opacity: '0', transform: 'translateY(40px)' },
                    to:   { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    from: { opacity: '0', transform: 'translateX(-30px)' },
                    to:   { opacity: '1', transform: 'translateX(0)' },
                },
                shimmer: {
                    '0%':   { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            backgroundImage: {
                'gradient-sunny': 'linear-gradient(135deg, #FFF44F 0%, #AADF28 100%)',
                'gradient-hero':  'linear-gradient(160deg, #FFFDF0 0%, #F7FFE0 50%, #E8FFC2 100%)',
                'gradient-lime':  'linear-gradient(135deg, #AADF28 0%, #00C896 100%)',
                'noise':          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
            },
            boxShadow: {
                'sunny': '0 20px 60px -10px rgba(255, 215, 0, 0.4)',
                'lime':  '0 20px 60px -10px rgba(170, 223, 40, 0.35)',
                'fresh': '0 8px 32px rgba(0, 200, 150, 0.2)',
                'glass': '0 8px 32px rgba(31, 38, 135, 0.07)',
                'float': '0 30px 80px -15px rgba(170, 223, 40, 0.3)',
            },
            backdropBlur: {
                xs: '2px',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};
