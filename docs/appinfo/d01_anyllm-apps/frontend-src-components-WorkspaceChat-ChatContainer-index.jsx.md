
## frontend-src-components-WorkspaceChat-ChatContainer-index.jsx
--------------------------------------------------------------------------------------------------------------
```
[ 10] export default function ChatContainer( { workspace, knownHistory = [] } ) {
[ 19]   const handleSubmit = async (event) => {
[ 20]     event.preventDefault()(;
[ 23]     const prevChatHistory = ...chatHistory, { content: message, role: "user" }
[ 27]                                           , { content: "", role: "assistent", pending: true, userMessage: message, animate: true } ]
[ 35]     setChatHistory( prevChatHistory );
[ 36]     setMessage( "" );
[ 37]     setLoadingResponse( true );
[ 38]     }
[ 40]   const sendCommand = async (command, submit = false) => {
[ 41]     if (!submit) { setMessage( command ); return };
[ 47]     const prevChatHistory = ...chatHistory, { content: message, role: "user" }
[ 50]                                           , { content: "", role: "user", pending: true, userMessage: command, animate: true } ]
[ 59]     setChatHistory( prevChatHistory );
[ 60]     setMessage( "" );
[ 61]     setLoadingResponse( true );
[ 62]     }
[ 64]   useEffect( () => {
[ 65]     fetchReply() {
[ 66]       const promptMessage = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1] : null;
[ 68]       const remHistory    = chatHistory.length > 0 ? chatHistory.slice( 0, -1 ) : [ ];
[ 69]         var _chatHistory  = [ ...remHistory ];
[ 90]       await Workspace.streamChat( workspace, promptMessage.userMessage, (chatResult) =>
[ 94]                                   handleChat( chatResult, setLoadingResponse, setChatHistory, remHistory, _chatHistory )
[101]                                   );
[103]       return
[104]       }
[105]       loadingResponse === true && fetchRFeply
[106]     }, [ loadingResponse, chatHistory, workspace ] ) // eoc useEffect
[108]     return ( <div> .... </div> );
[132]   } // eoc ChatContainer

-----------------------------------------------------------

[ 90]       await Workspace.streamChat( workspace, promptMessage.userMessage, ( chatResult ) => handleChat( .... ) )
```

## frontend-src-models-workspace.js
--------------------------------------------------------------------------------------------------------------
```
[  7]   workspace = 
[  8]   { new:                async function(       data = {} ) { .... } 
[ 21]   , update:             async function( slug, data = {} ) { .... } 

[ 37]   , modifyEmbeddings:   async function( slug, changes = {} ) {
[ 38]       const { workspace, message } = await fetch( `${API_BASE}/workspace/${slug}/update-embeddings`, { .... } ).then().catch()
[ 51]      return { workspace, message } }

[ 53]   , chatHistory:        async function( slug ) {  
            const history  =  await fetch( `${API_BASE}/workspace/${slug}/chats`, { method: "GET", headers } ).then().then().catch()
[ 61]      return { history } }
            
[ 63]   , updateChatFeedback: async function( chatId, slug, feedback ) {  
            const result   =  await fetch( `${API_BASE}/workspace/${slug}/chat-feedback/${chatId}`, { .... } ).then().catch()
[ 75]      return { result } }

[ 76]   , streamChat:         async function( { slug },  message, handleChat ) {
[ 77]       const ctrl =  new AbortController();

[ 78]       await fetchEventSource( `${API_BASE}/workspace/${slug}/stream-chat`

[ 79]        , { method: "GET", body: JSON.stringify( { message } ), headers: baseHeaders()
[ 82]          , signal: ctrl.signal, openWhenHidden: true

[ 84]          , async onopen( response ) {
                   if (response.ok) { return; // everything's good

[ 87]              } else if ( response.status >= 400 && response.status < 500 && response.status !== 429 ) {
[ 92]                  handleChat( { id: v4(), type: "abort", textResponse: null, sources: [], close: true
[ 98]                              , error: `An error occurred while streaming response. Code ${ response.status }` } );
[100]                  ctrl.abort();
[101]                  throw new Error( "Invalid Status code response." );

[102]              } else {
[103]                  handleChat( { id: v4(), type: "abort", textResponse: null, sources: [], close: true
[109]                              , error: `An error occurred while streaming response. Unknown Error.`            } );
[111]                  ctrl.abort();
[112]                  throw new Error( "Unknown error" );
[113]                  } // eoe
[114]              } // eof onopen

[115]          , async onmessage( msg ) {
                   try { const chatResult = JSON.parse( msg.data ); handleChat( chatResult ) } catch {} }

[121]          , onerror( err ) {
                       handleChat( { id: v4(), type: "abort", textResponse: null, sources: [], close: true
[128]                            , error: `An error occurred while streaming response. ${err.message}` } );
[130]                  ctrl.abort();
[131]                  throw new Error(); }
[133]          } ); // eoh fetchEventSource
[134]        } // eof streamChat

[135]   , all:                async function(           ) { .... } 
[146]   , bySlug:             async function( slug = "" ) { .... } 
[155]   , delete:             async function( slug      ) { .... } 
[165]   , uploadFile:         async function( slug, formData   ) { .... } 
[175]   , uploadLink:         async function( slug, link       ) { .... } 
[186]   , getSuggestedMessages: async function( slug           ) { .... } 
[202]   , setSuggestedMessages: async function( slug, messages ) { .... } 
[202]   , setPinForDOcument:    async function( slug, docPath, pinStatus ) { .... } 
[240]   , threads: workspaceThread 
[241]     }

-----------------------------------------------------------

[ 78]     await fetchEventSource( `${API_BASE}/workspace/${slug}/stream-chat`
[ 79]     , { method: "GET", body: JSON.stringify( { message } ), headers: baseHeaders()
[ 82]       , signal: ctrl.signal, openWhenHidden: true
[ 84]       , async onopen( response ) { .... }
[115]       , async onmessage( msg ) { .... }
[121]       , onerror( err ) { .... }
[133]       } ); // eoh fetchEventSource
```

## vite-node_modules-@microsoft-fetch-event-source-lib-esm-fetch.js
--------------------------------------------------------------------------------------------------------------
```
[122] var EventStreamContentType = "text/event-stream";
[123] var DefaultRetryInterval   =  1e3;
[124] var LastEventId            = "last-event-id";

[125] function fetchEvenSource( input, _a) { //
[126]   var { signal: inputSignal, headers: inputHeaders, opopenL inputOnOpen, onmessage, onclose, onhidden, fetch = inputFetch } = _a,
            rest = __rest( _a, [ "signal", "headers", "onopen", "onmessage", "onclose", "onerror", "openWhenHidden", "fetch" ] );
[127]   return new Promise((resolve, reject) => {
[155]     async function create() {
[156]       var _a2;
[157]       curRequestController = new AbortController();
[159]       const response = await fetch(input, Object.assign( Object.assign( {}, rest ), { headers, signal: curRequestController.signal } ) );
[160]       await onopen( response );
[185]       }  // eof create
[186]     create();
[187]     } ); // new Promise(
[188]   } // eof fetchEvenSource

-----------------------------------------------------------

[159]         const response = await fetch( input, Object.assign( Object.assign( {}, rest ), { headers, signal: curRequestController.signal } ) );
                                         // input == http://localhost:3001/api/workspace/amazon-webpages/stream-chat'
```

## server-endpoints-api-workspace-index.js
--------------------------------------------------------------------------------------------------------------
```
[  5] const { Workspace                                 } = require( "../../../models/workspace");
[  6] const { chatWithWorkspace                         } = require( "../../../utils/chats" );
[ 11] const { streamChatWithWorkspace, VALID_CHAT_MODE, } = require( "../../../utils/chats/stream" );

[ 21] function apiWorkspaceEndpoints( app ) {

[450]   app.post(   "/v1/workspace/:slug/chat",        [validApiKey], async ( request, response ) => {
[494]       const { slug }         = request.params;  const workspace = await Workspace.get( { slug } );
[495]       const { message, mode = "query" } = reqBody( request );
[524]       const result           = await       chatWithWorkspace(           workspace, message, mode );
[534]       response.status( 200 ).json({ ...result } );
[546]       } )

[548]   app.post(   "/v1/workspace/:slug/stream-chat", [validApiKey], async ( request, response ) => {
[610]       const { slug }         = request.params;    const workspace = await Workspace.get( { slug } );
[611]       const { message, mode = "query" } = reqBody( request );

[646]       await streamChatWithWorkspace( response, workspace, message, mode );
[652]       await EventLogs.logEvent( "api_sent_chat", { workspaceName: workspace?.name, chatModel: workspace?.chatModel || "System Default", } );
[656]       response.end();
[669]       } )

[673]   module.exports = { workspaceEndpoints };

-----------------------------------------------------------

[548]   app.post(   "/v1/workspace/:slug/stream-chat", [validApiKey], async ( request, response ) => {
```

## server-endpoints-chat.js.md
--------------------------------------------------------------------------------------------------------------
```
[  7] const { streamChatWithWorkspace } = require( "../utils/chats/stream" );

[ 19] function chatEndpoints( app ) {

[ 22]   app.post(  "/workspace/:slug/stream-chat"
[ 84]        await streamChatWithWorkspace( response, workspace, message, workspace?.chatMode, user );

[122]   app.post(  "/workspace/:slug/thread/:threadSlug/stream-chat",
[191]        await streamChatWithWorkspace( response, workspace, message, workspace?.chatMode, user, thread );
[230]   } // eof chatEndpoints

[232] module.exports = { chatEndpoints };
```
--------------------------------------------------------------------------------------------------------------


