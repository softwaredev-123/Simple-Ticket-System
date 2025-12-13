# Simple Ticket System 

This is a simple full-stack ticketing system. It features a backend API built with Node.js and a frontend SPA built with React.

---

## Core Features

- **User Authentication:** Users can register and log in.
- **Event Browsing:** A public list of all available events.
- **Ticket Purchasing:** Logged-in users can purchase tickets for an event.
- **Order History:** Users can view a history of their ticket orders.
- **Admin Panel:** An admin user can create new events.

---

## Tech Stack

- **Backend:** Node.js, Express.js, PostgreSQL, JWT
- **Frontend:** React.js, Vite, Tailwind CSS, React Router

---

## How to Run

1.  **Prerequisites:**
    - Make sure you have [Node.js](https://nodejs.org/) (v20+) and [PostgreSQL](https://www.postgresql.org/) installed and running.

2.  **Install Dependencies:**
    - In the project root (`/`): `npm install`
    - In the client folder (`/client`): `npm install`

3.  **Setup Database:**
    - Create a `.env` file in the project root.
    - Add the following content, updating `DB_PASSWORD` and `DB_DATABASE` to match your local PostgreSQL setup. You may need to create the database manually (e.g., `CREATE DATABASE simple_ticket_system;`).
      ```env
      PORT=3000
      DB_USER=postgres
      DB_HOST=localhost
      DB_DATABASE=simple_ticket_system
      DB_PASSWORD=password
      DB_PORT=5432
      JWT_SECRET=a-very-strong-secret
      ```
    - Run `npm run db:init` from the root directory to create the tables.

4.  **Run the Project:**
    - **Backend:** In the root directory, run `npm run dev`.
    - **Frontend:** In the `/client` directory, run `npm run dev`.
    - Open your browser to the frontend URL (usually `http://localhost:5173`).

---

### Note: Creating an Admin User

To test the admin functionality (creating events):

1.  Register a new user in the web application.
2.  Connect to your PostgreSQL database.
3.  Run the following SQL command to grant admin privileges:
    ```sql
    UPDATE users SET role = 'admin' WHERE email = 'your-registered-email@address.com';
    ```
4.  Log out and log back in. You should now see the "Create Event" link.