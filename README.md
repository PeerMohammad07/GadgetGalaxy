GadgetGalaxy - E-Commerce Platform Backend Documentation

Table of Contents
----------------
1)Prerequisites 

2)Installation

3)Environment Variables

4)Running the Application


1) Prerequisites

Before you begin, ensure you have the following installed:

Node.js (version 14 or higher)
MongoDB (local installation or MongoDB Atlas)
Git (for version control)

-------------------------
2) Installation

Clone the repository:

git clone <repository-url>
cd <repository-folder>

Install dependencies:
npm install

----------------------------

3) Environment Variables
 
Create a .env file in the root of the project and add the following variables:

CLOUDINARY_CLOUD_NAME=''
CLOUDINARY_API_KEY=''
CLOUDINARY_API_SECRET=''
MONGO_DB_URL=''
JWT_SECRET_KEY=''
JWT_REFRESH_SECRET_KEY=''

--------------------------

4)  Running the Application

To start the server, run the following command : 
npm run dev
