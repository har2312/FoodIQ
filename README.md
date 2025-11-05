# 🍽️ FoodIQ – Smart Food Recommendation App

**FoodIQ** is an intelligent food discovery mobile app built with **React Native** (no Expo). Users can search for restaurants by food type or location and get detailed information including ratings, price ranges, cuisines, and more using the **Yelp Fusion API**.

---

## 📱 Features

- 🔍 **Smart Search**: Search by food type (e.g., "pizza", "Chinese") or location
- ⭐ **Restaurant Details**: View ratings, reviews, price range, and cuisines
- 📍 **Location Info**: See full address and distance
- 📞 **Contact**: Call restaurants directly from the app
- 🚚 **Services**: Check if delivery, pickup, or reservations are available
- 🎨 **Modern UI**: Clean, minimal, and mobile-friendly design
- 🤖 **AI Ready**: Placeholder for future AI-powered recommendations

---

## 🏗️ Project Structure

```
FoodIQ/
├── src/
│   ├── api/
│   │   ├── yelpAPI.js          # Yelp Fusion API integration
│   │   └── AIService.js        # Placeholder for AI features
│   ├── components/
│   │   ├── SearchBar.js        # Reusable search component
│   │   └── RestaurantCard.js   # Restaurant card component
│   ├── screens/
│   │   ├── HomeScreen.js       # Search and results screen
│   │   └── DetailsScreen.js    # Restaurant details screen
│   └── utils/                  # Helper functions (if needed)
├── App.js                       # Navigation setup
├── index.js                     # App entry point
├── package.json                 # Dependencies
├── .env                         # API keys (not committed)
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI**: Install globally with `npm install -g react-native-cli`
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Yelp Fusion API Key**: Get it from [Yelp Developers](https://www.yelp.com/developers/v3/manage_app)

---

### Installation Steps

#### 1. Clone or Navigate to the Project

```bash
cd FoodIQ
```

#### 2. Install Dependencies

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

#### 3. Set Up Environment Variables

Open the `.env` file and add your Yelp API key:

```env
YELP_API_KEY=your_actual_yelp_api_key_here
```

> **How to get a Yelp API Key:**
> 1. Go to [Yelp Fusion API](https://www.yelp.com/developers/v3/manage_app)
> 2. Sign up or log in
> 3. Create a new app
> 4. Copy the API Key and paste it in `.env`

#### 4. Install iOS Dependencies (macOS only)

```bash
cd ios
pod install
cd ..
```

---

## 🏃 Running the App

### For Android:

1. Start the Metro bundler:
   ```bash
   npx react-native start
   ```

2. In a new terminal, run:
   ```bash
   npx react-native run-android
   ```

   Or use npm script:
   ```bash
   npm run android
   ```

### For iOS (macOS only):

1. Start the Metro bundler:
   ```bash
   npx react-native start
   ```

2. In a new terminal, run:
   ```bash
   npx react-native run-ios
   ```

   Or use npm script:
   ```bash
   npm run ios
   ```

---

## 📦 Dependencies

### Main Dependencies:
- **react**: ^18.2.0
- **react-native**: ^0.73.0
- **@react-navigation/native**: ^6.1.9
- **@react-navigation/native-stack**: ^6.9.17
- **react-native-safe-area-context**: ^4.8.0
- **react-native-screens**: ^3.29.0
- **axios**: ^1.6.2
- **react-native-dotenv**: ^3.4.9

---

## 🔧 Configuration

### API Configuration

The app uses the **Yelp Fusion API** by default. To switch to Google Places API or add additional APIs:

1. Create a new API file in `src/api/` (e.g., `googlePlacesAPI.js`)
2. Implement the search and details functions
3. Update the imports in `HomeScreen.js` and `DetailsScreen.js`

### Environment Variables

Store all API keys in `.env`:

```env
YELP_API_KEY=your_yelp_api_key
GOOGLE_PLACES_API_KEY=your_google_api_key
```

Access them in code:

```javascript
import {YELP_API_KEY} from '@env';
```

---

## 🎨 UI Customization

### Colors

Main colors are defined in component styles. To change the app's theme:

- **Primary Color**: `#FF6B6B` (red/coral)
- **Success Color**: `#4CAF50` (green)
- **Info Color**: `#2196F3` (blue)

Update these colors in the `styles` objects within each component.

### Fonts

React Native uses system fonts by default. To add custom fonts:

1. Add font files to `assets/fonts/`
2. Link fonts using `react-native-asset` or manually
3. Update font families in styles

---

## 🤖 AI Features (Coming Soon)

The `src/api/AIService.js` file is prepared for future AI integration:

- **Personalized Recommendations**: Based on user history
- **Review Analysis**: AI-generated summaries
- **Smart Filtering**: Dietary restrictions and preferences
- **Rating Predictions**: Predict user ratings for new restaurants

To implement:
1. Integrate Firebase ML Kit or a cloud AI service
2. Implement the placeholder functions in `AIService.js`
3. Update UI to display AI insights

---

## 🐛 Troubleshooting

### Common Issues:

1. **Metro bundler not starting**
   - Clear cache: `npx react-native start --reset-cache`

2. **Build fails**
   - Clean build:
     ```bash
     cd android && ./gradlew clean && cd ..
     ```
   - Or for iOS:
     ```bash
     cd ios && xcodebuild clean && cd ..
     ```

3. **API not working**
   - Check if your `.env` file has the correct API key
   - Ensure `react-native-dotenv` is configured in `babel.config.js`
   - Restart Metro bundler after changing `.env`

4. **Module not found errors**
   - Delete `node_modules` and reinstall:
     ```bash
     rm -rf node_modules
     npm install
     ```

5. **iOS build errors**
   - Re-install pods:
     ```bash
     cd ios
     pod deintegrate
     pod install
     cd ..
     ```

---

## 📝 Development Notes

### Code Style
- Uses **functional components** with **React Hooks**
- **async/await** for API calls
- **Comments** for beginner-friendly code
- **Modern ES6+** syntax

### Best Practices
- Separate API logic from UI components
- Reusable components for cleaner code
- Error handling with try-catch
- Loading states for better UX
- SafeAreaView for notch compatibility

---

## 🚀 Next Steps

After setting up the basic app, consider adding:

1. **User Authentication**: Save favorites and search history
2. **Favorites Feature**: Let users save restaurants
3. **Map View**: Show restaurants on a map
4. **Filters**: Filter by price, rating, distance, etc.
5. **Dark Mode**: Add a dark theme toggle
6. **Push Notifications**: Notify users of deals or new restaurants
7. **AI Integration**: Implement the AI features in `AIService.js`

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

## 📧 Support

For questions or issues, please open an issue in the repository.

---

**Happy Coding! 🎉**

Built with ❤️ using React Native
