import { useState } from "react";
import { DiGithubBadge } from "react-icons/di";
import { SlCursorMove, SlTrash } from "react-icons/sl";

import { Box, Button, Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";

import { ControlWindowsizeButton } from "./components/control-windowsize-button";
import { ImageDropzone } from "./components/image-dropzone";
import { SliderOpacity } from "./components/slider-opacity";

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

	const handleOnClickLink = () => {
		window.pixelcompleteApi.openGithubRepo();
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
					WebkitAppRegion: "drag",
				}}
				top={0}
				transition="opacity 0.2s ease-in-out"
				width="100%"
				zIndex={9999}
			>
				<Heading as="h1" size="xs">
					pixelcomplete
				</Heading>
				<Heading as="p" fontWeight={400} size="xs">
					CMD + Q for quit App
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

			<Flex bottom={4} position="fixed" width="full" zIndex={9999}>
				{!imageData && (
					<Link onClick={handleOnClickLink}>
						<Flex ml={4} justify="center" align="center" gap={1}>
							<Icon w={8} h={8} as={DiGithubBadge} />
							<Text>visit repo</Text>
						</Flex>
					</Link>
				)}

				{imageData && (
					<>
						<Flex
							position="absolute"
							left={4}
							bottom={0}
							gap={2}
							direction="column"
							opacity={isMouseOver ? 1 : 0}
							transition="opacity 0.2s ease-in-out"
						>
							<Button onClick={handleClearImage}>
								<Icon as={SlTrash} />
							</Button>
						</Flex>
						<SliderOpacity
							isMouseOver={isMouseOver}
							handleOnValueChange={handleOnValueChange}
						/>
					</>
				)}
				<Flex
					position="absolute"
					right={4}
					bottom={0}
					gap={2}
					direction="column"
				>
					<Box
						opacity={imageData ? (isMouseOver ? 1 : 0) : 1}
						transition="opacity 0.2s ease-in-out"
					>
						<ControlWindowsizeButton
							variant={imageData ? "solid" : "outline"}
						/>
					</Box>
					<Button
						opacity={imageData ? (isMouseOver ? 1 : 0.25) : 1}
						transition="opacity 0.2s ease-in-out"
						variant={imageData ? "solid" : "outline"}
						_hover="none"
						sx={{
							cursor: "move",
							WebkitAppRegion: "drag",
						}}
					>
						<Icon as={SlCursorMove} />
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
}

export default App;
