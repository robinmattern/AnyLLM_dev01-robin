// getAPI.mjs

var ANYLLM_API_KEY = "FP1VRGD-5R9M00Q-GYETX1F-5HV8S27"
var bQuiet = false 
 
// --------------------------------------------------------------

  async function getAPI( aURL, aMethod, pData, aAPI_KEY ) {
        aMethod   =  aMethod  ? aMethod  : 'GET'
    if (typeof(aMethod) == 'object') { 
        aAPI_KEY  =  pData
        pData     =  aMethod
        aMethod   = 'POST' 
        }    
try {
    if (!bQuiet) {   
        console.log(  `  Request:  ${aMethod.toUpperCase()} ${aURL}` );
        }
    var pResponse =  await submitAPI( aURL, aMethod, pData, aAPI_KEY );
//  var aText     =  await getReadableStream( pResponse )
    var pJSON     =  await pResponse.json() 

    if (!bQuiet) {   
        console.log(  `  Response: Status ${pResponse.status}` );
//      console.log(                aText ) 
        console.dir(                pJSON, { depth: 99 } ) 
        }
    } catch ( pError ) {
        console.error(`* Error:  ${pError.message}` );
        } 
 return pJSON
        }
// --------------------------------------------------------------

async function submitAPI( aURL, aMethod, pData, aAPI_KEY ) {

    aAPI_KEY  =  aAPI_KEY ? aAPI_KEY : ANYLLM_API_KEY
    aMethod   =  aMethod  ? aMethod  : 'GET'

var pOptions  =      // Define request options
     {  method:  aMethod.toUpperCase()
     ,  headers: 
         { 'Content-Type':  'application/json'
         , 'Authorization': `Bearer ${aAPI_KEY}`     
            }
        };

if (pData && aMethod.match( /POST|PUT/ )) { 
    pOptions.body = JSON.stringify( pData )
    }

var pResponse =  await fetch( aURL, pOptions );  

if (!pResponse.ok) {                           
    throw new Error( `* API request failed with ${pResponse.status}: ${pResponse.statusText}` );
    }

return pResponse;
    }
// --------------------------------------------------------------

// Handle ReadableStream response
async function getReadableStream( response ) {
if (response.body.readable) {
    const reader = response.body.getReader();
    let chunks = [];

    // Read data chunks in a loop
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    // Combine chunks (if needed)
    const responseData = new Blob(chunks); // Combine chunks into a Blob
    // You can further process responseData based on your data format (e.g., parse JSON)
    return responseData;
  } else {
    // Handle normal response (text/json)
    return await response.text(); // Or use response.json() for JSON data
    }
  }
// --------------------------------------------------------------

function setAPIoptions( pOptions ) {
         bQuiet = pOptions.bQuiet ? pOptions.bQuiet : bQuiet 
         }
// --------------------------------------------------------------

var APIfns = { getAPI, setAPIoptions }    
//  module.exports = getAPI;
    export default APIfns;
//  export default getAPI;
