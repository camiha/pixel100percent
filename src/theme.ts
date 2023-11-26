import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	styles: {
		initialColorMode: "system",
		useSystemColorMode: true,
		global: () => ({
			body: {
				bg: "rgba(0,0,0,0)",
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
		},
	},
});

export default theme;
