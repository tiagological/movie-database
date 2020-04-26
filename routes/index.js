const express = require('express');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');

router.get('/movie/:movieId', async (req, res) => {
  const { movieId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.API_URL}/movie/${movieId}?api_key=${process.env.API_KEY}`
    );

    if (!response) {
      return res.sendStatus(400);
    }

    res.status(200).send(response.data);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: 'Unable to get movies detail to an internal error' });
  }
});

router.get('/movies', async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/discover/movie?sort_by=popularity.desc&api_key=${process.env.API_KEY}`
    );
    if (!response) {
      return res.sendStatus(400);
    }

    res.status(200).send(response.data);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: 'Unable to get movies due to an internal error' });
  }
});

router.get('/configuration', async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/configuration?api_key=${process.env.API_KEY}`
    );

    if (!response) {
      return res.sendStatus(400);
    }

    res.status(200).send(response.data);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
