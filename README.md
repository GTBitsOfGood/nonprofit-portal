# bog-npp
BoG Nonprofit Portal

## MongoDB Instructions

A running instance of MongoDB is required this project.
- [Download MongoDB Community Server](https://www.mongodb.com/download-center/community)
- Go through the installation instructions.
  - Atlas is recommended for basic testing.
  - Leave the port at default 27017
- Create the `test` database.
- You're done!

## Development
- Setup MongoDB with the instructions above
- Clone this project to your computer
- Navigate to this project in terminal and enter `npm install`
- By default, development uses MongoDB on your computer, if you would like to use an external database, enter `export devDB='URLHERE'` (macOS/Linux) or `setx devDB URLHERE` (Windows).
- Run the dev version of this project by entering `npm run dev`
