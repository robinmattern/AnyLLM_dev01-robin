  const { v4 }                     = require( "uuid" );
  const { PuppeteerWebBaseLoader } = require( "langchain/document_loaders/web/puppeteer" );
  const { writeToServerDocuments } = require( "../../utils/files"     );
  const { tokenizeString         } = require( "../../utils/tokenizer" );
  const { default: slugify       } = require( "slugify" );

  const   customParsers            = require( "./customParsers.js"    )

//var aLink = 'https://www.amazon.com/s?k=projector+4k&i=electronics ~~ AmazonListParser(10)'
//var aLink = 'https://www.amazon.com/s?k=projector+4k&i=electronics ~~ AmazonListParser'
//var aLink = 'https://www.amazon.com/s?k=projector+4k&i=electronics'

  if (typeof(aLink) != 'undefined') {
      scrapeGenericUrl( aLink )
      }
// -------------------------------------------------------------------------

async function scrapeGenericUrl( link ) {
  console.log(`-- Working URL, "${link}" --`);

    if (link.match( /~~/ ) ) {                                   // .(40310.02.1 RAM Beg Remove parser if present)
    var parser = link.replace( /^.+~~/, '' ).trim()
    var link   = link.replace( /~~.+$/, '' ).trim()
        }                                                        // .(40310.02.1 RAM End)
  const content = await getPageContent( link, parser );          // .(40310.06.1 RAM Needs to be a string of words).(40310.02.2 RAM Added parser)

  if (!content.length) {
    console.error(`Resulting URL content was empty at ${link}.`);
    return {
      success: false,
      reason: `No URL content found at ${link}.`,
      documents: [],
    };
  }

  const url      =  new URL( link );
  const filename = (url.host + "-" + url.pathname).replace(".", "_");

  const data = {
    id           :  v4( ),
    url          : "file://" + slugify(filename) + ".html",
    title        :  slugify(filename) + ".html",
    docAuthor    : "no author found",
    description  : "No description found.",
    docSource    : "URL link uploaded by the user.",
    chunkSource  : `link://${link}`,
    published    :  new Date().toLocaleString(),
    wordCount    :  content.split(" ").length,
    pageContent  :  content,
    token_count_estimate: tokenizeString( content ).length,
    };

  const document =  writeToServerDocuments( data, `url-${slugify(filename)}-${data.id}` );
//      console.log(`[SUCCESS]: URL ${link} converted & ready for embedding.\n`);                             //#.(40310.05.1 RAM)
        console.log(`[SUCCESS]: URL, "${link}" converted ${ data.wordCount } words, ready for embedding.\n`);  // .(40310.05.1 RAM)
  return { success: true, reason: null, documents: [document] };
  }
// ------------------------------------------------------------------

async function getPageContent( link, parser ) {                                       // .(40310.02.3 RAM Added parser)
  try {

    let pageContents = [];
//  -------------------------------------------------------------------

const loader = new PuppeteerWebBaseLoader( link, {
        launchOptions:
         { headless: "new"
         , args: ['--no-sandbox', '--disable-setuid-sandbox' ]  // .(40309.01.1 RAM )
           },
        gotoOptions: {
          waitUntil: "domcontentloaded",
          },
        async evaluate( page, browser ) {
          if (parser) {                                                             // .(40310.02.4 RAM Beg)
          var aHTML  =  await page.evaluate( ( ) => document.body.innerHTML);       // .(40310.06.2 RAM Can be 800K+ bytes)
          var nCnt   = `${parser}(`.replace( /.+?[( ]/, "" ).replace( /[)(]+/, "" ) // .(40310.03.1 RAM Extract "(nCnt)")
              parser = `${parser}(`.replace( /[( ].*/, "" )                         // .(40310.03.2)
//        var result =  await customParsers[ parser ]( aHTML, nCnt )                //#.(40310.03.3 RAM Add nCnt).(40310.06.8)
          var result =      customParsers[ parser ]( aHTML, nCnt )                  // .(40310.03.3 RAM Add nCnt).(40310.06.8)
          } else {                                                                  // .(40310.02.4 RAM End)
          var result =  await page.evaluate( ( ) => document.body.innerText);
            }                                                                       // .(40310.02.5)
        await browser.close();
       return result;   // aka docs
          } // eof evaluate( page, browser ) { .. }
        } ); // eof PuppeteerWebBaseLoader
//  -------------------------------------------------------------------

    const docs = await loader.load();

    for (const doc of docs) {                     // striped of all HTML
      pageContents.push(doc.pageContent);
    }

    return pageContents.join(" ");
  } catch (error) {
    console.error("getPageContent failed!", error);
  }
//  return null;                                                                    //#.(40312.01.1)
    return [];                                                                      // .(40312.01.1 RAM Due to content.length above)
}

module.exports = {
  scrapeGenericUrl,
};
