# bog-npp
BoG Nonprofit Portal

A web application to streamline the process of nonprofits requesting help from Bits of Good, 
an organization that pairs students with local nonprofits to code them custom software for different needs.

## Stack
* React.js: Front-end
* Next.js: API routes and server-side rendering
* email-templates: Email functionality
* MongoDB: Permanently storing applications and users
* Zeit Now: Hosting and automatic GitHub build hooks

## Running
### MongoDB Instructions

A running instance of MongoDB is required this project.
- [Download MongoDB Community Server](https://www.mongodb.com/download-center/community)
- Go through the installation instructions.
  - Atlas is recommended for basic testing.
  - Leave the port at default 27017
- Create the `applications` database.
- You're done!

### Development
- Setup MongoDB with the instructions above
- Clone this project to your computer
- Navigate to this project in terminal and enter `npm install`
- By default, development uses MongoDB on your computer, if you would like to use an external database, enter `export MONGO_DEV_DB='URLHERE'` (macOS/Linux) or `setx MONGO_DEV_DB URLHERE` (Windows).
- Run the dev version of this project by entering `npm run dev`
