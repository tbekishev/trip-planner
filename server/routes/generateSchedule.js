const express = require('express');
const router = express.Router();

module.exports = () => {

  const { Configuration, OpenAIApi } = require("openai");


  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);

  router.get("/", async (req, res) => {
    // console.log(req.query);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.query.prompt,
      max_tokens: 2000
    });

    res.send(completion.data.choices[0].text);

  });

  return router;
}; 