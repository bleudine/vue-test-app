const fetch = require('node-fetch')
const fs = require('fs')

fetch('https://www.pokeapi.co/api/v2/pokemon?limit=151')
  .then(res => res.json())
  .then(({ results }) => {
    Promise.all(results.map(({ name, url }) => new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((pokemon) => resolve(pokemon))
        .catch(reject)
    }))).then((results) => {
      const pokemons = results.reduce(({ pokemons, types }, current) => ({ pokemons: { ...pokemons, [current.name]: current }, types: [...types, ...current.types.reduce((currentTypes, { type: { name } }) => types.includes(name) ? currentTypes : [...currentTypes, name], [])] }), { pokemons: {}, types: [] })
      fs.writeFile('resources.json', JSON.stringify(pokemons), (err) => {
        if (err) return console.error(err)
        console.log('pokemon resource file successfully created!')
      })
    })
      .catch(console.error)
  }).catch(console.error)
