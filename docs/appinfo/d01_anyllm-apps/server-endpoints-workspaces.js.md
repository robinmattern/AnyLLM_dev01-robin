## server-endpoints-workspaces.js 
```
[ 23] function workspaceEndpoints(app) {

[ 26]   app.post(   "/workspace/new",
[ 31]       const user = await userFromSession(request, response);
[ 32]       const { name = null, onboardingComplete = false } = reqBody(request);
[ 33]       const { workspace, message } = await Workspace.new( name, user?.id );
[ 55]       response.status(200).json({ workspace, message });

[ 63]   app.post(   "/workspace/:slug/update",

[ 92]   app.post(   "/workspace/:slug/upload",

[133]   app.post(   "/workspace/:slug/upload-link",

[171]   app.post(   "/workspace/:slug/update-embeddings",

[215]   app.delete( "/workspace/:slug",

[258]   app.get(    "/workspaces",
[263]       const user = await userFromSession(request, response);
[264]       const workspaces = multiUserMode(response)
[265]         ? await Workspace.whereWithUser(user)
[266]         : await Workspace.where();
[268]       response.status(200).json({ workspaces });

[276]   app.get(    "/workspace/:slug", ... )

[295]   app.get(    "/workspace/:slug/chats", ... )

[323]  app.post(   "/workspace/:slug/chat-feedback/:chatId", ... )

[352]  app.get(    "/workspace/:slug/suggested-messages", ... )

[370]  app.post(   "/workspace/:slug/suggested-messages", ... )

[399]  app.post(   "/workspace/:slug/update-pin", ... )
[425]  }

[427]  module.exports = { workspaceEndpoints };
```