import { Flex, Heading } from "@chakra-ui/react";
import { useMoveWindow } from "./hooks/use-move-window";

function App() {
	useMoveWindow();

	return (
		<Flex
			data-tauri-drag-region
			justifyContent="center"
			alignItems="center"
			width="100vw"
			height="100vh"
		>
			<Heading>hello</Heading>
		</Flex>
	);
}

export default App;
