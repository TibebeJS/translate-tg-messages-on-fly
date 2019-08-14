const puppeteer = require('puppeteer');
// const languages = require('./languages.json');
const Express = require('express');

const app = new Express();

app.get("/translate", async (req, res) => {
        let urlFromText = encodeURI(req.query.text);
    
        // req.query.from = Object.keys(languages)[Object.values(languages).indexOf(`${req.query.from}`)]; //getting the short form of the language
        // req.query.to = Object.keys(languages)[Object.values(languages).indexOf(`${req.query.to}`)];
    
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://translate.google.com/#view=home&op=translate&sl=${req.query.from}&tl=${req.query.to}&text=${urlFromText}`);
        let result = await page.evaluate(() => document.querySelector('.tlid-translation.translation').textContent);
        await browser.close();
        res.json({
            result,
            from : req.query.from,
            to: req.query.to
        });    
})


app.listen(3002, () => console.log("Server is listening on port 3002"))