import {
	Flex,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from "@chakra-ui/react";
import { useChakraColorMode } from "../hooks/use-chakra-color-mode";

export const SliderOpacity = ({
	isMouseOver,
	handleOnValueChange,
}: {
	isMouseOver: boolean;
	handleOnValueChange: (value: number) => void;
}) => {
	const { isLight } = useChakraColorMode();

	return (
		<Flex
			bg={isLight ? "white" : "gray.900"}
			borderRadius={4}
			maxWidth={128}
			px={4}
			py={1}
			width="full"
			height="auto"
			opacity={isMouseOver ? 1 : 0}
			transition="opacity 0.2s ease-in-out"
		>
			<Slider
				aria-label="slider-ex-1"
				defaultValue={100}
				min={10}
				onChange={handleOnValueChange}
			>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
		</Flex>
	);
};
