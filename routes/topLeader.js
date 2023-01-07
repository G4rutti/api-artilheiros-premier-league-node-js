const fetchData = async(url) => {
    const result = await axios.get(url)
    return result.data
}

const main = () => async () => {
    const content = await fetchData("https://www.transfermarkt.com.br/premier-league/torschuetzenliste/wettbewerb/GB1/saison_id/2022")
    const $ = cheerio.load(content)
    let artilheiros = []

    $('table.items tbody tr').each((i, e) => {
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
         }
        
    })
}



const userRoute = (app) =>{
    app.get('/pl',(req, res) => {
        try {
            const topScorer = main 
            res.status(200).send(topScorer)
            return
        } catch (error) {
            res.status(500).json({error : error})
        }
    })
    
}

module.exports = userRoute
