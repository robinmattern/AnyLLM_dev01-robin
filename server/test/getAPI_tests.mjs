 // import { getAPI, setAPIoptions  } from './getAPI.mjs';
    import   APIfns    from './getAPI.mjs'; var getAPI = APIfns.getAPI 
    import { inspect } from 'util'
    import   fs        from 'fs'

//  import { fetchEventSource } from "/node_modules/.vite/deps/@microsoft_fetch-event-source.js?v=5b3a0612";
//  import { handleChat       } from "./server/chat/handleChat.js";

    var aTests    = "12"
    if (process.argv[2] > "") { aTests = process.argv[2] }
    var aTests    = `,${aTests || ''},`; // console.log( `  aTests: ${aTests}` )
    var aHost     = 'http://localhost:3001'
    var aWrksp    = 'workspace2'

    var ANYLLM_API_KEY = "FP1VRGD-5R9M00Q-GYETX1F-5HV8S27"
    var OPENAI_API_KEY = "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"

    if (aTests == ",,") { help(); process.exit() }

//  Test No. 1: Get Workspaces
//  --------------------------------------------------------------
if (aTests.match( /,1,/ )) {
        help_msg( `\n  Test 1:   ${aHost}/api/workspaces` )

    var aURL      = `${aHost}/api/workspaces`;
    var pResponse =  await getAPI( aURL )
//      console.log( pResponse || {} )
        } // eof Test 1
//  --- ------------------------------------------------

//  Test No. 2: Get Workspaces with API_KEY
//  --------------------------------------------------------------
if (aTests.match( /,2,/ )) {
        help_msg( `\n  Test 2:   ${aHost}/api/v1/workspaces` )

    var aURL      = `${aHost}/api/v1/workspaces`;
    var pResponse =  await getAPI( aURL )
//      console.log( pResponse || {} )
        } // eof Test 2
//  --- ------------------------------------------------

//  Test No. 3: Get Workspace {slug}
//  --------------------------------------------------------------
if (aTests.match( /,3,/ )) {
        help_msg( `\n  Test 3:   ${aHost}/api/v1/workspace/:slug` )

    var aURL      = `${aHost}/api/v1/workspace/:slug`.replace( /:slug/, aWrksp );
    var pResponse =  await getAPI( aURL )
//      console.log( pResponse || {} )
        } // eof Test 3
//  --- ------------------------------------------------

//  Test No. 4: Upload File
//  --------------------------------------------------------------
if (aTests.match( /,4,/ )) {
        help_msg( `\n  Test 4:   ${aHost}/api/v1/upload` )

    var aURL      = `${aHost}/api/v1/upload`;
    var pData     = { }
    var pResponse =  await getAPI( aURL )
//      console.log( pResponse || {} )
        } // eof Test 4
//  --- ------------------------------------------------

//  Test No. 5: Get Web Upload Link
//  --------------------------------------------------------------
if (aTests.match( /,5,/ )) {
        help_msg( `\n  Test 5:   ${aHost}/api/v1/document/upload-link` )

    var aURL      = `${aHost}/api/v1/document/upload-link`;
//  var pData     =  { link: "https://www.amazon.com/s?k=projector+4k&i=instant-video&crid=2VOPM9RTZWLEE&sprefix=projector+4k%2Cinstant-video%2C74&ref=nb_sb_noss_2" }
    var pData     =  { link: "https://www.amazon.com/s?k=projector+4k&i=instant-video ~~ AmazonListParser" }

    var pResponse =  await getAPI( aURL, pData )
//      console.log( pResponse || {} )
    var aCreated  =  pResponse.documents[0].published
    var aLocation =  pResponse.documents[0].location.replace( /[\\\/]/g, '/' )
    var aFileName =  aLocation.split( '/' ).slice(-1)[0] 
        console.log( `  Created: ${aCreated}, FileName: ${aFileName}` )
        } // eof Test 5
//  --- ------------------------------------------------

//  Test No. 6: Get Documents
//  --------------------------------------------------------------
if (aTests.match( /,6,/ )) {
        help_msg( `\n  Test 6:   ${aHost}/api/v1/documents/` )
        APIfns.setAPIoptions( { bQuiet: true } )

    var aURL      = `${aHost}/api/v1/documents`;
    var pResponse =  await getAPI( aURL )
        console.log( inspect( pResponse || {}, { depth: 99 } ) )
        } // eof Test 6
//  --- ------------------------------------------------

//  Test No. 7: Get Document
//  --------------------------------------------------------------
if (aTests.match( /,7,/ )) {
        help_msg( `\n  Test 7:   ${aHost}/api/v1/document/` )

//  var aDocName  = `url-www_amazon.com-s-f49b5be1-b23d-410d-964a-0b3de47772d6.json`
    var aDocName  = `url-www_amazon.com-s-9860d2dc-a78a-4921-b886-dea3c4e91aa4.json`  // '3/11/2024, 3:18:00 AM',
    var aURL      = `${aHost}/api/v1/document/{docname}`.replace( /{docname}/, aDocName );
    var pResponse =  await getAPI( aURL )

    var aPath     = `./server/storage/documents/custom-documents/${aDocName}`
    var aPath     = `./storage/documents/custom-documents/${aDocName}`

    var aContents =  fs.readFileSync( aPath, 'ASCII' )
    try { 
    var pJSON     =  JSON.parse( aContents )   
    var mProducts =  JSON.parse( pJSON.pageContent )
        mProducts.forEach( pProduct => { delete pProduct.productURLs; delete pProduct.imageURLs } )
        console.log( inspect( mProducts, { depth: 99 } ) )
    } catch ( pErr ) {
        console.log( "* ERROR:", pErr )
        }
//      console.log( pResponse || {} )
        } // eof Test 7
//  --- ------------------------------------------------

//  Test No. 8: Change Embeddings
//  --------------------------------------------------------------
if (aTests.match( /,8,/ )) {
        help_msg( `\n  Test 8:   ${aHost}/api/workspace/:slug/update-embeddings/` )

    var aDocName1 = `url-www_amazon.com-s-f49b5be1-b23d-410d-964a-0b3de47772d6.json`
    var aDocName2 = `ai210412_RAG-for-NLP-Tasks-(2005.11401).pdf-20f2fbf4-f012-4874-b305-5e3e9a81373e.json`
    var aDocName3 = `ai240105_RAG-for-LLMs-(2312.10997).pdf-2e08b9c0-db76-4e12-a09a-b97790d3551f.json`
    var aDocName4 = `url-www_amazon.com-s-4fb63e73-5355-4cc3-8dff-ba96c80c95db.json`

    var aURL      = `${aHost}/api/workspace/:slug/update-embeddings`.replace( /:slug/, aWrksp );
//                   http://localhost:3001/api/workspace/workspace2/update-embeddings
    var pChanges  ={ adds: [    
//                     `custom-documents/${aDocName1}`, 
//                     `custom-documents/${aDocName2}`,
//                     `custom-documents/${aDocName3}`, 
                       `custom-documents/${aDocName4}`, 
                        ],
                     deletes: [ 
//                     `custom-documents/${aDocName1}`, 
                        ],
                     }
//  var pHeaders  = { }

    var pResponse =  await getAPI( aURL, pChanges )
//      console.log( pResponse || {} )

// library.js[26]    prisma:info Starting a sqlite pool with 33 connections.
// index.js[157]     Adding new vectorized document into namespace workspace2
// index.js[190]     Chunks created from document: 139
// index.js[235]     addDocumentToNamespace No OpenAI API key was set.
// documents.js[ 97] Failed to vectorize ai240105_RAG for LLMs (2312.10997).pdf
//                   [Event Logged] - workspace_documents_added

// index.js[226]     Inserting vectorized chunks into LanceDB collection.
// index.js[106]     Caching vectorized results of custom-documents/ai240105_RAG-for-LLMs-(2312.10997).pdf-2e08b9c0-db76-4e12-a09a-b97790d3551f.json to prevent duplicated embedding.
//                   [Event Logged] - workspace_documents_added
        } // eof Test 8
//  --- ------------------------------------------------

//  Test No. 9: Set AI Platform Key
//  --------------------------------------------------------------
if (aTests.match( /,9,/ )) {
        help_msg( `\n  Test 9:   ${aHost}/api/system/update-env/` )

    var aURL      = `${aHost}/api/system/update-env`;
    var pData     =
         { "EmbeddingEngine"   : "openai"
         , "OpenAiKey"         :  OPENAI_API_KEY
         , "EmbeddingModelPref": "text-embedding-3-small"
            }

    var pResponse =  await getAPI( aURL, pData )
//      console.log( pResponse || {} )
        } // eof Test 9
//  --- ------------------------------------------------

//  Test No. 10: List AI Platform Preferences
//  --------------------------------------------------------------
if (aTests.match( /,10,/ )) {
        help_msg( `\n  Test 10:  ${aHost}/api/admin/system-preferences/` )

    var aURL      = `${aHost}/api/admin/system-preferences`;
    var pResponse =  await getAPI( aURL, pData )
//      console.log( pResponse || {} )
    } // eof Test 10
//  --- ------------------------------------------------

//  Test No. 11: streamChat
//  --------------------------------------------------------------
if (aTests.match( /,11,/ )) {
    help_msg( `\n  Test 11:  ${aHost}/api/workspace/:slug/stream-chat`.replace( /:slug/, aWrksp ) )

    const baseHeaders = function( aToken ) { return { Authorization: aToken ? `Bearer ${ aToken }` : ANYLLM_API_KEY }; }
    const v4          = function( ) { return '985cfdcd-496d-4c6a-82b4-6a6dee09f36d' }

// ( chatResult ) => handleChat( chatResult, setLoadingResponse, setChatHistory, remHistory, _chatHistory )
               streamChat( aWrksp, "please summarize", )
async function streamChat( { slug }, message, handleChat ) { 
        const ctrl = new AbortController();
        await fetchEventSource( `${API_BASE}/workspace/${slug}/stream-chat`                                    

       , { method: "GET", body: JSON.stringify( { message } ), headers: baseHeaders()
          , signal: ctrl.signal, openWhenHidden: true

          , async onopen( response ) { if (response.ok) { return; // everything's good 

                                      } else if ( response.status >= 400 && response.status < 500 && response.status !== 429 ) {
                             handleChat( { id: v4(), type: "abort", textResponse: null, sources: [], close: true
                                         , error: `An error occurred while streaming response. Code ${ response.status }` } );
                             ctrl.abort();
                             throw new Error( "Invalid Status code response." );

                                      } else {
                             handleChat( { id: v4(), type: "abort", textResponse: null, sources: [], close: true
                                         , error: `An error occurred while streaming response. Unknown Error.`            } );
                             ctrl.abort();
                             throw new Error( "Unknown error" );
                                         } // else 
                                       } // eof onopen 

          , async onmessage( msg ) { try { const chatResult = JSON.parse( msg.data ); handleChat( chatResult ) } catch {} }
          , onerror( err ) { handleChat( { id: v4(), type: "abort", textResponse: null, sources: [], close: true
                                         , error: `An error occurred while streaming response. ${err.message}` } );
                             ctrl.abort();
                             throw new Error(); }
            } ); // eoh fetchEventSource
        } // eof streamChat
    } // eof Test 11
//  --- ------------------------------------------------

if (aTests.match( /,12,/ )) {
    help_msg( `\n  Test 12:  ${aHost}/api/workspace/:slug/stream-chat` )

         console.log( "    ", await submitMessage( aWrksp, "please summarize" ) )

async function submitMessage( aWrksp, message ) {
    const response = await fetch(`${aHost}/api/workspace/:slug/stream-chat`.replace( /:slug/, aWrksp ), {
      method: "POST",
      body: JSON.stringify( { message } ),
      headers: { Authorization: `Bearer ${ANYLLM_API_KEY}` }
    });
  
    if (!response.ok) {
      throw new Error(`Error submitting message: ${response.status}`);
    }
  
    const responseStream = await response.text(); // Read the entire response as text
  
    // Convert the response stream to a text response (implementation depends on your needs)
    const textResponse = parseResponseStream( responseStream );
  
    return textResponse;
  
  // This function (parseResponseStream) needs to be implemented based on your specific response format
  function parseResponseStream( stream ) {
    // Implement logic to parse the received stream data (JSON, plain text, etc.)
    // This might involve splitting on delimiters, JSON parsing, or other processing
    // based on the expected response format from the LLM processor.
    // ...
       var processedTextResponse = stream
    return processedTextResponse;
  } // eof parseResponseStream
} // submitMessage

} // eof Test 12
//  --- ------------------------------------------------


//  Test No. 0
//  --------------------------------------------------------------
if (aTests.match( /,0,/ )) {
        help_msg( `\n  Test 0:   ${aHost}/api.example.com/submit` )

    var aURL     = 'https://api.example.com/submit';
    var aMethod  = 'GET'
    var aAPI_KEY = 'YOUR_ACTUAL_API_KEY';

    var pData    =
         {  name: 'John Doe'
         ,  age:   30
         ,  details:
             {  city: 'New York'
             ,  occupation: 'Software Engineer'
                },
            };

    var pResponse =  await getAPI( aURL, aMethod, pData, aAPI_KEY ) || {}
//      console.log( pResponse )
    } // eof Test 1
//  --- ------------------------------------------------

function help_msg(aMsg) {
         console.log( aMsg )
         }

function help() {
         help_msg( `` )
         help_msg( `  Test 1:   /api/workspaces` )
         help_msg( `  Test 2:   /api/v1/workspaces` )
         help_msg( `  Test 3:   /api/v1/workspace/:slug` )
         help_msg( `  Test 4:   /api/v1/upload` )
         help_msg( `  Test 5:   /api/v1/document/upload-link` )
         help_msg( `  Test 6:   /api/v1/documents/` )
         help_msg( `  Test 7:   /api/v1/document/` )
         help_msg( `  Test 8:   /api/workspace/:slug/update-embeddings/` )
         help_msg( `  Test 9:   /api/system/update-env/` )
         help_msg( `  Test 10:  /api/admin/system-preferences/` )
         help_msg( `  Test 12:  /api/workspace/:slug/stream-chat/` )
         help_msg( `  Test 0:   /api.example.com/submit` )
         }

