const uppercaseLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowercaseLetter = uppercaseLetter.toLocaleLowerCase()
const number = '1234567890'
const collection = (uppercaseLetter + lowercaseLetter + number).split('')
const checkCollection = []

function shortenURL() {
  let result = ''
  for (let i = 1; i < 6; i++) {
    let randomIndex = Math.floor(Math.random() * collection.length)
    result += collection[randomIndex]
  }
  checkResults(result)
  return 'http://' + result
}

function checkResults(result) {
  if (checkCollection.forEach(item => item === result)) {
    return shortenURL()
  } else {
    checkCollection.push(result)
  }
}


module.exports = shortenURL