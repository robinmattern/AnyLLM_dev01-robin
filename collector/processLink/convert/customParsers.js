    const   cheerio     =  require( 'cheerio' );                                           // .(40309.05.1 RAM Use Cheerio)
//  const { cheerio }   =  require( 'langchain/document_loaders/web/cheerio' );
//  const   cheerio     =  require( 'langchain/document_loaders/web/cheerio' );
//  const { CheerioWebBaseLoader } = require( 'langchain/document_loaders/web/cheerio' );
    const   fs          =  require( 'fs' );
    const   inspect     =  require( 'util' ).inspect

// ----------------------------------------------------------------------------------

//  async function scrapeProducts( aHTML, nCnt ) {                                         //#.(40310.06.3).(40310.03.4 RAM Add nCnt).(40302.02.1 RAM Beg Add looper)
          function scrapeProducts( aHTML, nCnt ) {                                         // .(40310.06.3).(40310.03.4 RAM Add nCnt).(40302.02.1 RAM Beg Add looper)
    var aProductDelimiter = `<div class="a-section a-spacing-small a-spacing-top-small">`
    var aProductsEnd      = 'a-grid-vertical-align'
    var aHTML   =  aHTML.split( new RegExp( aProductsEnd      ) ).slice( 0, 1 )[0]         // .(40310.06.12 RAM Remove junk after products)
    var mHTMLs  =  aHTML.split( new RegExp( aProductDelimiter ) ).slice( 1 )               // .(40310.02.2 RAM Start from position 1, remove position 0)
    var aPaged  =  mHTMLs[0].match( /[0-9-]+ of over [0-9,]+/ ); if ( aPaged && aPaged[0] ) { console.log( `-- found: ${aPaged[0]}` ) }
        mHTMLs  =  mHTMLs[0].match( /sg-col-0-of-20/ )  ?  mHTMLs.slice( 1 ) : mHTMLs      // .(40310.02.2 RAM Remove "<span>1-24 of over 8,000 results")
        mHTMLs  =  nCnt   ?   mHTMLs.slice( 0, nCnt )   :  mHTMLs // .slice( 0, -1 )       // .(40310.03.5 RAM Get first nCnt rows)
//  var mResult =  mHTMLs.map( async ( htmlString, i ) => {                                //#.(40310.06.4)
//      return    await scrapeProductInfo( aProductDelimiter + htmlString, i )             //#.(40310.06.5)
    var mResult =  mHTMLs.map(       ( htmlString, i ) => {                                // .(40310.06.4 RAM No need to be async)
        return          scrapeProductInfo( aProductDelimiter + htmlString, i )             // .(40310.06.5)
                   } )
//eturn mResult.join( "," )                                                                //#.(40310.06.10)
    var aResult = `[${ mResult.join( "\n," ) }\n ]`                                        // .(40310.06.10 RAM Return JSON String)
 //     console.log( inspect( JSON.parse( aResult ), { depth: 99 } ) )                     // .(40310.06.11 RAM JSON.parse( JSON String ) )
//      console.dir( aResult )                                                             // .(40310.06.11)
return  aResult                                                                            // .(40310.06.12)
        }                                                                                  // .(40310.02.3 RAM End)
// ---------------------------------------------------------------------

//  async function scrapeProductInfo( htmlString, i ) {                                    //#.(40310.06.6).(40309.05.2 RAM Beg Write function)
          function scrapeProductInfo( htmlString, i ) {                                    // .(40310.06.6).(40309.05.2 RAM Beg Write function)

//  const loader = new CheerioWebBaseLoader( aURLstring )

  try {
//  const $ = await loader.load( htmlString )
    const $ =      cheerio.load( htmlString );  // Load HTML content                       // .(40309.05.3 RAM Using Cheerio)

    // Extract product details
//  const title         =  $('.product-title'      ).text().trim();
//  const lumens        =  $('.lumens-spec'        ).text().trim();
//  const portability   =  $('.portability-info'   ).text().trim();
//  const resolution    =  $('.resolution-spec'    ).text().trim();
//  const compatibility =  $('.compatibility-list' ).text().trim();

//  const productInfo   = {
      var title         =  $('.a-size-medium').text().trim()
      var price         =  $('.a-offscreen').first().text().trim().slice(1)
      var discPrice     =  $('.a-offscreen').last().text().trim().slice(1)
      var rating        =  $('.a-icon-star-small .a-icon-alt').text().trim()
      var reviewCnt     =  $('.a-link-normal span.a-size-base').text().replace( /[^0-9.]+/g, "" ) // was .text()
      var primeDelivery =  $('.a-icon-prime').length > 0
      var twoDayDeliv   =  $('.a-color-base:contains("Two-Day")').length > 0
      var freeDelivDay  =  $('.a-color-base.a-text-bold').text().trim()
      var carbDelivery  =  $('.puis-sponsored-label-text .a-size-base').text().trim()
//    };

    // Extract price (using specific structure)
//  const priceElement  =  $('.a-price');
//  const priceText     =  priceElement.find('.a-offscreen').text().trim();     // Get text from hidden span
//  const price         =  priceText ? parseFloat( priceText.slice(1) ) : null; // Remove leading '$' and convert to number

    // Extract description aka title
//  const descriptionElement = $('.a-size-medium.a-color-base.a-text-normal');
//    var description   =  descriptionElement ? descriptionElement.text().trim() : null;
      var description   =  title.replace( /\n +/, " ")
      var title         =  title.replace( /[,-;] .+/s, "" )

    // Extract rating (assuming it's out of 5 stars)
//  const ratingElement =  $('.rating-stars');
//  const rating        =  ratingElement.data('rating') ? parseFloat(ratingElement.data('rating')) : null;
//  const reviews       =  $('.review-count').text().trim();

    // Extract image URLS)
//  const imageElement  =  $('img').slice(-1);
//  const primaryUrl    =  imageElement.attr( 'src' );
//    var srcsetUrls    =  imageElement.attr( 'srcset' ) ? imageElement.attr( 'srcset' ).split( /,\s*/g ) : [];
//                       if ($('img') && $('img').slice(-1)[0].attribs[ 'srcset']) {                                        //#.(40310.07.1 RAM)
      var      pImg     =    $('img') ? $('img').slice(-1)[0] : null; if (pImg) {                                           // .(40310.07.1 RAM)                                                                                               // .(40310.07.1 RAM Why not?)
      var srcsetURLs    =  pImg.attribs[ 'srcset' ] ? pImg.attribs[ 'srcset' ].split( /,\s*/g ) : [ pImg.attribs[ 'src' ] ] // .(40310.07.1 RAM)
          srcsetURLs    =  srcsetURLs.map( url => url.trim().split( / +/ ) )  // Extract only the first part (URL)
                 } else {  srcsetURLs = [['','' ]] }                                                                        // .(40310.07.1 RAM)
    // Collect hrefs from anchor tags
      var hrefs         =  $('a').map( (_, element ) => $(element).attr('href') ).get( );
//  const uniqueHrefs   =  new Set(hrefs);         // Remove duplicates using Set
//        hrefs         =  Array.from( uniqueHrefs );    // Convert Set back to an array
//        hrefs         =  Array.from( new Set(hrefs) ); // Remove duplicates using Set and convert Set back to an array
          hrefs         =  new Set(hrefs.map( a => "https://amazon.com" + a.replace (/\/ref.+/, "") ).filter( a => a.length > 30))

    const pResult =
           { title      : title.length > 96 ? `${title.substr(0, 96)} ...` : title
           , price
           , discPrice
           , description
//         , lumens
//         , portability
//         , resolution
//         , compatibility
           , rating
           , reviewCnt
           , primaryURL : (Array.from(hrefs))[0]
           , productURLs:  hrefs
           , imageURL   :  srcsetURLs.slice(-1)[0][0]
           , imageURLs  :  srcsetURLs
             };

//        console.log( pResult )
          console.log( `${i+1}`.padStart(4) + `) ${pResult.title}, $${pResult.price}` )   // .(40309.05.4 )

   return JSON.stringify( pResult )                                                       // .(40310.06.9 RAM Return text )

  } catch( error ) {
          console.error( 'Error scraping product info:', error );
          }
    } // eof scrapeProductInfo                                                            // .(40309.05.2 RAM End)
// ---------------------------------------------------------------------

async function defaultParser( htmlString ) {                                              // .(40309.05.5 RAM Beg Not used)

    const $ = cheerio.load( htmlString );
    return $('.body').text()

    } // eof defaultParser                                                                // .(40309.05.5 RAM End)
// ---------------------------------------------------------------------
// ----------------------------------------------------------------------------------

    const CustomParsers =                                                                 // .(40309.05.6 RAM Beg)
           { AmazonListParser: scrapeProducts
           , DefaultParser: defaultParser
             }

    module.exports = CustomParsers                                                       // .(40309.05.6 RAM End Export one of many Custom Parsers)

// ----------------------------------------------------------------------------------
// cd ./collecor/processLink/convert; node customParsers.js "../Amazon/Product-List-item.html"

  var aHTMLfile = process.argv[2]                                                       // .(40309.05.7 RAM Beg Test HTML files if an arg)
//var aHTMLfile = './collector/processLink/Amazon/Product-List-item.html'               // .(40309.05.8 RAM     or if defined)

  if (aHTMLfile) {
      aHTML = fs.readFileSync( aHTMLfile, 'ASCII' )
      CustomParsers[ 'AmazonListParser' ]( aHTML, 10 )
      }                                                                                 // .(40309.05.7 RAM End)
// ----------------------------------------------------------------------------------


