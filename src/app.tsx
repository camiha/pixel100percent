import { Flex, Text, Button } from '@radix-ui/themes';

function App() {
    return (
        <div>
            <h1>React App</h1>
            <Flex direction="column" gap="2">
                <Text>Hello from Radix Themes :)</Text>
                <Button>Let's go</Button>
            </Flex>
        </div>
    )
}

export default App;