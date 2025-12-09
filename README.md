# Vehicle Rental System – Backend API

A complete vehicle rental management backend built with Node.js, TypeScript, Express.js, and PostgreSQL.
This API handles authentication, vehicles, users, and bookings with full role-based access control.

[Live Deployment] (https://vehicle-rental-system-bay-five.vercel.app/) \
[GitHub Repository] (https://github.com/arefin008/vehicle_rental_system_backend_project) 

## Features

- Authentication

  - JWT-based login system

  - Secure password hashing with bcrypt

  - Role-based access (Admin, Customer)

- Vehicle Management

  - Add / update / delete vehicles (Admin only)

  - View vehicles (Public)

  - Prevent deletion if active bookings exist

- User Management

  - Admin can manage all users

  - Customers can update only their own profile

  - Secure authorization checks

- Booking System

  - Create bookings with automated price calculation

  - Check vehicle availability

  - Auto-update vehicle status

  - Cancel booking (customer)

  - Mark as returned (admin)

  - Admin can see all bookings, customer can see only their own

- ## Technology Stack

  - Node.js

  - TypeScript

  - Express.js

  - PostgreSQL

  - pg (node-postgres)

  - bcrypt

  - jsonwebtoken

  - Modular architecture (controllers, services, routes)
 
- ## Setup & Installation
  1. Clone the Repository
     ```
     git clone https://github.com/arefin008/vehicle_rental_system_backend_project.git
     cd vehicle_rental_system_backend_project
  3. Install Dependencies
     ```
     npm install
  4. Create .env File
  5. Run Database Migrations
  6. Start the Server
     ```
     npm run dev
