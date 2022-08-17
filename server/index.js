const axios = require('axios');
const cheerio = require('cheerio');

const url = "https://pt.wikipedia.org/wiki/Oscar_de_melhor_filme";

//como é uma requisição http, terá que ser criada uma função assíncrona
async function getMovies(){
    //esta linha vai esperar o axios retornar pra gente o objeto que vai ter varias propriedades, como o codigo da pagina
    //com {data}, apenas a propriedade data é obtida
    const {data} = await axios.get(url);
    const $ = cheerio.load(data);

    //colocar dentro de um loop ->.each()
    $('.wikitable tbody tr').each((i,element)=>{
        //obter apenas os noem em portugues do brasil(última célula) e so os vencedores
       const name= $(element).find('td[style*="background:#FAEB86"]').last().text().replace("\n","");
       //sem este if, fica os espaços em brancos que são todas as linahs que não sao os vencedores
       if (name !==''){
        //obter o texto das datas, que estão antes da 1º célula amarela
        //para que não venha toda a string usa-se a função slice para cortar a string, se o valor for negativo, cortar a partir do final
        const year = $(element).find('td[style*="background:#FAEB86"]').first().prev('td').text().replace("\n","").slice(-4);
        movie = {name,year}
        console.log(movie);
       }
    });

}

getMovies();
