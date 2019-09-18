# Visual Twitter

A simple __Node.js__ app to search most recent images on Twitter.

## Implementation details

* __Regular expression__ to parse the HTML code from Twitter page and get the images with the specific links to the twit.
* [Scraper API](https://www.scraperapi.com/) was used as a demo to help scraping the web content.
* [Cloud Image](https://www.cloudimage.io/) was used as a demo for resizing and CDN delivery of the images.

## How to use source code

1. Modify __index.js__ file by updating the __SCRAPER_API_KEY__ and __CLOUD_IMG_TOKEN__ variables with your API keys.

2. Restore dependencies
```sh 
npm i
```
3. Run application
```sh 
node index.js
```
4. Open __localhost:3000__ on your browser and search some specific text.

5. Based on the text searched, the most recent images on Twitter will be shown (cropped 300x300).

6. Click on an image to go to that specific twit.
