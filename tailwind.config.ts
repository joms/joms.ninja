import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        plugin(({ addUtilities }) => {
            addUtilities({
                // https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
                ".horizontal-writing-tb": { writingMode: "horizontal-tb" },
                ".vertical-writing-rl": { writingMode: "vertical-rl" },
                ".vertical-writing-lr": { writingMode: "vertical-lr" },
                // https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
                ".orientation-mixed": { textOrientation: "mixed" },
                ".orientation-upright": { textOrientation: "upright" },
                ".orientation-sideways-right": { textOrientation: "sideways-right" },
                ".orientation-sideways": { textOrientation: "sideways" },
                ".orientation-glyph": { textOrientation: "use-glyph-orientation" },
            });
        }),
    ],
} satisfies Config;
