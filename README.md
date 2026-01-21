# TuxPresent

**Self-hosted presentation building tool similar to Prezi**

TuxPresent is an open-source, self-hosted presentation software that replicates the core features of Prezi. Build stunning, dynamic presentations with our intuitive WYSIWYG editor, collaborate with your team, and export to PDF.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- ✨ **WYSIWYG Editor**: Intuitive drag-and-drop interface for creating presentations
- 🎨 **Beautiful Templates**: Start with professionally designed templates
- 👥 **Multi-user Support**: Real-time collaboration with your team
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔐 **Secure Authentication**: JWT-based user authentication
- 📤 **PDF Export**: Export your presentations as high-quality PDFs
- 🎯 **3D Transitions**: Dynamic camera movements and zoom effects like Prezi
- 🖼️ **Rich Content**: Add text, shapes, and images to your slides
- 💾 **Auto-save**: Never lose your work with automatic saving
- 🌐 **Self-hosted**: Keep your data on your own servers

## Technology Stack

### Backend
- **Node.js** with **Express** - REST API server
- **MongoDB** - Database for storing presentations and user data
- **JWT** - Secure authentication
- **Puppeteer** - PDF export functionality
- **TypeScript** - Type-safe code

### Frontend
- **Next.js** (React) - Modern web framework
- **TypeScript** - Type-safe development
- **CSS3** - Custom styling with 3D transforms
- **Axios** - HTTP client for API calls

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB 5.0+
- Docker and Docker Compose (optional)

### Installation

#### Option 1: Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/MrMEEE/tuxpresent.git
cd tuxpresent
```

2. Start the application with Docker Compose:
```bash
docker-compose up -d
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

#### Option 2: Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/MrMEEE/tuxpresent.git
cd tuxpresent
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

4. Start MongoDB (if not already running):
```bash
mongod
```

5. Start the development servers:
```bash
# From the root directory
npm run dev
```

6. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Usage

### Creating a Presentation

1. **Sign up** for a new account or **log in** to an existing one
2. Click **"New Presentation"** on the dashboard
3. Enter a title for your presentation
4. Use the editor to add slides, text, shapes, and images
5. Arrange elements in 3D space using the position and rotation controls
6. **Save** your presentation frequently
7. Click **"Present"** to view your presentation in full-screen mode

### Editor Controls

- **Add Text**: Click the "T" button to add a text element
- **Add Shape**: Click the "◻" button to add a shape
- **Add Image**: Click the "🖼" button to add an image
- **Zoom**: Use the +/- buttons or scroll wheel to zoom in/out
- **Pan**: Hold Shift + click and drag, or middle-mouse button
- **Select**: Click on any element to select it
- **Move**: Drag selected elements to reposition them
- **Properties**: Adjust position, scale, and rotation in the properties panel

### Presentation Mode

- **Space** or **Arrow Right**: Next slide
- **Arrow Left**: Previous slide
- **Escape**: Exit presentation mode
- **Export PDF**: Click the "Export PDF" button to download

### Collaboration

1. Open your presentation
2. Click on **"Share"** (if implemented)
3. Add collaborators by email
4. Collaborators can edit the presentation in real-time

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Presentations
- `GET /api/presentations` - Get all user's presentations
- `POST /api/presentations` - Create a new presentation
- `GET /api/presentations/:id` - Get a specific presentation
- `PUT /api/presentations/:id` - Update a presentation
- `DELETE /api/presentations/:id` - Delete a presentation
- `POST /api/presentations/:id/collaborators` - Add a collaborator

### Export
- `GET /api/export/presentations/:id/pdf` - Export presentation to PDF

## Project Structure

```
tuxpresent/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # Frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Next.js pages
│   │   ├── styles/         # CSS styles
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml       # Docker Compose configuration
├── package.json             # Root package.json
└── README.md               # This file
```

## Development

### Backend Development

```bash
cd backend
npm run dev
```

### Frontend Development

```bash
cd frontend
npm run dev
```

### Building for Production

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tuxpresent
JWT_SECRET=your_jwt_secret_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
UPLOAD_DIR=uploads
```

### Frontend Environment Variables

Set the API URL in `frontend/next.config.js` or via environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

- [x] User authentication
- [x] WYSIWYG editor with 3D positioning
- [x] Multi-user support
- [x] PDF export
- [ ] Design templates library
- [ ] Real-time collaboration
- [ ] Image upload functionality
- [ ] Presenter notes
- [ ] Animation timeline
- [ ] Slide transitions library
- [ ] Presentation themes
- [ ] Video embedding
- [ ] Charts and diagrams
- [ ] Mobile app

## Comparison with Prezi

| Feature | TuxPresent | Prezi |
|---------|------------|-------|
| Self-hosted | ✅ Yes | ❌ No |
| Open-source | ✅ Yes | ❌ No |
| WYSIWYG Editor | ✅ Yes | ✅ Yes |
| 3D Transitions | ✅ Yes | ✅ Yes |
| Collaboration | ✅ Yes | ✅ Yes |
| PDF Export | ✅ Yes | ✅ Yes |
| Templates | 🚧 In Progress | ✅ Yes |
| Video Embed | 🚧 Planned | ✅ Yes |
| Analytics | 🚧 Planned | ✅ Yes |

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by [Prezi](https://prezi.com)
- Built with [Bespoke.js](https://github.com/bespokejs/bespoke) and [Impress.js](https://github.com/impress/impress.js) concepts
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

## Support

If you find this project useful, please consider giving it a star ⭐ on GitHub!

For issues and feature requests, please use the [GitHub Issues](https://github.com/MrMEEE/tuxpresent/issues) page.

## Authors

- [MrMEEE](https://github.com/MrMEEE)

---

**Made with ❤️ by the open-source community**
