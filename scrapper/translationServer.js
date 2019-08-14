const puppeteer = require('puppeteer');
const Express = require('express');

const app = new Express();

const PORT = 3002;

app.get("/translate", async (req, res) => {
        let urlFromText = encodeURI(req.query.text);
        
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


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))