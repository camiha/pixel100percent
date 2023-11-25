import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

import "@radix-ui/themes/styles.css";
import "./theme-config.css";

import { Theme } from "@radix-ui/themes";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<Theme>
			<App />
		</Theme>
	</React.StrictMode>,
);
