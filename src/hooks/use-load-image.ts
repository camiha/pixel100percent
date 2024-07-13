import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { Store } from "tauri-plugin-store-api";

type ImageCollection = {
	file_path: string;
	file_name: string;
	created_at: string;
	modified_at: string;
};

export const useStoredImage = () => {
	const [imageCollection, setImageCollection] = useState<ImageCollection[]>([]);
	const store = new Store(".settings.dat");

	useEffect(() => {
		(async () => {
			const imageCollection =
				await store.get<ImageCollection[]>("image-collection");
			if (imageCollection) {
				setImageCollection(imageCollection);
			}
		})();
	}, [store]);

	useEffect(() => {
		const unlisten = listen("tauri://file-drop", (event) => {
			(async () => {
				const files = (event.payload as string[]).map((file) => {
					return {
						file_path: file,
					};
				});

				const imageCollection =
					(await store.get<ImageCollection[]>("image-collection")) ?? [];

				// if (imageCollection) {
				// TODO: 重複している場合は追加しない
				if (
					imageCollection.some((image) =>
						files.some((file) => file.file_path === image.file_path),
					)
				) {
					return;
				}

				const filesWithInfo = files.map((file) => {
					return {
						...file,
						file_name: file.file_path.split("/").pop() ?? "",
						created_at: new Date().toISOString(),
						modified_at: new Date().toISOString(),
					};
				});

				await store.set("image-collection", [
					...imageCollection,
					...filesWithInfo,
				]);
				setImageCollection([...imageCollection, ...filesWithInfo]);
				await store.save();
				// }
			})();
		});

		return () => {
			unlisten.then((fn) => fn());
		};
	}, [store]);

	const handleRemoveImage = async (file_path: string) => {
		const imageCollection =
			await store.get<ImageCollection[]>("image-collection");

		if (imageCollection) {
			const newImageCollection = imageCollection.filter(
				(image) => image.file_path !== file_path,
			);
			await store.set("image-collection", newImageCollection);
			setImageCollection(newImageCollection);
			await store.save();
		}
	};

	// const handleSortDesc = () => {
	// 	const sortedImageCollection = imageCollection.sort((a, b) => {
	// 		return (
	// 			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	// 		);
	// 	});
	// 	setImageCollection([...sortedImageCollection]);
	// };

	// const handleSortAsc = () => {
	// 	const sortedImageCollection = imageCollection.sort((a, b) => {
	// 		return (
	// 			new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
	// 		);
	// 	});
	// 	setImageCollection([...sortedImageCollection]);
	// };

	return {
		imageCollection,
		handleRemoveImage,
	};
};
