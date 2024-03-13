## server-endpoints-api-workspace-index.js 
```
[ 21] function apiWorkspaceEndpoints(app) {

[ 24]   app.post(   "/v1/workspace/new",   [validApiKey], async (request, response) => {
[ 69]       const { name = null }  = reqBody(request);
[ 70]       const { workspace, message } = await Workspace.new( name) ;
[ 80]       response.status(200).json({ workspace, message });
[ 85]       } ) 
 
[ 87]   app.get(    "/v1/workspaces",      [validApiKey], async (request, response) => {
[121]       const workspaces       = await Workspace.where();
[122]       response.status(200).json({ workspaces });
[127]       } ) 

[129]   app.get(    "/v1/workspace/:slug", [validApiKey], async (request, response) => {
[169]       const { slug }         = request.params;    const workspace = await Workspace.get({ slug });
[171]       response.status(200).json({ workspace });
[176]       } ) 

[178]   app.delete( "/v1/workspace/:slug", [validApiKey], async (request, response) => {
[199]       const { slug = "" }    = request.params;    const workspace = await Workspace.get({ slug });
[201]       const workspaceId      =            Number( workspace.id );
[209]       await WorkspaceChats.delete(              { workspaceId: workspaceId });
[210]       await DocumentVectors.deleteForWorkspace(   workspaceId );
[211]       await Document.delete(                    { workspaceId: workspaceId });
[212]       await Workspace.delete(                   {          id: workspaceId });
[218]       await VectorDb["delete-namespace"](       { namespace: slug } );
[222]       response.sendStatus(200).end();
[228]       } ) 

[230]   app.post(   "/v1/workspace/:slug/update", [validApiKey], async (request, response) => {
[289]       const { slug = null }  = request.params;    const currWorkspace   = await Workspace.get({ slug });
[291]       const   data           = reqBody( request );
[298]       const { workspace, message } = await Workspace.update( currWorkspace.id, data );
[302]       response.status(200).json( { workspace, message } );
[308]       } ) 

[310]   app.get(    "/v1/workspace/:slug/chats",  [validApiKey], async (request, response) => {
[354]       const { slug }         = request.params;    const workspace       = await Workspace.get({ slug });
[362]       const history          = await WorkspaceChats.forWorkspace( workspace.id );
[363]       response.status(200).json({ history: convertToChatHistory(  history ) } );
[369]       } ) 

[371]   app.post(   "/v1/workspace/:slug/update-embeddings", [validApiKey], async (request, response) => {
[328]       const { slug = null }  = request.params;    const currWorkspace    = await Workspace.get({ slug });
[429]       const { adds = [], deletes = [] } = reqBody( request );
[437]       await Document.removeDocuments( currWorkspace, deletes);
[438]       await Document.addDocuments(    currWorkspace, adds);
[439]       const updatedWorkspace = await Workspace.get( `id = ${Number(currWorkspace.id)}`);
[442]       response.status(200).json(    { workspace: updatedWorkspace });
[448]       } ) 

[450]   app.post(   "/v1/workspace/:slug/chat", [validApiKey], async (request, response) => {
[494]       const { slug }         = request.params;    const { message, mode = "query" } = reqBody(request);
[495]       const workspace        = await Workspace.get({ slug });
[524]       const result           = await chatWithWorkspace(workspace, message, mode);
[534]       response.status(200).json({ ...result });
[546]       } ) 

[548]   app.post(   "/v1/workspace/:slug/stream-chat", [validApiKey], async (request, response) => {
[610]       const { slug }         = request.params;    const workspace = await Workspace.get({ slug });
[611]       const { message, mode = "query" } = reqBody(request);
[646]       await streamChatWithWorkspace(response, workspace, message, mode);
[652]       await EventLogs.logEvent("api_sent_chat", { workspaceName: workspace?.name, chatModel: workspace?.chatModel || "System Default", });
[656]       response.end();
[669]       } ) 
[671]   }

[673]   module.exports = { workspaceEndpoints };
```


