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
import { SubmitHandler, useForm } from "react-hook-form";
import { SlFrame } from "react-icons/sl";

import { NumberInput, NumberInputField } from "@chakra-ui/react";

type Inputs = {
	height: number;
	width: number;
};

export const ControlWindowsizeButton = () => {
	const { isOpen, onToggle, onClose } = useDisclosure();
	const { register, handleSubmit } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		window.resizeTo(data.width, data.height);
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
					<form onSubmit={handleSubmit(onSubmit)}>
						<Flex gap={2} flexDirection="column">
							<Flex gap={2}>
								<FormControl>
									<FormLabel size="xs">width</FormLabel>
									<NumberInput size="xs" defaultValue={750} min={300}>
										<NumberInputField
											{...register("width", { required: true })}
											borderRadius={4}
										/>
									</NumberInput>
								</FormControl>
								<FormControl>
									<FormLabel size="xs">height</FormLabel>
									<NumberInput size="xs" defaultValue={600} min={300}>
										<NumberInputField
											{...register("height", { required: true })}
											borderRadius={4}
										/>
									</NumberInput>
								</FormControl>
							</Flex>
							<Button type="submit" size="sm" variant="outline">
								Update
							</Button>
						</Flex>
					</form>
				</PopoverBody>
				<PopoverCloseButton />
			</PopoverContent>
		</Popover>
	);
};
