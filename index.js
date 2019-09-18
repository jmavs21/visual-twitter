const CLOUD_IMG_TOKEN = '';
const SCRAPER_API_KEY = '';

const requestPromise = require('request-promise');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port ${port}...`) });

const form = `
    <style>
        .div_css
        {
            font-family:    Helvetica Neue;
            color:          DodgerBlue;
            text-align:     center;
        }
    </style>
    <div class="div_css">
        <h1>Visual Twitter<h1>
        <form action="/search" method="GET">
            <input type="text" name="q" required />
            <input type="submit" value="Search Images" />
        </form>
    </div>`;

app.get('/', (req, res) => {
    res.send(form);
});

app.get('/search', (req, res) => {
    const url = `http://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&url=https://twitter.com/search?f=tweets&vertical=default&q=${req.query.q}&src=typd`;
    requestPromise(url)
        .then(function (htmlString) {
            const imgs = form + parseImages(htmlString);
            res.send(imgs);
        })
        .catch(function (err) {
            res.status(400).send('Bad request promise.');
        });
});

const regex = /data-permalink-path="(.*?)".*?data-image-url="https:\/\/pbs\.twimg\.com\/media\/(.*?\.(?:png|jpg))"/gs;

function parseImages(htmlString) {
    let imgs = '';
    let results = htmlString.matchAll(regex);
    for (let result of results) {
        const cloudimage = `https://${CLOUD_IMG_TOKEN}.cloudimg.io/crop/300x300/x/` + `pbs.twimg.com/media/${result[2]}`;
        imgs += `<a href="https://twitter.com${result[1]}"><img src="${cloudimage}"></a>`;
    }
    return imgs;
}