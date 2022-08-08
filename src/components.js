// Orientado a componentes en vez de el clasico MVC y generandolos dinamicamente

function pokemonImage(pokemon = {}) {
  const { avatar } = pokemon
  return `
    <div class="pokemon">
      <img src="${avatar}" />
    </div>
  `
}

function statusBar(pokemon = {}) {
  const { name = '', health = {}, types = [] } = pokemon
  const { initial, current } = health

  //Estas variables no generan conflicto ya que estan en otro archivo
  const { newPercentage } = calculateStatus(initial, current, 0)
  const newBarColor = calculateBarColor(newPercentage)

  return `
    <div class="status">
      <div class="info">
        <p class="name">${name}</p>
      </div>
      <ul class="types">
        ${types.map(function (type) {
          return `<li class="button ${type.name}">${type.name}</li>`
          }).join('')}
      </ul>
      <div class="meter">
        <span class="bar ${newBarColor}" style="width: ${newPercentage}%"></span>
      </div>
      <div class="health">${current} / ${initial} </div>
    </div>
  `
}
// Creando etiquetas como string y luego las mostramos con innerHTML
function dialog(pokemon = {}, message = '') {
  const { name } = pokemon
  return`
    <div class="dialog">
      <p>
        <span class="name">${name}</span>,
        <span class="message">${message}</span>
      </p>
  </div>
  `
}

//Creando etiquetas en la memoria, desde cero
// callback es la funcion que vamos a recibir y que no sabemos cual es lo que logramos con esto es tener un codigo mas generico y entendible
// el parametro callback nos va a ayudar a que esta funcion logre ejecutarce sin depender del mundo exterior (pior function)
function movesBox(pokemon = {}, callback) {
  const { moves = [] } = pokemon

  const movesContainer = document.createElement('div') // Por ahora solo esta en memoria
  movesContainer.className = 'moves' // Le asiganmos un nombre de clase

  moves.forEach(move => {
    const button = document.createElement('button')
    button.className = 'button black'
    button.textContent = move.name
    // Cuando vean que lo unico que hace una funcition es llamar a otra function
    // En el paradigma de fuhntional programming se llama single point
    button.addEventListener('click', () => {
      callback()
    })
    // en ese caso se pueden remplazar la exprecion anterior por la declaracion de la function
    // button.addEventListener('click', turn)

    movesContainer.appendChild(button)
  });

  return movesContainer
}