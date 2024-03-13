
  aKey="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"   # Suzee 2/17/24 
# aKey="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"
# aKey="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"

curl -X POST https://api.openai.com/v1/completions \
  -H "Authorization: Bearer ${aKey}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "davinci-002",
    "prompt": "The following AI tool helps YouTubers identify if a comment can should be replied to or not.\nQuestions and/or asking for advice are good examples of when a reply is needed.\n\nUser: John Smith\nComment: That was a great video, thanks!\nShould Reply: No\n\nUser: Sue Mary\nComment: I\'m stuck on step four, how do I do it?\nShould Reply: Yes\n\nUser: @AdrianTwarog\nComment: Try the OpenAI Template - Starter Kit I\'ve made (by Adrian (me!!!))\\r\\nhttps://enhanceui.gumroad.com/l/chatgpt-starter-template \\r\\nThis is new and ready for those looking to kickstart their own app or website using the OpenAI GPT models. I\'ve built it on MERN it should save you over 100 hours if you want to build or test your own ideas! This also supports the channel if you have found these videos of benefit!\nShould Reply:",
    "stop": ["\\n", "User:", "Comment:", "Should Reply:"],
    "max_tokens": 7,
    "temperature": 0
  }' \
  --verbose
