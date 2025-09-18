import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Google Material Design Color System
        google: {
          blue: {
            50: "hsl(var(--google-blue-50))",
            100: "hsl(var(--google-blue-100))",
            200: "hsl(var(--google-blue-200))",
            300: "hsl(var(--google-blue-300))",
            400: "hsl(var(--google-blue-400))",
            500: "hsl(var(--google-blue-500))",
            600: "hsl(var(--google-blue-600))",
            700: "hsl(var(--google-blue-700))",
            800: "hsl(var(--google-blue-800))",
            900: "hsl(var(--google-blue-900))",
            DEFAULT: "hsl(var(--google-blue))",
          },
          red: {
            50: "hsl(var(--google-red-50))",
            100: "hsl(var(--google-red-100))",
            200: "hsl(var(--google-red-200))",
            300: "hsl(var(--google-red-300))",
            400: "hsl(var(--google-red-400))",
            500: "hsl(var(--google-red-500))",
            600: "hsl(var(--google-red-600))",
            700: "hsl(var(--google-red-700))",
            800: "hsl(var(--google-red-800))",
            900: "hsl(var(--google-red-900))",
            DEFAULT: "hsl(var(--google-red))",
          },
          yellow: {
            50: "hsl(var(--google-yellow-50))",
            100: "hsl(var(--google-yellow-100))",
            200: "hsl(var(--google-yellow-200))",
            300: "hsl(var(--google-yellow-300))",
            400: "hsl(var(--google-yellow-400))",
            500: "hsl(var(--google-yellow-500))",
            600: "hsl(var(--google-yellow-600))",
            700: "hsl(var(--google-yellow-700))",
            800: "hsl(var(--google-yellow-800))",
            900: "hsl(var(--google-yellow-900))",
            DEFAULT: "hsl(var(--google-yellow))",
          },
          green: {
            50: "hsl(var(--google-green-50))",
            100: "hsl(var(--google-green-100))",
            200: "hsl(var(--google-green-200))",
            300: "hsl(var(--google-green-300))",
            400: "hsl(var(--google-green-400))",
            500: "hsl(var(--google-green-500))",
            600: "hsl(var(--google-green-600))",
            700: "hsl(var(--google-green-700))",
            800: "hsl(var(--google-green-800))",
            900: "hsl(var(--google-green-900))",
            DEFAULT: "hsl(var(--google-green))",
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Google Sans', 'Roboto', 'system-ui', 'sans-serif'],
        display: ['Google Sans Display', 'Roboto', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px hsla(var(--glow-primary), 0.4)"
          },
          "50%": {
            boxShadow: "0 0 40px hsla(var(--glow-primary), 0.8), 0 0 60px hsla(var(--glow-secondary), 0.4)"
          }
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "rotate": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "rotate": "rotate 8s linear infinite",
      },
      boxShadow: {
        'elevation-1': 'var(--elevation-1)',
        'elevation-2': 'var(--elevation-2)',
        'elevation-3': 'var(--elevation-3)',
        'elevation-4': 'var(--elevation-4)',
        'elevation-5': 'var(--elevation-5)',
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
