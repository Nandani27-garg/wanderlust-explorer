# 🌍 Wanderlust Explorer

A full-stack travel and stay-listing web application inspired by modern vacation-rental platforms. **Wanderlust Explorer** allows users to discover stays, create and manage their own listings, upload property images, leave reviews, and explore listings by category.

## 🚀 Live Demo

🔗 **[Wanderlust Explorer](https://wanderlust-explorer-1.onrender.com)**

## ✨ Features

- 🔐 **User Authentication** — Sign up, log in, and log out securely.
- 🏡 **Browse Listings** — Explore available stays and view detailed property information.
- ➕ **Create Listings** — Authenticated users can add their own stays with title, description, price, location, country, category, and image.
- ✏️ **Edit & Delete Listings** — Listing owners can update or remove their properties.
- 🖼️ **Image Uploads** — Property images are uploaded and stored using Cloudinary.
- ⭐ **Reviews & Ratings** — Logged-in users can add reviews and ratings to listings and authors can delete their reviews.
- 🗺️ **Location Maps** — Listings include location information with map integration.
- 🧭 **Categories** — Browse stays across categories such as Trending, Rooms, Iconic Cities, Mountains, Castles, Arctic, Camping, Farms, Domes, and Boats.
- 💬 **Flash Messages** — Users receive success/error feedback for important actions.
- 📱 **Responsive UI** — Designed to work across different screen sizes.
- ☁️ **Cloud Database & Storage** — MongoDB Atlas for application data and Cloudinary for images.

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- EJS
- EJS-Mate
- Leaflet / MapTiler

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Express Session
- Connect-Mongo
- Joi
- Multer
- Method Override

### Cloud & Deployment
- MongoDB Atlas
- Cloudinary
- Render

## 📂 Project Structure

```text
wanderlust-explorer/
│
├── controllers/       # Application/business logic
├── models/            # Mongoose schemas and models
├── routes/            # Listing, review, and user routes
├── views/             # EJS templates
├── public/            # Static CSS, JavaScript, and assets
├── utils/             # Utility functions and custom errors
├── middleware.js      # Authentication and validation middleware
├── cloudConfig.js     # Cloudinary configuration
├── app.js             # Express application entry point
├── package.json       # Dependencies and project configuration
└── README.md
```

## 🔑 Core Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/listings` | View all listings |
| GET | `/listings/new` | Open create-listing form |
| POST | `/listings` | Create a new listing |
| GET | `/listings/:id` | View a listing |
| GET | `/listings/:id/edit` | Open edit form |
| PUT | `/listings/:id` | Update a listing |
| DELETE | `/listings/:id` | Delete a listing |
| POST | `/listings/:id/reviews` | Add a review |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review |
| GET | `/signup` | Sign-up page |
| GET | `/login` | Login page |
| GET | `/logout` | Log out |

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nandani27-garg/wanderlust-explorer.git
cd wanderlust-explorer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the required credentials:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

If your map integration requires an API key, configure that key according to the map implementation used in the project.

> ⚠️ Never commit your `.env` file or expose API secrets publicly.

### 4. Start the application

```bash
node app.js
```

The application runs on port `8080` locally.

## 🔒 Authentication & Authorization

Wanderlust Explorer uses Passport Local authentication with sessions. Users must be logged in to create listings and reviews. Listing and review ownership is checked before allowing users to modify or delete their content.

## 🖼️ Image Management

Listing images are handled with **Multer** and stored in **Cloudinary** through `multer-storage-cloudinary`. Supported image formats include PNG, JPG, and JPEG.

## 🗄️ Database

MongoDB is used to store users, listings, and reviews. Mongoose provides schema modeling and relationships between listings, users, and reviews.

## 🌐 Deployment

The application is deployed on **Render** and uses environment variables for production configuration. MongoDB Atlas provides the hosted database, while Cloudinary handles listing image storage.

## 📌 Future Improvements

- 🔎 Advanced search and filtering
- 📍 More powerful location-based search
- ❤️ Wishlist/favorites
- 💳 Online booking and payment integration
- 📅 Availability and reservation management
- 📧 Email notifications
- 👤 Enhanced user profiles
- 🛡️ Additional security and validation improvements

## 👩‍💻 Author

**Nandani Garg**  
B.Tech — Artificial Intelligence & Data Science

- GitHub: [Nandani27-garg](https://github.com/Nandani27-garg)
- LinkedIn: [Nandani Garg](https://www.linkedin.com/in/nandani27/)

## 📄 License

This project is currently available under the license specified in the repository configuration.
