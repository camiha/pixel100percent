import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	styles: {
		initialColorMode: "system",
		useSystemColorMode: true,
		global: () => ({
			body: {
				bg: "rgba(0,0,0,0)",
				useSelect: "none",
				WebkitUserSelect: "none",
			},
			"::-webkit-scrollbar": {
				display: "none",
			},
		}),
	},
	components: {
		Flex: {
			baseStyle: {
				userDrag: "none",
			},
			variants: {
				dark: {
					bg: "gray.900",
				},
				light: {
					bg: "white",
				},
			},
		},
	},
});

export default theme;
