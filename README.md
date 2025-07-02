# Vendora Vendor App

A modern vendor management app built with React Native, Expo, and Magnus UI.

## Features

- Vendor registration and authentication
- Product management (add, update, delete, view)
- Order management and details
- Multi-language support (i18n)
- Image picker for products and vendor profile
- Custom UI components with Magnus UI
- Responsive and modern design
- Toast notifications for user feedback

## Tech Stack

- React Native (Expo)
- TypeScript
- Magnus UI
- Formik & Yup (forms and validation)
- Axios (API requests)
- i18next (internationalization)
- Toastify React Native (notifications)

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/vendora-vendor.git
   cd vendora-vendor
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the Expo development server:
   ```sh
   npm start
   ```

4. Scan the QR code with Expo Go or run on an emulator.

### Environment Variables

Update `app/config/api.js` with your API base URL and token.

## Project Structure

```
app/
  components/         # Reusable UI components
  config/             # App configuration (API, colors)
  context/            # React Context providers
  custom/             # Custom UI elements
  items/              # List and item components
  screens/            # App screens (Auth, Home, Products, Orders, etc.)
  translation/        # i18n setup and translation files
  utils/              # Utility functions (image upload, etc.)
assets/               # Images and static assets
```

## Scripts

- `npm start` - Start Expo dev server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

## License

MIT

---

> Built with ❤️ for Vendora vendors.
