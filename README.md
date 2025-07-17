# Smile4Kids Mobile Backend

A Node.js backend for the Smile4Kids mobile app, supporting user authentication, video/image upload, payment integration (Stripe), and password management.

---

## Features

- User registration and login (JWT-based)
- Password reset via OTP (email)
- User profile management
- Video upload, listing, and streaming
- Image upload and listing
- Stripe payment integration for paid video access
- Admin endpoints for user purchase management

---

## Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```sh
   cd smile4kidsbackend
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Set up environment variables:**  
   Create a `.env` file in the root directory with your credentials:
   ```
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_PORT=3306

   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   EMAIL_HOST=your_email_host

   JWT_SECRET=your_jwt_secret

   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

---

## Database Setup

1. Create a MySQL database.
2. Run the schema in [`schema.sql`](schema.sql) to create tables.
3. (Optional) Run `node setup.js` if you have a setup script.

---

## Usage

Start the server:
```sh
node app.js
```
The app will run on [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### Authentication
- `POST /signup` — Register a new user
- `POST /login` — Login with email and password

### Forgot Password
- `POST /forgot/send-otp` — Send OTP to email
- `POST /forgot/verify-otp` — Verify OTP
- `POST /forgot/reset-password` — Reset password
- `POST /forgot/change-password` — Change password (authenticated)

### User Profile
- `POST /signup/update-profile` — Update user profile
- `GET /signup/profile?email_id=...` — Get user profile

### Videos
- `POST /videos/upload` — Upload a video and thumbnail (JWT required)
- `GET /videos` — Get all videos
- `GET /videos/by-category?language=...&level=...` — Get videos by language and level
- `GET /videos/user-list` — Get all videos with paid/free status for the logged-in user (JWT required)
- `GET /stream/:language/:level/:filename` — Stream a video file

### Images
- `POST /api/images/upload` — Upload an image
- `GET /api/images` — Get all images
- `GET /api/images/:id` — Get image by ID

### Payments
- `POST /payment/create-payment-intent` — Create Stripe payment intent
- `POST /payment/calculate-amount` — Calculate total amount for selected courses
- `GET /payment/my-paid-videos` — Get all paid video categories for the logged-in user (JWT required)

### Admin
- `GET /admin/users-with-purchases` — Get users with purchases and latest payment info (JWT + admin required)

---

## Testing APIs

- Use [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) to test endpoints.
- A ready-to-import Insomnia collection is provided as [`insomnia_collection.json`](insomnia_collection.json).

---

## File Structure

- [`app.js`](app.js): Main server file
- [`db.js`](db.js): MySQL connection pool
- [`authMiddleware.js`](authMiddleware.js): JWT authentication middleware
- [`signup/`](signup/): Signup and profile logic
- [`login/`](login/): Login logic
- [`forgot/`](forgot/): Password reset logic
- [`uploadvideo/`](uploadvideo/): Video upload and listing
- [`image/`](image/): Image upload and listing
- [`payment/`](payment/): Payment and paid video logic
- [`admin/`](admin/): Admin endpoints

---

## License

MIT License