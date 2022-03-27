const randInt = (max: number) => {
  return Math.floor(Math.random() * max)
}

const chance = () => {
  return Math.random() < 0.5
}

const leadingZero = (number: number, length: number) => {
  return number.toString().padStart(length, "0")
}

const formatTime = (milliseconds: number) => {
  /* const hours = Math.floor(milliseconds / 3600000)
  milliseconds %= 3600000 */
  const minutes = Math.floor(milliseconds / 60000)
  milliseconds %= 60000
  const seconds = Math.floor(milliseconds / 1000)
  milliseconds %= 1000
  return [minutes, seconds]
    .map(x => leadingZero(x, 2))
    .join(":") + "." + leadingZero(milliseconds, 3)
}

const secondsFrom = (timestamp: number) => {
  return timestamp ? Date.now() - timestamp : 0
}

export { randInt, chance, formatTime, secondsFrom }
