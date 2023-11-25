import { useState } from "react";
import { SlTrash } from "react-icons/sl";

import { Box, Button, Flex, Heading, Icon } from "@chakra-ui/react";

import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
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
		document.documentElement.style.setProperty(
			"--chakra-colors-chakra-body-bg",
			"#fff",
		);
	};

	const handleMouseOver = () => {
		setIsMouseOver(true);
	};

	const handleMouseLeave = () => {
		setIsMouseOver(false);
	};

	return (
		<Box
			position="relative"
			onMouseOver={handleMouseOver}
			onMouseLeave={handleMouseLeave}
		>
			<Flex
				position="fixed"
				justify="space-between"
				gap={1}
				p={3}
				top={0}
				width="100%"
				zIndex={9999}
				sx={{
					"-webkit-app-region": "drag",
				}}
				color="black"
				backgroundColor={isMouseOver ? "white" : "transparent"}
				transition="background-color 0.2s ease-in-out"
			>
				<Heading as="h1" size="xs">
					pixel100percent
				</Heading>
				<Heading as="p" size="xs" fontWeight={500}>
					⌘ + Q for quit App
				</Heading>
			</Flex>

			{!imageData && <ImageDropzone setImageData={setImageData} />}

			<Flex opacity={imageOpacity}>
				{imageData && (
					<img
						src={imageData}
						alt="uploaded"
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
					position="fixed"
					width="full"
					bottom={4}
					zIndex={9999}
					transition="opacity 0.2s ease-in-out"
					opacity={isMouseOver ? 1 : 0}
				>
					<Flex
						width="full"
						marginX="auto"
						maxWidth={128}
						py={1}
						px={2}
						borderRadius={4}
						bg="white"
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
