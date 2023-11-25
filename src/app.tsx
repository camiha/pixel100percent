import { useState, useEffect } from "react";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
} from "@chakra-ui/react";

import { ImageDropzone } from "./components/image-dropzone";

import { debugBaseImage } from "./image";

function App() {
	const [imageData, setImageData] = useState(debugBaseImage);
	const [imageOpacity, setImageOpacity] = useState(1);

	const handleOnValueChange = (value: number) => {
		setImageOpacity(value / 100);
		document.documentElement.style.setProperty(
			"--chakra-colors-chakra-body-bg",
			`rgba(255, 255, 255, ${value / 100})`,
		);
	};

	const handleClearImage = () => {
		setImageData("");
	};

	return (
		<Box>
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
				backgroundColor="white"
			>
				<Heading as="h1" size="xs">
					pixel100percent
				</Heading>
				<Heading as="p" size="xs">
					⌘ + q for quit App
				</Heading>
			</Flex>
			{/* )} */}
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

			<Flex position="fixed" width="full" bottom={0} zIndex={9999}>
				<Flex
					direction="column"
					justify="center"
					gap="4"
					style={{
						maxWidth: 256,
						width: "100%",
						margin: "0 auto",
						height: 64,
					}}
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
			</Flex>
			<Flex position="fixed" bottom={4} zIndex={9999} right={4}>
				<Button size="sm" onClick={handleClearImage}>
					Clear
				</Button>
			</Flex>
		</Box>
	);
}

export default App;
