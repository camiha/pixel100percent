import { useState } from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";

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

	return (
		<Box>
			<Flex
				direction="column"
				gap="1"
				p="4"
				position="relative"
				height="100%"
				width="100%"
			>
				<Heading as="h1">pixel100percent</Heading>
			</Flex>

			<Flex position="fixed" width="full" bottom={0} zIndex={999}>
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
			<ImageDropzone setImageData={setImageData} />
			{imageData && (
				<Flex>
					<img
						src={imageData}
						alt="uploaded"
						style={{
							width: "100%",
							backgroundImage: `url('${imageData}')`,
							opacity: imageOpacity,
						}}
					/>
				</Flex>
			)}
		</Box>
	);
}

export default App;
