import { Flex, Heading, Text, Button, Slider } from "@radix-ui/themes";

function App() {
	return (
		<Flex direction="column" gap="4">
			<Heading>React App</Heading>
			<Flex direction="column" gap="2">
				<Text>Hello from Radix Themes :)</Text>
				<Button>Let's go</Button>
				<Slider defaultValue={[50]} />
			</Flex>
		</Flex>
	);
}

export default App;
