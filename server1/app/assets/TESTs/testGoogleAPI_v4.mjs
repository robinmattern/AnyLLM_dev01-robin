

// Replace with your API key
//  var aKey = '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'
//  var aKey = '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'   // Robin 2/12/24
    var aKey = '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'   // Suzee 2/17/24 

  const url = 'https://api.openai.com/v1/completions';

  const aPrompt = `  
     The following AI tool helps YouTubers identify if a comment can should be replied to or not.
     Questions and/or asking for advice are good examples of when a reply is needed.
   
     User: John Smith
     Comment: That was a great video, thanks!
     Should Reply: No
   
     User: Sue Mary
     Comment: I'm stuck on step four, how do I do it?
     Should Reply: Yes
   
     User: @AdrianTwarog
     Comment: ${aComment}
     Should Reply:`

    var mStop = ["\\n", "User:", "Comment:", "Should Reply:"]
    var mStop = ["User:", "Comment:", "Should Reply:"]

  const data = {
    model:      "davinci-002",
    prompt:      aPrompt, 
    stop:        mStop, 
    max_tokens:  7,
    temperature: 0
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${aKey}`,
    },
    body: JSON.stringify(data),
  };
  
  fetch( url, options )
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
  });
  
