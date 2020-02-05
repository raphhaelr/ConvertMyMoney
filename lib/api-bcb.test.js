const api_bcb = require('./api-bcb')
const axios = require('axios')

jest.mock('axios')

test('getCotacaoApi', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api_bcb.getCotacaoApi('url').then(resp => {
        expect(resp).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
})

test('extractCotacao', () => {
    const cotacao = api_bcb.extractCotacao({
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    })
    expect(cotacao).toBe(3.90)

})

describe('getToday', () => {

    const RealDate = Date

    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor() {
                return new RealDate(date)
            }
        }
    }

    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2020-07-01T12:00:00Z')
        const today = api_bcb.getToday()
        expect(today).toBe('7-1-2020')
    })
})

test('getURL', () => {
    const url = api_bcb.getURL('MINHA-DATA')

    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PT=AX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getCotacao', () => {

    const res = {
    }

    const getToday = jest.fn()
    getToday.mockReturnValue('01-07-2020')

    const getCotacaoApi = jest.fn()
    getCotacaoApi.mockReturnValue(Promise.reject('error'))

    const getURL = jest.fn()
    getURL.mockReturnValue('url')

    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.9)

    api_bcb.pure.getCotacao({ getToday, getCotacaoApi, getURL, extractCotacao })()
        .then(res => {
            expect(res).toBe('')
        })

})