# React Router URL Parameters Implementation

## Summary

Successfully integrated React Router to store pagination information (`currentPage` and `pageSize`) and search query (`searchQuery`) in the URL. This allows users to:

1. Bookmark specific views of the data
2. Share URLs that load with the same pagination and search state
3. Use browser back/forward buttons to navigate through previous states
4. Refresh the page without losing their current view

## Changes Made

### 1. Dependencies Added
- `react-router-dom` installed via npm

### 2. Files Modified

#### `src/index.tsx`
- Wrapped the `App` component with `BrowserRouter` to enable routing

#### `src/App.tsx`
- Added import for `useSearchParams` from `react-router-dom`
- Modified state initialization to read from URL parameters:
  - `currentPage` reads from `?page=` parameter (default: 1)
  - `pageSize` reads from `?pageSize=` parameter (default: 10)
  - `searchQuery` reads from `?search=` parameter (default: '')
- Added `updateUrlParams` function to update URL parameters when state changes
- Updated all state-changing functions to also update URL parameters:
  - `handlePageChange` updates `?page=` parameter
  - `handlePageSizeChange` updates `?pageSize=` and resets `?page=` to 1
  - `handleSearch` updates `?search=` parameter and resets `?page=` to 1
  - `handleRefresh` clears `?search=` parameter and resets `?page=` to 1
- Fixed import for `getColumns` to import directly from `./components/UserTable/utils`

#### `tsconfig.json`
- Added `esModuleInterop: true` and `allowSyntheticDefaultImports: true` to fix TypeScript import issues

### 3. URL Parameter Structure

The application now uses the following URL parameters:

- `?page=` - Current page number (1-based)
- `?pageSize=` - Number of items per page (10, 20, 30, or 50)
- `?search=` - Search query string (optional)

### Example URLs:
- Default: `http://localhost:3001/`
- Page 3 with 20 items: `http://localhost:3001/?page=3&pageSize=20`
- Search for "john": `http://localhost:3001/?search=john&page=1&pageSize=10`
- Combined: `http://localhost:3001/?search=smith&page=2&pageSize=30`

## Testing

The application is running at `http://localhost:3001/`. You can test by:

1. Changing page or page size - URL should update automatically
2. Searching for users - search term appears in URL
3. Copying a URL with parameters and pasting in a new tab
4. Using browser back/forward buttons

## Benefits

1. **Shareable State**: Users can share exact views of the data
2. **Bookmarkable**: Specific filters and pagination can be bookmarked
3. **History Navigation**: Browser back/forward buttons work correctly
4. **State Persistence**: Page refresh maintains the current view
5. **Deep Linking**: Direct links to specific data views

## Notes

- The implementation uses `replace: true` when updating URL parameters to avoid cluttering browser history with every small state change
- Search parameters are removed from the URL when cleared (using `delete` instead of setting to empty string)
- The application gracefully handles invalid URL parameters (e.g., non-numeric page values)