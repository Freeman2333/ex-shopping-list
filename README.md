# Shopping List

A shopping list application built with React, TypeScript, and Redux Toolkit.

## Tech Stack

- React 19 + TypeScript
- Vite
- Redux Toolkit & RTK Query
- Tailwind CSS 4
- React Hook Form + Yup
- React Router v7

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

### Backend Setup

1. Clone and set up the server repository:

```bash
git clone https://github.com/ofek-exco/shopping-list-api
cd shopping-list-api
npm install
```

2. Change the server port to 3003 in the server configuration file.

3. Fix CORS issues by adding the following to the server:

```javascript
// Add CORS middleware to allow requests from the frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
```

4. Start the server:

```bash
npm start
```

### Frontend Setup

1. Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd shopping-list
npm install
```

2. (Optional) Configure environment variables by creating a `.env` file:

```env
VITE_API_URL=http://localhost:3003
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

Other commands:

```bash
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## API Integration

The app expects a REST API with the following endpoints:

- `GET /api/items` - Get all products
- `GET /api/items/:id` - Get a product by ID
- `POST /api/items` - Create a new product
- `PUT /api/items/:id` - Update a product
- `DELETE /api/items/:id` - Delete a product

Expected response format:

```json
// GET /api/items
{ "items": [{ "id": 1, "name": "Product", "quantity": 2, "purchased": false }] }

// GET /api/items/:id
{ "item": { "id": 1, "name": "Product", "quantity": 2, "purchased": false } }
```

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── redux/           # Store and API services
├── schemas/         # Validation schemas
└── types/           # TypeScript types
```
