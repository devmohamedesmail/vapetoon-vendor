#!/bin/bash

echo "🚀 Vendora Vendor - Build Script"
echo "================================"

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g @expo/eas-cli
fi

# Check if user is logged in
echo "🔐 Checking EAS authentication..."
if ! eas whoami &> /dev/null; then
    echo "❌ Not logged in to EAS. Please log in:"
    eas login
fi

echo ""
echo "Select build type:"
echo "1) APK (for testing)"
echo "2) AAB (for Google Play Store)"
echo "3) Both platforms (Android + iOS)"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "🔨 Building APK for testing..."
        eas build --platform android --profile preview
        ;;
    2)
        echo "🔨 Building AAB for Google Play Store..."
        eas build --platform android --profile production-aab
        ;;
    3)
        echo "🔨 Building for all platforms..."
        eas build --platform all --profile production
        ;;
    *)
        echo "❌ Invalid choice. Exiting..."
        exit 1
        ;;
esac

echo ""
echo "✅ Build started successfully!"
echo "📱 You can monitor the build progress at: https://expo.dev/builds"
echo ""
echo "📋 Next steps:"
echo "1. Wait for build to complete"
echo "2. Download the build file"
echo "3. Test on device (for APK) or upload to Google Play (for AAB)"
echo ""
echo "🎉 Happy deploying!"
