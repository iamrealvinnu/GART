# Project Architecture - Dishana's Kitchen (GART)

This document outlines the technical structure and tech stack used in the Dishana's Kitchen web application.

Developed by **GDI Nexus Software Solutions**.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM (v7)
- **State Management**: React Context API
- **HTTP Client**: Axios

## Folder Structure

The project is organized into a `frontend` directory containing the application source and configuration.

- `src/components/`: Reusable UI elements like the Navbar, loaders, and background effects.
- `src/pages/`: Main views including Home, Menu, Cart, Auth, Profile, and the Admin dashboard.
- `src/context/`: Context providers for managing authentication state and shopping cart data.
- `src/services/`: Logic for handling API requests for authentication and orders.
- `src/styles/`: Global CSS and theme variables.

## Core Systems

### Authentication
Managed via `AuthContext`. It handles user login, signup, and maintains the session state. It also distinguishes between regular users and admin accounts to protect specific routes.

### Cart and Ordering
Managed via `CartContext`. It handles adding/removing items from the cart and calculating totals. The ordering process involves slot selection (`SlotSelection.tsx`) and a mock payment step (`Payment.tsx`).

### Admin Dashboard
A dedicated section for managing orders and menu items, restricted to admin users.

### Design and UI
The application uses a custom "Dreamy" background effect and a welcome loader for the initial entry. Styling is handled through Tailwind CSS utility classes and global CSS variables for consistent branding.
