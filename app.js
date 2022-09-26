const express = require("express")
const { success } = require("./helper.js")
let pokemons = require("./mock-pokemon")

const app = express()
const port = 3000

app.get('/', (req, res) => res.send("Hello again express !"))

app.get("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = "Un pokémon a bien été trouvé."
    res.json(success(message, pokemon))
})

//Nouveau point de terminaison, affichant le nombre total de pokémons :
app.get('/api/pokemons', (req, res) => {
    res.send(`Il y a ${pokemons.length} pokémons dans le pokédex pour le moment.`)
})

app.listen(port, () => console.log(`Notre application node est démarrée sur : http://localhost:${port}`))

console.log("J'en suis a 1 h 43 de la vidéo https://www.youtube.com/watch?v=NRxzvpdduvQ&ab_channel=SimonDieny-ReconversionFullstackJavaScript")