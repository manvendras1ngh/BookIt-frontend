# BookIt Web App (Frontend)

BookIt is a web application that allows users to explore immersive experiences, view experience details, select dates and time slots, apply promo codes, and complete bookings. The application is built with React and TypeScript and features a clean, modern, and responsive user interface.

## Live Demo

Frontend (Live App): https://bookitabhi.netlify.app
Backend (Hosted API): https://book-it-backend-eight.vercel.app/api/v1/experience
Backend Respository: https://github.com/manvendras1ngh/BookIt-backend

---

## Features

1. Homepage displaying all available experiences.
2. Experience detail page showing description, available dates, time slots, and pricing.
3. Booking page with user details, promo code validation, and price summary.
4. Promo code validation integrated with backend API.
5. Booking confirmation page after successful booking.
6. Responsive and clean UI developed using Tailwind CSS.
7. Navigation flow: Experience list → Details → Booking → Confirmation.
8. Local state persistence during booking steps.
9. Error handling for invalid promo codes, booking issues, and invalid selections.
10. Fast performance using Vite and efficient React structure.

---

## Tech Stack Used

- React
- TypeScript
- React Router DOM
- Axios
- Tailwind CSS
- Vite
- Deployment via Netlify

---

## Getting Started

Follow these steps to run the frontend locally.

### 1. Clone the repository

```
git clone <frontend-repo-url>
cd frontend
```

### 2. Install dependencies

```
npm install
```

### 3. Start the development server

```
npm run dev
```

Access it at:

```
http://localhost:5173
```

### 4. Build for production

```
npm run build
```

This will output a `dist` folder which can be deployed to Netlify or any static hosting service.

---

## API Endpoints Used

The frontend integrates with:

```
GET /api/v1/experience
GET /api/v1/experience/:id
POST /api/v1/promo/validate
POST /api/v1/booking
```

---

## Connect

Website: https://dev.manavsingh.in  
LinkedIn: https://www.linkedin.com/in/manvendras1ngh/  
Email: 007singhmanvendra@gmail.com
