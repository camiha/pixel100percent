import { Button, Flex, FormControl, FormLabel, Icon } from "@chakra-ui/react";
import {
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	useDisclosure,
} from "@chakra-ui/react";
import { SlFrame } from "react-icons/sl";

import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { useState } from "react";

export const ControlWindowsizeButton = () => {
	const [windowSize, setWindowSize] = useState({ width: 750, height: 600 });
	const { isOpen, onToggle, onClose } = useDisclosure();

	const handleUpdate = () => {
		window.resizeTo(windowSize.width, windowSize.height);
		onClose();
	};

	return (
		<Popover placement="right" isOpen={isOpen} onClose={onClose}>
			<PopoverTrigger>
				<Button onClick={onToggle}>
					<Icon as={SlFrame} />
				</Button>
			</PopoverTrigger>
			<PopoverContent maxWidth={200}>
				<PopoverArrow />
				<PopoverBody>
					<Flex gap={2} flexDirection="column">
						<Flex gap={2}>
							<FormControl>
								<FormLabel size="xs">width</FormLabel>
								<NumberInput
									size="xs"
									defaultValue={750}
									min={300}
									onChange={(value) => {
										setWindowSize({
											...windowSize,
											width: parseInt(value, 10),
										});
									}}
								>
									<NumberInputField />
								</NumberInput>
							</FormControl>
							<FormControl>
								<FormLabel size="xs">height</FormLabel>
								<NumberInput
									size="xs"
									defaultValue={600}
									min={300}
									onChange={(value) => {
										setWindowSize({
											...windowSize,
											height: parseInt(value, 10),
										});
									}}
								>
									<NumberInputField />
								</NumberInput>
							</FormControl>
						</Flex>
						<Button size="sm" onClick={handleUpdate}>
							Update
						</Button>
					</Flex>
				</PopoverBody>
				<PopoverCloseButton />
			</PopoverContent>
		</Popover>
	);
};
