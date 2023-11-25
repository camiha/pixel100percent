import { Flex, Text, Button, Slider } from "@radix-ui/themes";

function App() {
	return (
		<div>
			<h1>React App</h1>
			<Flex direction="column" gap="2">
				<Text>Hello from Radix Themes :)</Text>
				<Button>Let's go</Button>
				<Slider defaultValue={[50]} />
			</Flex>
		</div>
	);
}

export default App;
