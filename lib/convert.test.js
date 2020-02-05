const convert = require('./convert')

test('Convert Cotação 4 e Quantidade 4', () => {
    expect(convert.convert(4, 4)).toBe(16)
})

test('Convert Cotação 0 e Quantidade 4', () => {
    expect(convert.convert(0, 4)).toBe(0)
})

test('toMoney to float', () => {
    expect(convert.toMoney(2)).toBe('2.00')
})

test('toMoney converts string', () => {
    expect(convert.toMoney('2')).toBe('2.00')
})