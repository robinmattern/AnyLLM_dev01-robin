## server-models-workspace.js 
```
[  8] const Workspace = {
[ 24]   new:              async function( name = null, creatorId = null) { ... }

[ 51]   update:           async function( id = null, data = { } ) { ... }

[ 72]   getWithUser:      async function( user = null, clause = { } ) { ... }

[104]   get:              async function( clause = { } ) { ... }
    
[120]   delete:           async function( clause = { } ) { ... }

[132]   where:            async function( clause = { }, limit = null, orderBy = null ) {  
[134]     const results = await prisma.workspaces.findMany( 
[135]                            { where: clause, ...( limit   !== null ? { take: limit } : { } )
                                                , ...( orderBy !== null ? { orderBy } : { } ), 
[   ]                              } );
[   ]                           }                                                
[139]    return results;
  
[146]   whereWithUser:    async function(
[135]                            { where: user  , ...( limit   !== null ? { take: limit } : { } )
                                                , ...( orderBy !== null ? { orderBy } : { } ), 
[   ]                              } );
[175]   whereWithUsers:   async function( clause = { }, limit = null, orderBy = null ) { ... }

[191]   updateUsers:      async function( workspaceId, userIds = [ ] ) { ... }

[202]   resetWorkspaceChatModels: async () => { ... }
[215]   }

[217]   module.exports = { workspaceEndpoints };
```