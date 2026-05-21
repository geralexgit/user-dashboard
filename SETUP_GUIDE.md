# User Dashboard - Setup Guide

## Quick Start

1. **Extract the archive:**
   ```bash
   tar -xzf user-dashboard.tar.gz
   cd user-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   If you encounter peer dependency issues, use:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## What You'll See

The dashboard will load with:
- A searchable table of users from DummyJSON API
- Pagination controls (10/20/30/50 users per page)
- A "View" button for each user to see full details
- Search functionality to find users by name
- Total user count displayed in the header

## Project Files Overview

```
user-dashboard/
├── src/
│   ├── App.tsx           # Main dashboard component with table
│   ├── UserDetails.tsx   # Modal showing complete user info
│   ├── api.ts           # API calls to DummyJSON
│   ├── types.ts         # TypeScript interfaces
│   ├── App.css          # Component styles
│   ├── index.tsx        # React entry point
│   └── index.css        # Global styles
├── index.html          # HTML template (Vite uses root index.html)
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md           # Full documentation
```

## Key Features Implemented

✅ **User List Table**
- Avatar, name, email, age, gender, role
- Company and city information
- Sortable and responsive

✅ **Search Functionality**
- Search users by name
- Reset to show all users

✅ **User Details Modal**
- Complete profile information
- Address details with coordinates
- Company information
- Banking details (partially masked)
- Crypto wallet info
- University and other metadata

✅ **Pagination**
- Navigate through all 208 users
- Customizable page size
- Shows current page and total

✅ **TypeScript**
- Fully typed components
- Type-safe API calls
- Autocomplete support

✅ **Ant Design Integration**
- Professional UI components
- Icons and tags
- Responsive layout
- Loading states

## Available API Endpoints

The app uses these DummyJSON endpoints:

- `GET https://dummyjson.com/users?limit=30&skip=0` - Get paginated users
- `GET https://dummyjson.com/users/search?q=John` - Search users
- `GET https://dummyjson.com/users/1` - Get single user (available but not currently used)

## Customization Ideas

1. **Add Filters:** Role, gender, age range filters
2. **Export Data:** Add CSV/Excel export functionality
3. **User Actions:** Edit, delete, add users (mock operations)
4. **Advanced Search:** Filter by company, city, etc.
5. **Dark Mode:** Add theme toggle
6. **Charts:** Visualize user demographics
7. **Favorites:** Bookmark specific users

## Troubleshooting

**Port already in use:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
- Make sure all files are saved
- Restart your IDE
- Check tsconfig.json is present

## Production Build

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder ready for deployment.

## Deployment Options

- **Vercel:** `vercel deploy`
- **Netlify:** Drag and drop the `dist` folder
- **GitHub Pages:** Use gh-pages package
- **AWS S3:** Upload dist folder to S3 bucket

## Technologies Used

- **React 18.2.0** - UI framework
- **TypeScript 5.0.0** - Type safety
- **Ant Design 5.16.0** - Component library
- **Axios 1.6.8** - HTTP client
- **Vite 5.0.0** - Modern build tooling (replaced react-scripts)

## Need Help?

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Ant Design Components](https://ant.design/components/overview/)
- [DummyJSON API Docs](https://dummyjson.com/docs/users)

---

**Note:** This is a demo application using mock data from DummyJSON. Add/Edit/Delete operations won't persist on the server.
