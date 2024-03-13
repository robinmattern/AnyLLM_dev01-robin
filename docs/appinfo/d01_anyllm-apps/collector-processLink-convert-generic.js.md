
puppeteer.cjs
---------------------
[ 23] class PuppeteerWebBaseLoader extends base_js_1.BaseDocumentLoader {

[ 24]   constructor( webPath, options ) {
[ 25]     super()
[ 31]     }

[ 40]   static async _scrape( url, options ) {
[ 41]     const { launch } = await PuppeteerWebBaseLoader.imports( );  // -> [120]
[ 42]     const browser    = await launch( { headless: true, defaultViewport: null
[ 45]                                      , ignoreDefaultArgs: ["--disable-extensions"]
[ 46]                                      , ...options?.launchOptions
[ 47]                                        } );
[ 48]     const page       = await browser.newPage()
[ 49]     await page.goto(url, { timeout: 180000, waitUntil: "domcontentloaded", ...options?.gotoOptions, } );
[ 50]     const bodyHTML   = options?.evaluate
[ 51]                ? await options?.evaluate(page, browser)
[ 52]                : await page.evaluate(() => document.body.innerHTML);
[ 57]     await browser.close();
[ 58]    return bodyHTML;
[ 59]     }

[ 65]   async scrape() {
[ 66]     return PuppeteerWebBaseLoader._scrape( this.webPath, this.options );
[ 67]     }

[ 73]   async load() {
[ 74]     const text = await this.scrape();
[ 75]     const metadata = { source: this.webPath };
[ 76]     return [new document_js_1.Document({ pageContent: text, metadata })];
[ 77]     }

[ 87]   static async _screenshot( url, options ) {
[ 88]     const { launch } = await PuppeteerWebBaseLoader.imports();
[ 89]     const browser    = await launch( { headless: true, defaultViewport: null
[ 92]                                      , ignoreDefaultArgs: ["--disable-extensions"]
[ 93]                                      , ...options?.launchOptions,
[ 94]                                        } );
[ 95]     const page       = await browser.newPage();
[ 96]     await page.goto( url, { timeout: 180000, waitUntil: "domcontentloaded", ...options?.gotoOptions, } );
[101]     const screenshot = await page.screenshot();
[102]     const base64     = screenshot.toString("base64");
[103]     const metadata   = { source: url };
[104]    return new document_js_1.Document( { pageContent: base64, metadata } );
[105]     }

[112]   async screenshot() {
[113]        return PuppeteerWebBaseLoader._screenshot(this.webPath, this.options);
[114]     }

[120]   static async imports() {
[121]        try {
[122]            const { launch } = await import( "puppeteer" );
[128]        } catch(e) { throw new Error( "Please install puppeteer as a dependency with, e.g. `yarn add puppeteer`"); }
[130]     }
[131]   }
[132] exports.PuppeteerWebBaseLoader = PuppeteerWebBaseLoader;


`   # options:`
        {
          launchOptions: {
            headless: "new",
          },
          gotoOptions: {
            waitUntil: "domcontentloaded",
          },
          evaluate: async evaluate(page, browser) {
            const result = await page.evaluate(() => document.body.innerText);
            await browser.close();
            return result;
          },
}



