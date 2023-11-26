import { Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { SlPicture } from "react-icons/sl";

export const ImageDropzone = ({
	isLoading,
	handleOnDrop,
}: {
	isLoading: boolean;
	handleOnDrop: (files: File[]) => void;
}) => {
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
				<Flex
					justify="center"
					position="fixed"
					px={12}
					top="50%"
					transform="translateY(-50%)"
					width="100%"
					zIndex={999}
				>
					<Dropzone onDrop={handleOnDrop}>
						{({ getRootProps, getInputProps }) => (
							<Flex
								align="center"
								borderRadius={8}
								borderStyle="dashed"
								borderWidth={2}
								direction="column"
								gap={2}
								px={8}
								py={12}
								width="full"
								{...getRootProps()}
							>
								<input {...getInputProps()} />
								<Icon height={8} as={SlPicture} width={8} />
								<Text fontWeight="bold" textAlign="center">
									drop image here, or click to select image.
								</Text>
							</Flex>
						)}
					</Dropzone>
				</Flex>
			)}
		</>
	);
};
