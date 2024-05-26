import { HamburgerIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Icon,
	IconButton,
	NumberInput,
	NumberInputField,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	useDisclosure,
} from "@chakra-ui/react";
import { LogicalSize, appWindow } from "@tauri-apps/api/window";
import { SubmitHandler, useForm } from "react-hook-form";
import { useChakraColorMode } from "../hooks/use-chakra-color-mode";

type Inputs = {
	height: number;
	width: number;
};

export const PopoverWindowSizeButton = () => {
	const { isOpen, onToggle, onClose } = useDisclosure();
	const { register, handleSubmit } = useForm<Inputs>();
	const { isLight } = useChakraColorMode();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		onClose();
		await appWindow.setSize(
			new LogicalSize(Number(data.width), Number(data.height)),
		);
	};

	return (
		<Popover placement="right" isOpen={isOpen} onClose={onClose}>
			<PopoverTrigger>
				<IconButton
					bg={isLight ? "white" : "gray.900"}
					onClick={onToggle}
					aria-label="Open change window size menu"
					icon={<Icon as={HamburgerIcon} />}
				/>
			</PopoverTrigger>
			<PopoverContent maxWidth={200}>
				<PopoverArrow />
				<PopoverBody bg={isLight ? "white" : "gray.900"}>
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
