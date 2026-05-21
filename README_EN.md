# User Dashboard

A modern user management dashboard built with React, TypeScript, and CSS Modules.

## Features

- 📊 Display users in a responsive table
- 🔍 Search users by name
- 👀 View detailed user information in a modal
- 📄 Pagination with customizable page sizes
- 🔗 State persistence in URL parameters (React Router)
- 🎨 Clean and modern UI with CSS Modules
- 💪 Fully typed with TypeScript
- 🔄 Real-time data fetching from DummyJSON API

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **CSS Modules** - Styles safety
- **React Router DOM** - Routing and URL parameter management
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
npm run dev
```

The application will open at [http://localhost:3001](http://localhost:3001)

### Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the built application
- `npm test` - Runs the test suite
- `npm run test:ui` - Runs tests with interactive UI interface
- `npm run test:coverage` - Runs tests with code coverage report generation

## Project Structure

```
user-dashboard/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── api.ts              # API service functions
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   ├── App.css             # Application styles
│   ├── index.tsx           # Application entry point
│   ├── index.css           # Global styles
│   └── components/         # Application components
│       ├── Button/         # Button component
│       ├── Header/         # Header component
│       ├── Loading/        # Loading indicator
│       ├── Pagination/     # Pagination component
│       ├── SearchBar/      # Search bar component
│       ├── Tag/            # Tag component
│       ├── UserDetails/    # User details modal
│       └── UserTable/      # User table component
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts          # Vite configuration (including Vitest)
├── README.md               # Russian documentation
├── README_EN.md            # English documentation
└── URL_PARAMETERS_IMPLEMENTATION.md  # URL parameters implementation documentation
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

### URL Parameter State Management
- **React Router URL parameters** - Application state stored in URL
- **Pagination parameters** - `?page=` (current page) and `?pageSize=` (page size)
- **Search parameter** - `?search=` (search query)
- **Capabilities**:
  - Bookmarking specific data views
  - Sharing URLs with preserved state
  - Using browser back/forward buttons for navigation
  - Page refresh without losing current state
- **Example URLs**:
  - Default: `http://localhost:3001/`
  - Page 3 with 20 items: `http://localhost:3001/?page=3&pageSize=20`
  - Search for "john": `http://localhost:3001/?search=john&page=1&pageSize=10`
  - Combined: `http://localhost:3001/?search=smith&page=2&pageSize=30`

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

Created with Create React App, TypeScript, and CSS Modules
