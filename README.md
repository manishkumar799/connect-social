# Connect Social Application

This is a full-stack chat application built using the **MERN (MongoDB, Express, React, Node)** stack. It supports both **personal chats** (1-on-1 messaging) and **group chats** (multiple users). The frontend is built with **React**, **Redux**, and **TypeScript** for state management, while the backend is handled with **Node.js**, **Express**, and **MongoDB** for data storage.

## Features

- **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
- **Personal Chats**: Send and receive messages in 1-on-1 conversations.
- **Group Chats**: Create, join, and participate in group chats.
- **Real-Time Messaging**: Messages are delivered in real-time using WebSockets (future plan: `Socket.io` integration).
- **Redux for State Management**: Used for managing user and chat data on the frontend.
- **MongoDB for Database**: Storing users, messages, and groups.

## Tech Stack

### Frontend:
- **React (with Vite)**: A fast and lightweight React framework.
- **TypeScript**: For type safety.
- **Redux Toolkit**: For global state management.
- **Axios**: For making HTTP requests to the backend API.

### Backend:
- **Node.js**: JavaScript runtime.
- **Express.js**: Fast, minimalist web framework for Node.js.
- **TypeScript**: For type safety and better development experience.
- **MongoDB**: NoSQL database for storing user, message, and group data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for secure authentication.
- **bcrypt**: For password hashing.

### Development Tools:
- **ESLint**: For code linting and maintaining coding standards (configured for both client and server side).
- **Prettier**: For code formatting.
- **dotenv**: For environment variable management.

## Installation and Setup

Follow these steps to set up the application locally.

### Prerequisites

- **Node.js** (v18.18.0 or higher)
- **MongoDB** (running locally or a MongoDB Atlas instance)
- **npm** or **yarn**

### Clone the Repository

```bash
git clone https://github.com/yourusername/mern-chat-app.git
cd mern-chat-app
```

### Backend Setup

1. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the `server` directory and add the following variables:

   ```bash
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/yourdbname
   JWT_SECRET=your_jwt_secret_key
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USERNAME=your_email@example.com
   SMTP_PASSWORD=your_email_password
   ```

3. **Run the backend**:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the `client` directory and add the following:

   ```bash
   VITE_API_URL=http://localhost:5000
   ```

3. **Run the frontend**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Folder Structure

### Backend (Node.js + Express)
```bash
server/
│
├── models/
│   ├── User.ts           # Mongoose User schema
│   ├── Message.ts        # Mongoose Message schema
│   └── Group.ts          # Mongoose Group schema
│
├── routes/
│   ├── userRoutes.ts     # User-related API routes
│   └── chatRoutes.ts     # Chat-related API routes
│
├── controllers/
│   ├── userController.ts # User-related controllers
│   └── chatController.ts # Chat-related controllers
│
├── services/
│   ├── userService.ts    # Business logic for users
│   └── chatService.ts    # Business logic for chats
│
├── middlewares/
│   ├── authMiddleware.ts # JWT authentication middleware
│
├── utils/
│   ├── logger.ts         # Utility for logging
│   └── errorHandler.ts   # Global error handler
│
└── app.ts                # Main server configuration
```

### Frontend (React + Redux + TypeScript)

```bash
client/
│
├── src/
│   ├── app/
│   │   └── store.ts        # Redux store setup
│   ├── features/
│   │   ├── user/           # User-related slice and components
│   │   └── chat/           # Chat-related slice and components
│   ├── components/         # Reusable components
│   ├── pages/              # React pages (Login, Chat, etc.)
│   ├── utils/              # Utility functions (e.g., Axios instance)
│   └── App.tsx             # Main App component
└── .env                    # Frontend environment variables
```

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and get a token.

### Users
- `GET /api/users/profile`: Get user profile details (requires JWT).

### Chats
- `POST /api/messages/personal`: Send a personal message.
- `POST /api/messages/group`: Send a message in a group.
- `GET /api/messages/personal/:recipientId`: Get personal chat messages.
- `GET /api/messages/group/:groupId`: Get group chat messages.
- `POST /api/initiate-chat`: Initiate a new chat.

## Testing

You can run tests for both the backend and frontend using:

### Backend Testing:
```bash
cd server
npm run test
```

### Frontend Testing:
```bash
cd client
npm run test
```

## Future Plans

- **Real-Time Messaging**: Implement real-time messaging with Socket.io.
- **Typing Indicators**: Show when users are typing.
- **File Sharing**: Allow users to send files in chat.

## Contributing

Feel free to fork the repository and submit pull requests. Contributions are always welcome!

## License

This project is licensed under the MIT License.
