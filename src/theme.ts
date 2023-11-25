import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				margin: 0,
				padding: 0,
				bg: "rgba(0,0,0,0)",
				"-webkit-user-drag": "none",
			},
			"::-webkit-scrollbar": {
				display: "none",
			},
			img: {
				"-webkit-user-drag": "none",
			},
		}),
	},
	components: {
		Button: {
			defaultProps: {
				colorScheme: "blue",
			},
		},
	},
});

export default theme;
