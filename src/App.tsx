import { DeleteIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { open } from "@tauri-apps/api/shell";
import { DiGithubBadge } from "react-icons/di";
import { ImageDropzone } from "./components/image-dropzone";
import { SliderOpacity } from "./components/slider-opacity";
import { useChakraColorMode } from "./hooks/use-chakra-color-mode";
import { useImageDropzone } from "./hooks/use-image-dropzone";
import { useMouseOver } from "./hooks/use-mouse-over";
import { useMoveWindow } from "./hooks/use-move-window";
import { useOpacitySlider } from "./hooks/use-slider-opacity";

function App() {
	const { toggleColorMode, isLight, isDark } = useChakraColorMode();
	const { isMouseOver, handleMouseOver, handleMouseLeave } = useMouseOver();

	// todo: refactor this
	const { isLoading, imageData, handleOnDrop, setImageData } =
		useImageDropzone();
	const { imageOpacity, handleOnValueChange, setImageOpacity } =
		useOpacitySlider();
	const handleClearImage = () => {
		setImageData("");
		setImageOpacity(1);
	};

	useMoveWindow();

	return (
		<Flex
			onMouseLeave={handleMouseLeave}
			onMouseOver={handleMouseOver}
			position="relative"
			minWidth="100vw"
			minHeight="100vh"
			bg={imageData ? "rgba(0,0,0,0)" : isLight ? "white" : "gray.900"}
			data-tauri-drag-region
		>
			{!imageData && (
				<ImageDropzone isLoading={isLoading} handleOnDrop={handleOnDrop} />
			)}

			{!imageData && (
				<Flex position="fixed" top={2} right={2}>
					{isLight && <SunIcon boxSize={3} onClick={toggleColorMode} />}
					{isDark && <MoonIcon boxSize={3} onClick={toggleColorMode} />}
				</Flex>
			)}

			{!imageData && (
				<Flex bottom={4} left={4} position="fixed" width="full" zIndex={9999}>
					<Button
						gap={1}
						onClick={() => open("https://github.com/camiha/pixelcomplete")}
					>
						<Icon w={8} h={8} as={DiGithubBadge} ml={-1} />
						<Text>visit repo</Text>
					</Button>
				</Flex>
			)}

			{imageData && (
				<Box opacity={imageOpacity}>
					<img
						data-tauri-drag-region
						alt=""
						src={imageData}
						style={{
							position: "relative",
							zIndex: 99,
							width: "100vw",
							height: "100%",
							backgroundImage: `url('${imageData}')`,
						}}
					/>
				</Box>
			)}

			{imageData && (
				<>
					<Flex
						position="fixed"
						left={4}
						bottom={4}
						gap={2}
						direction="column"
						zIndex={999}
						opacity={isMouseOver ? 1 : 0}
						transition="opacity 0.2s ease-in-out"
					>
						<IconButton
							bg={isLight ? "white" : "gray.900"}
							aria-label="Clear Image"
							onClick={handleClearImage}
							icon={<DeleteIcon />}
						/>
					</Flex>
					<Flex
						position="fixed"
						width="full"
						maxWidth={128}
						bottom={4}
						left="50%"
						transform="translateX(-50%)"
						gap={2}
						zIndex={999}
						opacity={isMouseOver ? 1 : 0}
						transition="opacity 0.2s ease-in-out"
					>
						<SliderOpacity
							isMouseOver={isMouseOver}
							handleOnValueChange={handleOnValueChange}
						/>
					</Flex>
				</>
			)}
		</Flex>
	);
}

export default App;
