import { Flex, Icon, Text } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { SlPicture } from "react-icons/sl";

export const ImageDropzone = ({
	setImageData,
}: {
	setImageData: (imageData: string) => void;
}) => {
	const handleOnDrop = <T extends File,>(acceptedFiles: T[]) => {
		const acceptedFile = acceptedFiles[0];
		if (!acceptedFile.type.includes("image/")) return;
		const reader = new FileReader();
		reader.readAsDataURL(acceptedFile);
		reader.onload = () => {
			document.documentElement.style.setProperty(
				"--chakra-colors-chakra-body-bg",
				"transparent",
			);
			if (typeof reader.result !== "string") return;
			setImageData(reader.result);
		};
	};

	return (
		<Dropzone onDrop={handleOnDrop}>
			{({ getRootProps, getInputProps }) => (
				<Flex
					{...getRootProps()}
					justify="center"
					position="fixed"
					px={12}
					top="50%"
					transform="translateY(-50%)"
					width="100%"
					zIndex={999}
				>
					<Flex
						align="center"
						borderColor="#000"
						borderRadius={8}
						borderStyle="dashed"
						borderWidth={2}
						direction="column"
						gap={2}
						px={8}
						py={12}
						width="full"
					>
						<input {...getInputProps()} />
						<Icon height={8} as={SlPicture} width={8} />
						<Text fontWeight="bold" textAlign="center">
							drop image here, or click to select image.
						</Text>
					</Flex>
				</Flex>
			)}
		</Dropzone>
	);
};
