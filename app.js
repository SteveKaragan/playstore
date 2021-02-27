const express = require('express');
const morgan = require('morgan');
const apps = require('./playstore')
//http://localhost:8000/apps?sort=App&filter=action
const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
    const { sort = "", filter = "" } = req.query
    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
          return res
            .status(400)
            .send('Sort must be one of App or Rating');
        }
      }
    if (filter) {
        if (!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(filter.toLowerCase())) {
            return res
              .status(400)
              .send('filter must be one of action, puzzle, strategy, casual, arcade, card');
          }
    }
    let results = apps.filter(app => app.Genres.toLowerCase().includes(filter.toLowerCase()))
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
    res.json(results)
})

module.exports = app