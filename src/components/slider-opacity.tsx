import {
	Flex,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from "@chakra-ui/react";

export const SliderOpacity = ({
	isMouseOver,
	handleOnValueChange,
}: {
	isMouseOver: boolean;
	handleOnValueChange: (value: number) => void;
}) => {
	return (
		<Flex
			bg="white"
			borderRadius={4}
			marginX="auto"
			maxWidth={128}
			px={2}
			py={1}
			width="full"
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
