import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

import "@radix-ui/themes/styles.css";
import "./theme-config.css";

import { ChakraProvider } from "@chakra-ui/react";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
);
