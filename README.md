# Social Network API

This is a project for building an API for a social network web application where users can share their thoughts, react to friends' thoughts, and manage their friend list. The API is built using Express.js for routing, MongoDB as the database, and Mongoose as the ODM.

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Walkthrough Video](#walkthrough-video)
- [Contributing](#contributing)
- [License](#license)

## Description

MongoDB is chosen as the database for its efficiency with handling large amounts of data and its flexibility with unstructured data. The project aims to provide the foundational API for a social networking platform, allowing users to perform various actions such as creating and reacting to thoughts, and managing their friend lists.

## Technologies Used

🔧 JavaScript | ⚙️ Node.js | 🛠️ Express.js | 📦 MongoDB | 🍃 Mongoose

## Installation

1. Clone the repository: `git clone https://github.com/daleyjones/week-18-social-network-api.git`
2. Navigate to the project directory: `cd week-18-social-network-api`
3. Install dependencies: `npm install`

## Usage

1. Start the server: `npm start`
2. Use a tool like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) to interact with the API endpoints.
3. Create your own data using the API endpoints.

## API Routes

- **User Routes:**
  - `/api/users`: GET all users, POST a new user
  - `/api/users/:id`: GET a single user, PUT update a user, DELETE a user
  - `/api/users/:userId/friends/:friendId`: POST to add a friend, DELETE to remove a friend

- **Thought Routes:**
  - `/api/thoughts`: GET all thoughts, POST a new thought
  - `/api/thoughts/:id`: GET a single thought, PUT update a thought, DELETE a thought

- **Reaction Routes:**
  - `/api/thoughts/:thoughtId/reactions`: POST a reaction to a thought, DELETE a reaction

## Walkthrough Video

Watch the [walkthrough video](https://drive.google.com/file/d/1TbZJA9bf0hEiXFuwoTAvRmgAKmNozWhV/view) that demonstrates the functionality of the API and how to use it.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to submit a pull request.

# Project
By Daley Jones.

## License

licensed under the [MIT License](LICENSE).
