<div align="center">
  <h1 align="center">📱 Todo App</h1>
  <p align="center">
    A modern, cross-platform Todo application with real-time sync and beautiful UI
    <br />
    <a href="#-features">View Demo</a>
    ·
    <a href="https://github.com/yourusername/todo-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/yourusername/todo-app/issues">Request Feature</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
    <img src="https://img.shields.io/badge/Convex-3a5bff?style=for-the-badge&logo=convex&logoColor=white" alt="Convex" />
  </p>

  <p align="center">
    <img src="assets/images/fiirstpage.jpg" alt="App Preview" width="200" />
     <img src="assets/images/secondpage.jpg" alt="App Preview" width="200" />
  </p>
</div>

## ✨ Features

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin: 1rem 0;">
  <div>
    <h4>📝 Task Management</h4>
    <ul>
      <li>Create, edit, and delete todos</li>
      <li>Mark tasks as complete/incomplete</li>
      <li>Real-time synchronization</li>
      <li>Offline-first capabilities</li>
    </ul>
  </div>
  <div>
    <h4>🎨 Beautiful UI/UX</h4>
    <ul>
      <li>Dark/Light theme support</li>
      <li>Smooth animations</li>
      <li>Pull-to-refresh</li>
      <li>Progress tracking</li>
    </ul>
  </div>
  <div>
    <h4>🌍 Cross-Platform</h4>
    <ul>
      <li>iOS support</li>
      <li>Android support</li>
      <li>Web support</li>
      <li>Responsive design</li>
    </ul>
  </div>
</div>

## 🚀 Tech Stack

### Frontend

| Technology | Description |
|------------|-------------|
| ![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB) | Mobile app framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) | Type-safe JavaScript |
| ![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white) | Development platform |
| ![React Navigation](https://img.shields.io/badge/React_Navigation-6C3483?style=flat-square&logo=react&logoColor=white) | Navigation library |

### Backend

| Technology | Description |
|------------|-------------|
| ![Convex](https://img.shields.io/badge/Convex-3a5bff?style=flat-square&logo=convex&logoColor=white) | Backend as a Service |
| ![REST API](https://img.shields.io/badge/REST_API-02569B?style=flat-square&logo=rest&logoColor=white) | RESTful API |

### Tools & Libraries

| Category | Technologies |
|----------|--------------|
| **UI Components** | React Native Paper, @expo/vector-icons |
| **State Management** | Convex, React Context |
| **Storage** | @react-native-async-storage/async-storage |
| **Styling** | React Native StyleSheet, Expo Linear Gradient |
| **Linting** | ESLint, Prettier |
| **Build Tools** | Expo CLI, TypeScript |

### Development

| Technology | Description |
|------------|-------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | JavaScript Runtime |
| ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) | Package Manager |
| ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) | Version Control |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app (for mobile testing)
- Convex account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TodoApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up Convex**
   ```bash
   npx convex init
   npx convex dev
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on your device/emulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `w` to open in web browser

## 📱 Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset the project (use with caution)

## 🏗 Project Structure

```
TodoApp/
├── app/                    # Main application code
│   ├── (tabs)/             # Tab-based navigation
│   │   ├── index.tsx       # Main todos screen
│   │   └── Settings.tsx    # App settings
│   ├── _layout.tsx         # Root layout
│   └── (tabs)/_layout.tsx  # Tab layout
├── assets/                 # Static assets
│   ├── fonts/              # Custom fonts
│   ├── images/             # App images
│   └── styles/             # Global styles
├── components/             # Reusable components
│   ├── Todoinput.tsx       # Todo input component
│   ├── Header.tsx          # App header
│   └── ...
├── convex/                 # Backend functions and types
│   ├── todos.ts            # Todo-related database operations
│   └── schema.ts           # Database schema
└── hooks/                  # Custom React hooks
    └── useTheme.tsx        # Theme management
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📬 Contact

Have questions or feedback? Feel free to open an issue or reach out to the maintainers.

---

Built with ❤️ using [Expo](https://expo.dev) and [Convex](https://convex.dev)
