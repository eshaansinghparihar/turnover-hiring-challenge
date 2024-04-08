# MoonShot Hiring Challenge

## Overview

This project is a web application that allows users to sign up, verify their email address, log in, select categories of interest, and log out. It features error handling and utilizes a modern tech stack for development.

## Features

- **SignUp**: Users can register with their username, email address, and password.
- **Verify OTP**: An OTP (One-Time Password) is sent to the user's email for email address verification.
- **Login**: Implemented a login page for users to authenticate.
- **Categories Select**: Users can select their interests from a list of products provided.
- **Logout**: Included a dedicated logout button in the header for user convenience.
- **Error Handling**: Basic error handling is implemented for common scenarios to improve user experience.

## Tech Stack Used

1. **T3**: Primary framework for backend development.
2. **Prisma**: ORM (Object-Relational Mapping) tool for database interaction.
3. **tRPC**: Typed RPC (Remote Procedure Call) framework for TypeScript.
4. **neon.tech Postgres Database**: Database solution for storing application data.
5. **Next.js**: React framework for frontend development.
6. **Tailwind CSS**: Utility-first CSS framework for styling.

## Getting Started

1. **Installation**: Clone the repository and install dependencies using `npm install`.
2. **Configuration**: Set up environment variables and configure database connection.
3. **Run the App**: Start the development server using `npm run dev`.

## Future Improvements

1. **Persistence Issue**: Resolve the unknown error preventing user-selected interests from being persisted into the database.
2. **JWT for Session Management**: Implement JWT (JSON Web Tokens) for more secure and efficient session management.
3. **Enhanced Error Handling**: Enhance error handling mechanisms to handle edge case scenarios and provide better feedback to users.


## Deployed Link

The project is deployed at [turnover-hiring-challenge.vercel.app](https://turnover-hiring-challenge.vercel.app).
