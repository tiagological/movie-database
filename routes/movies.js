import express from 'express';
import axios from 'axios';
const router = express.Router();

router.get('', async (req, res) => {
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
    res.status(500).send({
      message: 'Unable to get movies detail due to an internal error',
    });
  }
});

export default router;
