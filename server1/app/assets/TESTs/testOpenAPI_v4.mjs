
    var aComment = "Try the OpenAI Template - Starter Kit I've made (by Adrian (me!!!))\\r\\nhttps://enhanceui.gumroad.com/l/chatgpt-starter-template \\r\\nThis is new and ready for those looking to kickstart their own app or website using the OpenAI GPT models. I've built it on MERN it should save you over 100 hours if you want to build or test your own ideas! This also supports the channel if you have found these videos of benefit!"
    var aComment = "Why did the database go on a diet? It had too many tables!"
    var aComment = "I'm stuck on step four, how do I do it?"
    var aComment = "It’s a minefield for sure and the speed at which AI has emerged is crazy. I’m a 50 year old PhD student working in a marine technology area of study. I don’t have a coding background but (in my area) know what a piece of software needs to do, what the inputs, outputs and rules are, and how it will be used. So I have found AI incredibly useful in developing particular pieces of code to help me process and display data. It’s a partnership- I set the context and rules, and then it’s a rapid back and forth with me testing the suggestions that come. There would be no way that I would have even heard of the code libraries used without going down this road. Having worked with real software developers in the past,  there is a massive amount of similarity, and without the need for me to feel embarrassed about lack of coding knowledge over some (to the developer) simple and obvious issue. Anyway, thanks"

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
  
