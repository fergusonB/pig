deno compile --unstable --lite --output build/pig_linux --target x86_64-unknown-linux-gnu main.ts
deno compile --unstable --lite --output build/pig_windows.exe --target x86_64-pc-windows-msvc main.ts
deno compile --unstable --lite --output build/pig_mac --target x86_64-apple-darwin main.ts
deno compile --unstable --lite --output build/pig_m1_mac --target aarch64-apple-darwin main.ts