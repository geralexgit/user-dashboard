# User Dashboard

A modern user management dashboard built with React, TypeScript, and Ant Design.

## Features

- 📊 Display users in a responsive table
- 🔍 Search users by name
- 👀 View detailed user information in a modal
- 📄 Pagination with customizable page sizes
- 🎨 Clean and modern UI with Ant Design
- 💪 Fully typed with TypeScript
- 🔄 Real-time data fetching from DummyJSON API

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Ant Design 5** - UI component library
- **Axios** - HTTP client
- **DummyJSON API** - Mock REST API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
user-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── api.ts              # API service functions
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   ├── App.css             # Application styles
│   ├── UserDetails.tsx     # User details modal component
│   ├── index.tsx           # Application entry point
│   └── index.css           # Global styles
├── package.json
├── tsconfig.json
└── README.md
```

## Features in Detail

### User Table
- Displays key user information in an organized table
- Sortable and filterable columns
- Responsive design that adapts to screen size
- Avatar images for visual identification
- Role-based color coding

### Search Functionality
- Real-time search through the DummyJSON API
- Search by user name
- Clear search results with reset button

### User Details Modal
- Comprehensive view of all user information
- Organized into logical sections:
  - Personal Information
  - Address Details
  - Company Information
  - Banking Information
  - Additional Data (University, IP, Crypto, etc.)

### Pagination
- Configurable page sizes (10, 20, 30, 50 users per page)
- Shows total user count
- Smooth navigation between pages

## API Endpoints Used

- `GET /users` - Fetch all users with pagination
- `GET /users/search?q={query}` - Search users
- `GET /users/{id}` - Get single user details

## Customization

You can customize the application by:

1. **Modifying table columns** - Edit the `columns` array in `App.tsx`
2. **Changing page sizes** - Update `pageSizeOptions` in the Table component
3. **Styling** - Modify `App.css` and `index.css`
4. **Adding filters** - Extend the API service in `api.ts`

## License

MIT

## Author

Created with Create React App, TypeScript, and Ant Design
