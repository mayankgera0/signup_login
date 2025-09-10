# Login & Signup App

A simple React app with login and signup functionality, supporting light/dark theme toggle. User data is stored in browser localStorage for demonstration purposes.

## Features

- **Sign Up:** Create a new account with name, username, email, phone, and password.
- **Login:** Sign in using your username and password.
- **Form Validation:** All fields are validated using [Zod](https://zod.dev/) and `react-hook-form`.
- **Theme Toggle:** Switch between light and dark modes.
- **Responsive Design:** Works well on desktop and mobile.
- **LocalStorage:** User data is stored locally (for demo only).

## Getting Started

### Prerequisites

- Node.js & npm installed

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mayankgera0/signup_login.git
   cd login-signup-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Sign Up:** Go to `/signup`, fill in the form, and submit.
- **Login:** Go to `/login`, enter your credentials, and log in.
- **Theme Toggle:** Click the button at the top right to switch themes.

## Folder Structure

```
src/
  components/
    TextField.jsx
    ThemeToggle.jsx
  pages/
    Login.jsx
    SignUp.jsx
  validation/
    schema.js
  styles.css
  App.jsx
```

## Notes

- **Security:** Passwords are stored in plain text in localStorage for demo purposes. Do not use this approach in production.
- **Routing:** Uses [React Router](https://reactrouter.com/) for navigation between login and signup pages.
