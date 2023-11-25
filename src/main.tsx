import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

// import "@fontsource/titillium-web/400.css";
import "./theme-config.css";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
);
