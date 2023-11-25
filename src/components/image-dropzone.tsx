import { AddIcon } from "@chakra-ui/icons";
import Dropzone from "react-dropzone";
import { Flex, Text } from "@chakra-ui/react";

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
			setImageData(reader.result as string);
		};
	};

	return (
		<Dropzone onDrop={handleOnDrop}>
			{({ getRootProps, getInputProps }) => (
				<div {...getRootProps()}>
					<Flex
						position="fixed"
						justify="center"
						top="50%"
						width="100%"
						transform="translateY(-50%)"
						zIndex={999}
					>
						<Flex
							direction="column"
							align="center"
							gap={2}
							p={4}
							maxWidth={256}
							borderRadius={8}
							borderStyle="dashed"
							borderWidth={2}
							borderColor="#000"
						>
							<input {...getInputProps()} />
							<AddIcon width={8} height={8} />
							<Text fontWeight="bold" textAlign="center">
								drop files here, or click to select files.
							</Text>
						</Flex>
					</Flex>
				</div>
			)}
		</Dropzone>
	);
};
