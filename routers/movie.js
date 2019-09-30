const express = require('express')
const axios = require('axios')
const internalError = require('./common')
const router = express.Router()

const axiosConfig = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 5000,
  params: {
    api_key: process.env.TMDB_KEY,
    language: 'ru',
    page: 1,
    region: 'RU'
  }
})

router.get('/', async (req, res) => {
  try {
    const requests = []
    const filter = req.query.filter

    const filterTypes = {
      upcoming: 'upcoming',
      playing: 'playing'
    }

    if (!filter) {
      requests.push(axiosConfig.get('movie/now_playing'))
      requests.push(axiosConfig.get('movie/upcoming'))
    }
    else if (filter === filterTypes.playing)
      requests.push(axiosConfig.get('movie/now_playing'))
    else if (filter === filterTypes.upcoming)
      requests.push(axiosConfig.get('movie/upcoming'))
    else {
      res.status(404).json({error: 'No movies with such filter'})
      return
    }

    const responses = await Promise.all(requests)

    const data = responses.map(r => {
      return r.data.results.map(movie => {
        const { title, overview, release_date, vote_average, poster_path, genre_ids } = movie
        return {
          title,
          overview,
          release_date,
          vote_average,
          poster_path,
          genre_ids
        }
      })
    })

    if (!filter)
      res.status(200).json({
        playing: data[0],
        upcoming: data[1]
      })
    else
      res.status(200).json({
        [filter]: data[0]
      })
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

router.get('/genres', async (req, res) => {
  try {
    const response = await axiosConfig.get('genre/movie/list')

    if (response.status === 200)
      res.status(200).json(response.data)
  }
  catch (error) {
    console.log(error)
    res.status(503).json(internalError)
  }
})

module.exports = router