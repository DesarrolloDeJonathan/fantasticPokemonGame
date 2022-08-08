// Al ser el estado centralizado nos permite acceder a toda la info en un solo lugar
function formatPokemon (data) {
  // Especificampos el formato
  // Devolveremos un farmato con datos generico data.atributo para esto nos guiamos de la API para acceder a cada uno de las propiedades que necesitemos
  return {
    name: data.name,
    health: {
      initial: data.stats[0].base_stat,
      current: data.stats[0].base_stat,
      bar: 'green'
    },
    avatar: data.sprites.other['official-artwork'].front_default,
    // other.fficial-artwork esto JS lo tomaria como una resta por que usaremos otra nomenclatura
    //Types al ser un array tendremos que usar map para recorrer el array manipular y estraer datos en el formato que nostros tenemos
    types: data.types.map(item => ({ name: item.type.name })),
    // En vez de hacer un for para iterar cada elemento que vamos a obtener lo concatenamos en una linea
    moves: data.moves.slice(0, 4).map(item => ({ name: item.move.name }))
  }
}
// Conexion a la API
async function getPokemon () {
  const id = getRandomNumber(500)

  // Con el asincronismo la pagina web no se detiene y todo continua por debajo
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await response.json() // Convertimos a formato json los datos de response

  return formatPokemon(data) // Esto para adaptar los datos que recibimos a nuestro formato
}

// Crearemos una function para traer todo el estado
// Esta funcition puede ser asyncronica en la web evita que la pagina se bloque hasta que todo termine de cargar
// con las operaciones asycronas invocamos una funtion que no sabemos cuando regrese pero cuando esto pase haga algo que queremos
// Sera asyncrona por que tiene que esperar a que getPokemon obtenga el pokemon
async function getState () {
  const pokemon1 = await getPokemon()
  const pokemon2 = await getPokemon()
  return {
    // Ya no necesitamos la informacion que teniamos aqui marcada sino llenar estos dos pokemons
    pokemons: [pokemon1, pokemon2],
    position: 0
  }
}

/**  por ahora esto solo nos permitira acceder a los personajes y sus caracteriscas aqui escritos
const state = {
  pokemons: [
    {
      name: "nidoqueen",
      health: {
        initial: 90,
        current: 90,
        bar: "green"
      },
      avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png",
      types: [
        {name: "poison"},
        {name: "ground"}
      ],
      moves: [
        {name: "mega-punch"},
        {name: "pay-day"},
        {name: "cut"},
        {name: "double-kick"},
      ]
    },
    {
    name: "dragonite",
    health: {
      initial: 91,
      current: 91,
      bar: "green"
    },
    avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
    types: [
      {name: "dragon"},
      {name: "fliying"}
    ],
    moves: [
      {name: "mega-punch"},
      {name: "fire-punch"},
      {name: "ice-punch"},
      {name: "thunder-punch"},
    ]
  }],
  position: 0,
}
*/
