# Mongo & Mongoose Web Scraper
![](public/assets/images/scraperRM.gif)

### Scrape articles from [The Onion](https://www.theonion.com/c/news-in-brief), save your favorites, and make comments.
## [Link to Live Heroku Page](https://safe-meadow-70895.herokuapp.com/)
---
Users can scrape for 20 recent articles from The Onion, and save favorites for later viewing. Notes can be added and deleted for saved articles. Articles can be cleared from the saved section and all Articles and Notes can be wiped from the database for a clean slate.

This app uses Axios and Cheerio to scrape for data on the web. Article and Note models are handled by Mongoose and the the routes for connecting to the Mongo database are handled with Express.

---
## To Install
* Git Clone the repository
* Navigate to the folder where the repository exists using Git Bash or Terminal.
* Run the command `npm install` to download the required dependencies.
* Have a Mongo database ready to be created on your computer.
* Then run the command `node .\server.js` to start a local host server.

### Languages & Programs Used
* HTML & CSS
* Bootstrap 4
* Handlebars
* JavaScript & jQuery
* NodeJS
* Express
* MongoDB

### Required Node packages and other sources
* axios
* body-parser
* cheerio
* express
* express-handlebars
* mongoose
* morgan
