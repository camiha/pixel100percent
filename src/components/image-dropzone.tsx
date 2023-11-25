import { SlPicture } from "react-icons/sl";
import Dropzone from "react-dropzone";
import { Flex, Text, Icon } from "@chakra-ui/react";

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
					position="fixed"
					justify="center"
					top="50%"
					width="100%"
					transform="translateY(-50%)"
					zIndex={999}
					px={12}
					{...getRootProps()}
				>
					<Flex
						direction="column"
						align="center"
						gap={2}
						px={8}
						py={12}
						width="full"
						borderRadius={8}
						borderStyle="dashed"
						borderWidth={2}
						borderColor="#000"
					>
						<input {...getInputProps()} />
						<Icon as={SlPicture} width={8} height={8} />
						<Text fontWeight="bold" textAlign="center">
							drop files here, or click to select files.
						</Text>
					</Flex>
				</Flex>
			)}
		</Dropzone>
	);
};
