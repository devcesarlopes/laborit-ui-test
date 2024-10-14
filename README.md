# PickupApp Installation Guide

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm).
- You have Xcode installed on your macOS for iOS development.

## Installation Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/PickupApp.git
   cd PickupApp
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Install CocoaPods dependencies:**
   ```sh
   npx pod-install
   ```

4. **Run the iOS application:**
   ```sh
   npm run ios
   ```

## FTP-Simple Extension Installation Instructions

To manage your Square webhook via FTP, you can use the FTP-Simple extension in Visual Studio Code. Follow these steps to install and configure it:

1. **Install FTP-Simple Extension:**
   - Open Visual Studio Code.
   - Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
   - Search for `ftp-simple` and click `Install`.

2. **Configure FTP-Simple:**
   - Open the Command Palette by pressing `Ctrl+Shift+P`.
   - Type `FTP-Simple: Config - FTP connection settings` and select it.
   - Add your FTP connection details in the `ftp-simple.json` file that opens.

3. **Manage Square Webhook:**
   - Use the FTP-Simple extension to connect to your server.
   - Navigate to the directory where your `main.pb.js` file is located.
   - Upload or manage your `main.pb.js` file as needed.

## Additional Notes

- Ensure your FTP server is running and accessible.
- For more information on configuring and using FTP-Simple, refer to the [FTP-Simple documentation](https://marketplace.visualstudio.com/items?itemName=humy2833.ftp-simple).

By following these steps, you should be able to set up and run the PickupApp, as well as manage your Square webhook via FTP.

If you encounter any issues, please refer to the documentation or open an issue on the repository.

Happy coding!
