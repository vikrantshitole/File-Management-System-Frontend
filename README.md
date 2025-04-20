# File Management System

A modern file management system built with React, Redux, and SCSS. This application allows users to manage files and folders, upload documents, and organize their content efficiently.

## Features

- File and folder management
- Document upload with progress tracking
- Folder creation and deletion
- File filtering and search
- Responsive design for all screen sizes
- Toast notifications for user feedback
- Modern UI with SCSS styling

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Structure

```
src/
├── api/                 # API configuration and services
├── assets/             # Static assets (images, icons)
├── components/         # React components
│   ├── common/         # Reusable components
│   ├── content/        # Main content components
│   ├── layout/         # Layout components
│   └── Modals/         # Modal components
├── store/              # Redux store configuration
├── styles/             # Global styles and variables
└── utils/              # Utility functions
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/vikrantshitole/File-Management-System-Frontend.git
cd file-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_API_BASE_URL=your_api_base_url
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Previews the production build locally.

## Key Technologies Used

- React
- Redux Toolkit
- SCSS
- Axios
- React Toastify

## Component Documentation

### Common Components

- `Toast`: Handles toast notifications
- `FileIcon`: Reusable file icon component
- `FolderIcon`: Reusable folder icon component
- `Pagination`: Pagination component for lists

### Modal Components

- `CreateFolderModal`: Modal for creating new folders
- `UploadDocumentModal`: Modal for uploading documents
- `UploadProgressModal`: Shows upload progress
- `DeleteConfirmationModal`: Confirmation modal for deletions
- `FiltersModal`: Modal for applying filters

## Styling

The project uses SCSS for styling with a modular approach:
- Global styles in `src/styles/App.scss`
- Component-specific styles in their respective folders
- SCSS variables for consistent theming

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
