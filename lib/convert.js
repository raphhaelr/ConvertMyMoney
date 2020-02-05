const convert = (cotacao, quantidade) => cotacao * quantidade

const toMoney = value => parseFloat(value).toFixed(2)

const trasnformToNumber = value => !isNaN(parseFloat(value)) && isFinite(value)

module.exports = {
    convert,
    toMoney,
    trasnformToNumber
}


