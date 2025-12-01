use tauri::Manager;

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn show_window(window: tauri::Window) {
    window.get_webview_window("main").unwrap().show().unwrap();
}
