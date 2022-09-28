const express = require("express")
const morgan = require("morgan")
const favicon = require("serve-favicon")
const bodyParser = require("body-parser")
const { success, getUniqueId } = require("./helper.js")
let pokemons = require("./mock-pokemon")

const app = express()
const port = 3000

app
    .use(favicon(__dirname + "/favicon.ico"))
    .use(morgan('dev'))
    .use(bodyParser.json())

// Les routes
app.get('/', (req, res) => res.send("Hello again express !"))

// On retourne la liste des pokémons au format JSON, avec un message :
app.get('/api/pokemons', (req, res) => {
    const message = `La liste des pokémons a bien été récupérée, il y en a ${pokemons.length}.`
    res.json(success(message, pokemons))
});

// Route pour un pokemon unique en fonction de son ID
app.get("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = `Un ${pokemon.name} a bien été trouvé.`
    res.json(success(message, pokemon))
});

// Post d'un nouveau pokémon
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } }
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated))
});

// Modification d'un pokemon
app.put("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
});

// Suppression d'un pokemon
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
});

app.listen(port, () => console.log(`Notre application node est démarrée sur : http://localhost:${port}`))

// console.log("J'en suis a 2 h 47 de la vidéo https://www.youtube.com/watch?v=NRxzvpdduvQ&ab_channel=SimonDieny-ReconversionFullstackJavaScript")