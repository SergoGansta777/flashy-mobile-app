# Flashy - Mobile Flashcard Learning App

<!--toc:start-->

- [Flashy - Mobile Flashcard Learning App](#flashy-mobile-flashcard-learning-app)
  - [Overview](#overview)
  - [Features](#features)
    - [Core Functionality](#core-functionality)
    - [User Experience](#user-experience)
  - [Technology Stack](#technology-stack)
    - [Frontend](#frontend)
    - [State Management](#state-management)
    - [Backend & Data](#backend-data)
    - [UI Components](#ui-components)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Development](#development)
    - [Available Scripts](#available-scripts)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)
  <!--toc:end-->

## Overview

Flashy is a modern, feature-rich mobile flashcard application designed to help users master any subject through effective learning techniques. Built with React Native and Expo, this app provides an intuitive interface for creating, managing, and studying flashcards with advanced features like spaced repetition learning.

## Features

### Core Functionality

- Personalized Flashcards : Create and customize flashcard decks for any subject
- Smart Learning : Utilizes spaced repetition techniques to optimize memory retention
- Progress Tracking : Monitor your learning progress with detailed statistics
- User Authentication : Secure login and registration with email/password and Google OAuth
- Offline Support : Study your flashcards even without an internet connection
- Cross-Platform : Works seamlessly on iOS and Android devices

### User Experience

- Intuitive Navigation : Tab-based navigation with Home, Create, and Profile sections
- Card Management : Easy creation, editing, and organization of flashcard decks
- Study Modes : Different learning modes to accommodate various study preferences
- Customizable Settings : Personalize your experience with theme options and card flip directions
- Haptic Feedback : Enhanced interaction through tactile responses

## Technology Stack

### Frontend

- React Native : Core framework for cross-platform mobile development
- Expo : Development platform for building and deploying React Native applications
- TypeScript : Type-safe JavaScript for improved code quality and developer experience
- NativeWind/Tailwind CSS : Utility-first CSS framework for styling
- React Navigation/Expo Router : Navigation and routing solution
- Reanimated : Advanced animations library
- React Native Gesture Handler : Touch and gesture handling

### State Management

- Zustand : Lightweight state management solution
- React Hook Form : Form state management with validation via Zod

### Backend & Data

- Supabase : Backend-as-a-Service for authentication, database, and storage
- AsyncStorage : Local storage solution for offline data persistence

### UI Components

- React Native Primitives : UI component primitives
- Lucide React Native : Icon library
- React Native Gifted Charts : Chart visualization for statistics
- React Native Swiper : Swipeable content for onboarding and card navigation

## Project Structure

```
├── app/                  # Main application 
routes using Expo Router
│   ├── (auth)/           # 
Authentication-related screens
│   └── (root)/           # Main app screens 
after authentication
├── assets/               # Static assets like 
images and fonts
├── components/           # Reusable UI 
components
│   ├── auth/             # 
Authentication-related components
│   ├── core/             # Core application 
components
│   ├── deck-edit-create/ # Components for 
creating and editing decks
│   ├── deck-learn/       # Components for the 
learning experience
│   ├── tabs/             # Tab-specific 
components
│   └── ui/               # Base UI components
├── constants/            # Application 
constants
├── context/              # React context 
providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions 
and services
├── store/                # Zustand state stores
├── supabase/             # Supabase 
configuration
└── types/                # TypeScript type 
definitions
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- bun or npm package manager or simular
- Expo CLI
- iOS Simulator or Android Emulator (optional for local development)

### Installation

1. 1. Clone the repository

```
git clone https://github.com/yourusername/
flashy-app.git
cd flashy-app
```

2. 1. Install dependencies

```
bun install
# or
npm install
```

3. 1. Start the development server

```
bun start
# or
npm start
```

4. 1. Follow the instructions in the terminal to open the app on your device or emulator

## Development

### Available Scripts

- bun start - Start the Expo development server
- bun run android - Run on Android emulator
- bun run ios - Run on iOS simulator
- bun run web - Run in web browser
- bun run lint - Run ESLint
- bun test - Run tests

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License
