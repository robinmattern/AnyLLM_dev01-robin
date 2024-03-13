
1. **/E/Repos/Robin/AnyLM_/dev01-robin/server/models/document.js**
---------------------------------------------------------------
```
[  7] const Document = { 

[ 10]   forWorkspace:  async function ( clause = { } ) { ... }

[ 17]   delete:  async function ( clause = { } ) { ... }

[ 27]   get:     async function ( clause = { } ) { ... }

[ 39]   getPins: async function ( clause = { } ) { ... }

[ 54]   where:   async function ( clause = { }, limit = null, orderBy = null) { ... }

[ 68]   addDocuments:    async function (workspace, additions = [], userId = null) { 
[ 71]     const { fileData } = require("../utils/files");
[ 72]     const embedded  = [ ];
[ 76]     for (const path of additions) {
[ 77]          const data   = await fileData( path );    
[ 80]          const docId  = uuidv4();
[ 81]          const { pageContent, ...metadata } = data;
[ 82]          const newDoc = { docId, filename: path.split("/")[1], docpath: path
                             , workspaceId: workspace.id, metadata: JSON.stringify(metadata) };
[ 90]          const { vectorized, error } 
                           = await VectorDb.addDocumentToNamespace( workspace.slug, { ...data, docId }, path );
[107]          await prisma.workspace_documents.create( { data: newDoc } );
[108]          embedded.push( path );
[127]          return { failedToEmbed, errors: Array.from(errors), embedded };
[112]          }
[128]     }

[130]   removeDocuments: async function (workspace, removals  = [], userId = null) { ... }

[173]   count:   async function ( clause = { }, limit = null) { ... }

[185]   update:  async function ( id = null, data = { }) { ... }
[206]   }

[207]   module.exports = { Document };
```

