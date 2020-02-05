const express = require('express')
const app = express()
const path = require('path')
const convert = require('./lib/convert')
const api_bcb = require('./lib/api-bcb')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    const cotacao = await api_bcb.getCotacao()


    res.render('Home', {
        cotacao,
    })
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    console.log(convert.trasnformToNumber(cotacao))
    console.log(convert.trasnformToNumber(quantidade))

    if (convert.trasnformToNumber(cotacao) && convert.trasnformToNumber(quantidade)) {
        console.log(convert.trasnformToNumber(cotacao))
        console.log(convert.trasnformToNumber(quantidade))
        const conversao = convert.convert(cotacao, quantidade)

        res.render('Cotacao', {
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao),
            error: false
        })
    } else {
       
        res.render('Cotacao', {
            error: 'Valores inválidos'
        })

    }
})


app.listen(port, err => {
    if (err) {
        console.log('Erro ao iniciar...')
    } else {
        console.log('Servidor rodando na porta 3000')
    }
})