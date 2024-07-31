![example workflow]

# MopIt
MopIt Mobile Application [Flutter]



## Installation:
To run the app successfully, follow these installation steps:

### 1. Clone the Repository:

```bash
//
```

### 2. Open in IDE:
Extract and open the ZIP file in your preferred Integrated Development Environment (IDE). The following instructions provide details for setting up the project in different IDEs:

#### Android Studio:
- Open Android Studio/VSCode.
- Choose "Open an existing Android Studio project."
- Navigate to the app folder inside the cloned repository.
- Follow the setup instructions, ensuring that your Flutter SDK is properly configured.
- Make sure your device/emulator is running from AVD Manager.
- Select `main.dart` in the dropdown next to the green Play button.
- Press the green Play button or run the app from the terminal.

#### Visual Studio Code (VSCode):
- Open VSCode.
- Navigate to the app folder inside the cloned repository.
- Ensure that the Flutter and Dart extensions are installed.
- Open `main.dart` and run the app using the play button or from the terminal.

### 3. Run the App:

#### Command Line:

Navigate to the repository location in the terminal and run the following commands:

```bash
cd <-THIS REPO LOCATION->
flutter clean
flutter pub get # To fetch dependencies
	@@ -36,18 +47,26 @@ flutter run --no-sound-null-safety # To run the app (use this for null safety)
flutter run # To run the app (after building the APK)
# TO BUILD THE APK:
flutter build apk
```

## Note:
Ensure that your device or emulator is running before executing the commands.

### Additional Configuration:
You can add the following as additional run arguments in Android Studio/IDE for smoother execution:
- `--no-sound-null-safety`: Use this for null safety when running the app.

#### More
A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.




## Copyright - Mopit
