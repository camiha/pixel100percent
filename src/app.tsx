import { Flex, Heading, Text, Button, Slider, Box } from "@radix-ui/themes";
import { useState } from "react";

function App() {
	const [windowOpacity, setWindowOpacity] = useState([100]);

	const handleOnValueCommit = (value: number[]) => {
		setWindowOpacity(value);
		document.documentElement.style.setProperty(
			"--color-page-background",
			`rgba(255, 255, 255, ${value[0] / 100})`,
		);
	};

	return (
		<Flex direction="column" gap="4">
			<Heading>React App</Heading>
			<Flex direction="column" gap="2">
				<Text>Hello from Radix Themes :)</Text>
				<Button>Let's go</Button>
				<Box p="2">
					<Slider
						defaultValue={windowOpacity}
						onValueCommit={handleOnValueCommit}
					/>
				</Box>
			</Flex>
		</Flex>
	);
}

export default App;
