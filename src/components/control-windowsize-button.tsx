import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Icon,
	IconButton,
} from "@chakra-ui/react";
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

export const ControlWindowsizeButton = ({
	variant,
}: {
	variant: "outline" | "solid";
}) => {
	const { isOpen, onToggle, onClose } = useDisclosure();
	const { register, handleSubmit } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		onClose();
		window.resizeTo(data.width, data.height);
	};

	return (
		<Popover placement="right" isOpen={isOpen} onClose={onClose}>
			<PopoverTrigger>
				<IconButton
					aria-label="Open change window size menu"
					variant={variant}
					onClick={onToggle}
					icon={<Icon as={SlFrame} />}
				/>
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
