
# Employee Attendance Management System

This is an Employee Attendance Management System developed using the **MERN** stack (MongoDB, Express.js, React, Node.js). The application allows administrators to manage employee attendance and provides employees with a dashboard to view their attendance records.

## Features

- User authentication (login and registration)
- Admin dashboard for managing employee attendance
- Employee dashboard to view current month attendance
- Ability for admins to generate attendance reports
- Register new employees

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Getting Started

To run this project locally, follow the steps below:

### Prerequisites

- Node.js
- MongoDB

## Screen Shots

## Login
![Login](https://github.com/Wasiqkhan527462/Attendence_Management/blob/c761f7c82bf43b7851f8e531bba3864d620a60b2/Login.png)

## Admin Dashboard
![Admin Dashboard](https://github.com/Wasiqkhan527462/Attendence_Management/blob/c761f7c82bf43b7851f8e531bba3864d620a60b2/Admin%20Dashboard.png)

## Employee Dashboard
![Employee Dashboard](https://github.com/Wasiqkhan527462/Attendence_Management/blob/c761f7c82bf43b7851f8e531bba3864d620a60b2/Employee%20Dashboard.png)

## Register User
![Register User](https://github.com/Wasiqkhan527462/Attendence_Management/blob/c761f7c82bf43b7851f8e531bba3864d620a60b2/Register.png)


### Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Wasiqkhan527462/Attendence_Management.git
   cd Attendence_Management/server
   ```

2. Create a `.env` file in the root of the server directory and add the following environment variables:
   ```plaintext
   PORT=<your_port>
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

3. Install server dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../client
   ```

2. Create a `.env` file in the root of the client directory and add the following environment variable:
   ```plaintext
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Install frontend dependencies:
   ```bash
   npm install
   ```

4. Start the frontend:
   ```bash
   npm start
   ```

## Usage

- Navigate to [http://localhost:3000](http://localhost:3000) to access the Employee Attendance Management System.
- Admins can log in to manage attendance and generate reports.
- Employees can log in to view their attendance for the current month.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bugs you find.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
