function getRandomNumber (max = 1, min = 1) {
  return min + Math.floor(Math.random() * max)
}
// Funcion pura son deseadas a la hora de programar ya que es facil saber cuando fallan
// En matematicas se connocen como funciones inyectivas
function calculateStatus (initial, current, count) {
  const newHealth = Math.max(current - count, 0)
  const newPercentage = Math.ceil((newHealth / initial) * 100)

  return {
    newHealth,
    newPercentage
  }
}

function calculateBarColor (percentage) {
  if (percentage > 66) return 'green'
  if (percentage > 33) return 'orange'
  return 'red'
}
