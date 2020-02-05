const axios = require('axios')

const getURL = `https://economia.awesomeapi.com.br/json/list/USD-BRL/1`

const getCotacaoApi = url => axios.get(url).then(res => parseFloat(res.data[0].bid).toFixed(2))

const extractCotacao = res => res.data.value[0].cotacaoVenda

const getToday = () => {
    const today = new Date()
    return (today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear())
}


const getCotacao = ({getToday, getCotacaoApi, getURL, extractCotacao}) => async () => {
    try {
        const today = getToday()
        const url = getURL
        const cotacao = await getCotacaoApi(url)
        return cotacao
    } catch (error) {
        return ''
    }
}

module.exports = {
    getCotacaoApi,
    getCotacao: getCotacao({getToday, getCotacaoApi, getURL, extractCotacao}),
    extractCotacao,
    getToday,
    getURL,
    pure:{
        getCotacao
    }
}

