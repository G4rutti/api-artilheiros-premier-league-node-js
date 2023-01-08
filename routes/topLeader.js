const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const {join} = require('path')

const filePath = join(__dirname, 'users.json')

const SaveLeader = (users) => {
    fs.writeFileSync(filePath,JSON.stringify(users,null,'\t'))
}

const getLeader = () => {
    const data = fs.existsSync(filePath)
        ?fs.readFileSync(filePath)
        :[]

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}


const fetchData = async(url) => {
    const result = await axios.get(url)
    return result.data
}

const main = async () => {
    const content = await fetchData("https://www.transfermarkt.com.br/premier-league/torschuetzenliste/wettbewerb/GB1/saison_id/2022")
    const $ = cheerio.load(content)
    let artilheiros = []

    $('div#yw1 table.items tbody tr').each((i, e) => {
        const AllElements = $(e).find('td')
        const posicaoRanking = $(AllElements[0]).text()
        const nomeArtilheiro = $(AllElements[1]).find('table > tbody > tr > td.hauptlink > a').text()
        const nacionalidade = $(AllElements[5]).find('img').attr('title')
        const idade = $(AllElements[6]).text()
        const clube = $(AllElements[7]).find('a').attr('title')
        const jogos = $(AllElements[8]).find('a').text()
        const gols = $(AllElements[9]).find('a').text()
        

        if(nomeArtilheiro != ""){
            const data = {posicaoRanking, nomeArtilheiro, nacionalidade, idade, clube, jogos, gols}
            artilheiros.push(data)
        }
        SaveLeader(artilheiros)
    })
}


const userRoute = (app) =>{
    main()
    app.get('/pl',(req, res) => {
        try {
            const users = getLeader()
            res.send({users})
            return
        } catch (error) {
            res.status(500).json({error : error})
        }
    fs.unlink("users.json")
    })
}

module.exports = userRoute
