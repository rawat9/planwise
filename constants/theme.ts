/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
	light: {
		text: "#11181C",
		// background: "#fff",
		tint: tintColorLight,
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
		background: "hsl(0 0% 100%)",
		foreground: "hsl(0 0% 3.9%)",
		card: "hsl(0 0% 100%)",
		cardForeground: "hsl(0 0% 3.9%)",
		popover: "hsl(0 0% 100%)",
		popoverForeground: "hsl(0 0% 3.9%)",
		primary: "hsl(0 0% 9%)",
		primaryForeground: "hsl(0 0% 98%)",
		secondary: "hsl(0 0% 96.1%)",
		secondaryForeground: "hsl(0 0% 9%)",
		muted: "hsl(0 0% 96.1%)",
		mutedForeground: "hsl(0 0% 45.1%)",
		accent: "hsl(0 0% 96.1%)",
		accentForeground: "hsl(0 0% 9%)",
		destructive: "hsl(0 84.2% 60.2%)",
		border: "hsl(0 0% 89.8%)",
		input: "hsl(0 0% 89.8%)",
		ring: "hsl(0 0% 63%)",
		radius: "0.625rem",
		chart1: "hsl(12 76% 61%)",
		chart2: "hsl(173 58% 39%)",
		chart3: "hsl(197 37% 24%)",
		chart4: "hsl(43 74% 66%)",
		chart5: "hsl(27 87% 67%)",
	},
	dark: {
		text: "#ECEDEE",
		background: "#151718",
		tint: tintColorDark,
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: tintColorDark,
	},
};

export const Fonts = Platform.select({
	ios: {
		/** iOS `UIFontDescriptorSystemDesignDefault` */
		sans: "system-ui",
		/** iOS `UIFontDescriptorSystemDesignSerif` */
		serif: "ui-serif",
		/** iOS `UIFontDescriptorSystemDesignRounded` */
		rounded: "ui-rounded",
		/** iOS `UIFontDescriptorSystemDesignMonospaced` */
		mono: "ui-monospace",
	},
	default: {
		sans: "normal",
		serif: "serif",
		rounded: "normal",
		mono: "monospace",
	},
	web: {
		sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
		serif: "Georgia, 'Times New Roman', serif",
		rounded:
			"'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
		mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
	},
});
