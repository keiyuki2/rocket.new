/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
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
        border: "var(--color-border)", // gray-700
        input: "var(--color-input)", // surface
        ring: "var(--color-ring)", // primary
        background: "var(--color-background)", // charcoal
        foreground: "var(--color-foreground)", // white
        primary: {
          DEFAULT: "var(--color-primary)", // electric-blue
          foreground: "var(--color-primary-foreground)", // background
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // deep-navy
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // error-red
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // secondary
          foreground: "var(--color-muted-foreground)", // text-secondary
        },
        accent: {
          DEFAULT: "var(--color-accent)", // vibrant-green
          foreground: "var(--color-accent-foreground)", // background
        },
        popover: {
          DEFAULT: "var(--color-popover)", // surface
          foreground: "var(--color-popover-foreground)", // white
        },
        card: {
          DEFAULT: "var(--color-card)", // surface
          foreground: "var(--color-card-foreground)", // white
        },
        success: {
          DEFAULT: "var(--color-success)", // success-green
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-warning
          foreground: "var(--color-warning-foreground)", // background
        },
        error: {
          DEFAULT: "var(--color-error)", // error-red
          foreground: "var(--color-error-foreground)", // white
        },
        surface: "var(--color-surface)", // elevated-surface
        "text-primary": "var(--color-text-primary)", // white
        "text-secondary": "var(--color-text-secondary)", // muted-gray
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.15)',
        'modal': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      transitionDuration: {
        'smooth': '200ms',
        'layout': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
        'layout': 'ease-in-out',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}