import { useState } from "react";
import { SlTrash } from "react-icons/sl";

import { Box, Button, Flex, Heading, Icon } from "@chakra-ui/react";

import {
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from "@chakra-ui/react";

import { ImageDropzone } from "./components/image-dropzone";

function App() {
	const [imageData, setImageData] = useState("");
	const [imageOpacity, setImageOpacity] = useState(1);
	const [isMouseOver, setIsMouseOver] = useState(false);

	const handleOnValueChange = (value: number) => {
		setImageOpacity(value / 100);
	};

	const handleClearImage = () => {
		setImageData("");
		setImageOpacity(1);
	};

	const handleMouseOver = () => {
		setIsMouseOver(true);
	};

	const handleMouseLeave = () => {
		setIsMouseOver(false);
	};

	return (
		<Box
			onMouseLeave={handleMouseLeave}
			onMouseOver={handleMouseOver}
			position="relative"
			backgroundColor={imageData === "" ? "white" : "transparent"}
			minHeight="100vh"
			width="100vw"
		>
			<Flex
				backgroundColor="white"
				color="black"
				gap={1}
				justify="space-between"
				opacity={imageData === "" ? 1 : isMouseOver ? 1 : 0}
				p={3}
				position="fixed"
				sx={{
					"-webkit-app-region": "drag",
				}}
				top={0}
				transition="opacity 0.2s ease-in-out"
				width="100%"
				zIndex={9999}
			>
				<Heading as="h1" size="xs">
					pixelcomplete
				</Heading>
				<Heading as="p" fontWeight={500} size="xs">
					⌘ + Q for quit App
				</Heading>
			</Flex>

			{!imageData && <ImageDropzone setImageData={setImageData} />}

			<Flex opacity={imageOpacity}>
				{imageData && (
					<img
						alt=""
						src={imageData}
						style={{
							position: "relative",
							zIndex: 99,
							width: "100%",
							height: "100%",
							backgroundImage: `url('${imageData}')`,
						}}
					/>
				)}
			</Flex>

			{imageData && (
				<Flex
					bottom={4}
					opacity={isMouseOver ? 1 : 0}
					position="fixed"
					transition="opacity 0.2s ease-in-out"
					width="full"
					zIndex={9999}
				>
					<Flex
						bg="white"
						borderRadius={4}
						marginX="auto"
						maxWidth={128}
						px={2}
						py={1}
						width="full"
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
					<Flex position="absolute" right={4} bottom={0}>
						<Button colorScheme="blue" size="sm" onClick={handleClearImage}>
							<Icon as={SlTrash} />
						</Button>
					</Flex>
				</Flex>
			)}
		</Box>
	);
}

export default App;
