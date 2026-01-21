# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- Git

## Step-by-Step Installation

### 1. Clone the repository
```bash
git clone https://github.com/MrMEEE/tuxpresent.git
cd tuxpresent
```

### 2. Install root dependencies
```bash
npm install
```

### 3. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
```

Edit the `.env` file with your MongoDB connection string and JWT secret.

### 4. Setup Frontend
```bash
cd ../frontend
npm install
```

### 5. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# Or run directly
mongod
```

### 6. Start the Application

#### Option A: Run both frontend and backend together
```bash
# From the root directory
npm run dev
```

#### Option B: Run separately
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 7. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Docker Installation (Alternative)

If you prefer using Docker:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## First Steps

1. **Register a new account** at http://localhost:3000/register
2. **Log in** with your credentials
3. **Create a new presentation** from the dashboard
4. **Choose a template** (Blank, Business, Education, Pitch Deck, or Creative)
5. **Edit your presentation** using the WYSIWYG editor
6. **Present** your slides in fullscreen mode
7. **Export to PDF** when ready

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the `MONGODB_URI` in `backend/.env`
- Try connecting with: `mongodb://localhost:27017/tuxpresent`

### Port Already in Use
- Backend (5000): Change `PORT` in `backend/.env`
- Frontend (3000): Next.js will automatically try port 3001

### Authentication Issues
- Clear browser localStorage
- Check JWT_SECRET is set in `backend/.env`
- Restart the backend server

## Development Tips

- Auto-save is enabled in the editor
- Use Shift+Click or middle mouse button to pan the canvas
- Scroll to zoom in/out
- Press Escape in presentation mode to return to editor
- All changes are saved to MongoDB

## API Testing

Use curl or Postman to test the API:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Need Help?

- Check the main README.md for detailed documentation
- Open an issue on GitHub
- Review the API endpoints in the backend/src/routes directory
