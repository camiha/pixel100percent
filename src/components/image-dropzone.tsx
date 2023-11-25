import { Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { SlPicture } from "react-icons/sl";

export const ImageDropzone = ({
	setImageData,
}: {
	setImageData: (imageData: string) => void;
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleOnDrop = <T extends File,>(acceptedFiles: T[]) => {
		setIsLoading(true);

		const acceptedFile = acceptedFiles[0];
		if (!acceptedFile.type.includes("image/")) {
			setIsLoading(false);
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(acceptedFile);
		reader.onload = () => {
			if (typeof reader.result !== "string") {
				setIsLoading(false);
				return;
			}
			setImageData(reader.result);
			setIsLoading(false);
		};
	};

	return (
		<>
			{isLoading ? (
				<Flex
					justify="center"
					position="fixed"
					px={12}
					top="50%"
					transform="translateY(-50%)"
					width="100%"
					zIndex={999}
				>
					<Spinner size="lg" />
				</Flex>
			) : (
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
								borderColor="black"
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
			)}
		</>
	);
};
