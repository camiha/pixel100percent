import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { Store } from "tauri-plugin-store-api";

export const useStoredImage = () => {
  const [_imageCollection, _setImageCollection] = useState<
    { file_path: string }[]
  >([]);
  const store = new Store(".settings.dat");

  const imageCollection = _imageCollection
    .map((image) => {
      return {
        ...image,
        file_name: image.file_path.split("/").pop() ?? "",
      };
    })
    .sort((a, b) => {
      return a.file_name.localeCompare(b.file_name);
    });

  useEffect(() => {
    (async () => {
      const imageCollection = await store.get<{ file_path: string }[]>(
        "image-collection"
      );
      if (imageCollection) {
        _setImageCollection(imageCollection);
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
        console.log(files);

        const imageCollection = (await store.get<{ file_path: string }[]>(
          "image-collection"
        )) ?? [];

        // if (imageCollection) {
        // TODO: 重複している場合は追加しない
        if (
          imageCollection.some((image) =>
            files.some((file) => file.file_path === image.file_path)
          )
        ) {
          return;
        }

        await store.set("image-collection", [...imageCollection, ...files]);
        _setImageCollection(imageCollection);
        await store.save();
        // }
      })();
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, [store]);

  const handleRemoveImage = async (file_path: string) => {
    const imageCollection = await store.get<{ file_path: string }[]>(
      "image-collection"
    );

    if (imageCollection) {
      const newImageCollection = imageCollection.filter(
        (image) => image.file_path !== file_path
      );
      await store.set("image-collection", newImageCollection);
      _setImageCollection(newImageCollection);
      await store.save();
    }
  };

  return {
    imageCollection,
    handleRemoveImage,
  };
};
