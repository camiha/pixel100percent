import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/700.css";

const theme = extendTheme({
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				margin: 0,
				padding: 0,
				bg: "rgba(0,0,0,0)",
				WebkitUserDrag: "none",
			},
			"::-webkit-scrollbar": {
				display: "none",
			},
			img: {
				WebkitUserDrag: "none",
			},
		}),
	},
	fonts: {
		heading: `'Noto Sans', sans-serif`,
		body: `'Noto Sans', sans-serif`,
	},
	components: {
		Button: {
			variants: {
				solid: {
					bgColor: "white",
					color: "black",
					fontWeight: 400,
				},
				outline: {
					border: "1px solid",
					borderColor: "gray.200",
					bgColor: "white",
					color: "black",
					fontWeight: 400,
				},
			},
			defaultProps: {
				variant: "solid",
			},
		},
	},
});

export default theme;
