// Mapa
google.charts.load('current', { 'packages': ['geochart'], });
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(dadosMapa);

    var options = {
        backgroundColor: '81d4fa',
        colorAxis: { colors: ['#60ddb1', '#30b88e', '#00926b'] }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('mapa'));

    chart.draw(data, options);
}

var dadosMapa = [['pais', 'casos'],
['', 0]];


async function obterdados() {
    await fetch('https://covid19-brazil-api.now.sh/api/report/v1/countries')   //Endpoint da API
        .then(response => response.json())    // Obtendo resposta da API
        .then(dados => prepararDados(dados))  // Obtendo os dados
        .catch(e => exibirErro(e.message));   // Obtendo erro (se der erro)
}

function exibirErro(mensagem) {
    let erro = document.getElementById('div-erro');
}

function prepararDados(dados) {
    dadosMapa = [['pais', 'casos']];

    console.table(dados['data'])

    for (let i = 0; i < dados['data'].length; i++) {

        let pais = dados['data'][i].country;
        let casos = dados['data'][i].confirmed;

        dadosMapa.push([pais, casos]);
    }

    drawRegionsMap();

}
// -------------------------------------------------------------------------------------------------

// Pizza
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable(dadosPizza);

    var options = {
        title: 'Casos e mortes da Covid-19',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('pizza'));

    chart.draw(data, options);
}

var dadosPizza = [['confirmados', 'valor']];


async function obterdados2() {
    await fetch('https://covid19-brazil-api.now.sh/api/report/v1/countries')   //Endpoint da API
        .then(response => response.json())    // Obtendo resposta da API
        .then(dados => prepararDados2(dados))  // Obtendo os dados
        .catch(e => exibirErro(e.message));   // Obtendo erro (se der erro)
}

function exibirErro(mensagem) {
    let erro = document.getElementById('div-erro');
}

function prepararDados2(dados) {
    dadosPizza = [['confirmados', 'mortes']];

    console.table(dados['data'])

    let confirmados = 0;
    let mortes = 0;

    for (let i = 0; i < dados['data'].length; i++) {

        confirmados += dados['data'][i].confirmed;
        mortes += dados['data'][i].deaths;
    }

    dadosPizza.push(['confirmados', confirmados]);
    dadosPizza.push(['mortes', mortes]);
    
    drawChart();

}
// ------------------------------------------------------------------------------------------

// Tabela
async function obterdados3() {
    // ocultar a div de erro (se estiver visível)
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'none';
    
    await fetch('https://covid19-brazil-api.now.sh/api/report/v1')   //Endpoint da API
        .then( response => response.json() )    // Obtendo resposta da API
        .then( dados => prepararDados3(dados) )  // Obtendo os dados
        .catch( e => exibirErro(e.message) );   // Obtendo erro (se der erro)
}

// Função para exibir mensagens de erro
function exibirErro(mensagem) {
    const divErro = document.getElementById('div-erro');
    divErro.style.display = 'block';
    divErro.innerHTML = '<b>Erro ao acessar a API</b><br />' + mensagem; 
}

// Função para preparar e exibir os dados no HTML
function prepararDados3(dados) {
    // Criando variável para controlar as linhas da tbody
    let linhas = document.getElementById('linhas');
    linhas.innerHTML = '';
    
    // Laço para percorrer todos os dados recebidos
    for (let i=0; i<dados['data'].length; i++) {
        let auxLinha = '';

        if (i %2 !=0)
            auxLinha = '<tr class="listra">';
        else 
            auxLinha = '<tr>';

        auxLinha += '<td>' + dados['data'][i].state + '</td>' +
                    '<td>' + dados['data'][i].uf + '</td>' +
                    '<td>' + dados['data'][i].cases + '</td>' +
                    '<td>' + dados['data'][i].deaths + '</td>' +
                    '<td>' + dados['data'][i].suspects + '</td>' +
                    '<td>' + dados['data'][i].refuses + '</td>' +
                '</tr>';

        linhas.innerHTML += auxLinha;
    }
}
// ----------------------------------------------------------------------------------------------------