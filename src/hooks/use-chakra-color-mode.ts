import { useColorMode } from "@chakra-ui/react";

export const useChakraColorMode = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isLight = colorMode === "light";
	const isDark = colorMode === "dark";

	return { colorMode, toggleColorMode, isLight, isDark };
};
