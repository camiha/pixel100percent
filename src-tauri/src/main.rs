// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn create_window(app: tauri::AppHandle, file_path: String) {
    let url = format!("/overlay?file_path={}", file_path);
    // TODO: 引数を元にウインドウ生成
    let _window = tauri::WindowBuilder::new(&app, "label", tauri::WindowUrl::App(url.into()))
        .transparent(true)
        .always_on_top(true)
        .decorations(false)
        .build()
        .unwrap();
}

#[derive(serde::Deserialize, serde::Serialize)]
struct ImageInfo {
    file_path: String,
}

#[derive(serde::Deserialize, serde::Serialize)]
struct ImageStore {
    image_collection: Vec<ImageInfo>,
}

// #[tauri::command]
// fn load_image_store(
//     stores: State<'_, StoreCollection<Wry>>,
//     app_handle: tauri::AppHandle,
// ) -> Result<ImageStore, String> {
//     let path = PathBuf::from(STORE_PATH);

//     with_store(app_handle.clone(), store.clone(), path.clone(), |store| {
//         store.get("image_store".into())
//     }).unwrap()

// }

// #[tauri::command]
// fn save_image_store(
//     stores: State<'_, StoreCollection<Wry>>,
//     app_handle: tauri::AppHandle,
//     image_store: ImageStore,
// ) -> Result<(), tauri_plugin_store::Error> {
//     let path = PathBuf::from(STORE_PATH);

//     with_store(app_handle.clone(), stores.clone(), path.clone(), |store| {
//         store.insert("image_store".into(), json!(image_store))
//     }).unwrap();

//     Ok(())
// }

fn main() {
    // let menu = Menu::new().add_native_item(MenuItem::Quit);
    let context = tauri::generate_context!();
    // let menu = tauri::Menu::os_default(&context.package_info().name).add_native_item(MenuItem::Quit);

    tauri::Builder::default()
        // .menu(menu)
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            greet,
            create_window,
            // load_image_store,
            // save_image_store
        ])
        .run(context)
        .expect("error while running tauri application");
}
