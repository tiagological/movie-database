import express from 'express';
import User from '../models/user';
import { watchList } from '../validations/watchList';
import { parseError } from '../util/helpers';

const router = express.Router();

router.get('/fetch', async (req, res) => {
  try {
    const { session } = req;

    const sessionUser = session.user;

    if (sessionUser) {
      const { userId } = sessionUser;

      const doc = await User.findById(userId);

      const watchList = doc.watch_list.toObject();

      let filteredWatchList = [];

      if (watchList.length > 0) {
        filteredWatchList = watchList.map((movie) => {
          delete movie._id;
          return movie;
        });
      }

      res.send(filteredWatchList);
    } else {
      throw new Error('You need to be logged in order to load your watch list');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: parseError(err) });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { id, title, poster_path, runtime, release_date } = req.body;

    const { session } = req;

    const sessionUser = session.user;

    if (sessionUser) {
      const { userId } = sessionUser;

      await watchList.validateAsync({
        id,
        title,
        poster_path,
        runtime,
        release_date,
      });

      const movie_data = { id, title, poster_path, runtime, release_date };

      // get user doc by doc id and use mongodb not equals selector $ne to return doc only if watch_list does not already contain movie with same id

      const doc = await User.findOneAndUpdate(
        { _id: userId, 'watch_list.id': { $ne: id } },
        { $push: { watch_list: movie_data } },
        { new: true }
      );

      if (doc === null) {
        throw new Error('Movie already exists in watch list');
      }

      res.send(movie_data);
    } else {
      throw new Error('Unable to add to watchlist');
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: parseError(err) });
  }
});

export default router;
