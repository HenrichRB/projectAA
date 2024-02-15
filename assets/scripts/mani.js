const urlBusLines = 'http://gistapis.etufor.ce.gov.br:8081/api/linhas/';

async function obterLinhaDeOnibus() {
    try {
        const response = await fetch(urlBusLines);
        
        if (!response.ok) {
            throw new Error('Não foi possivel obter as informações das linhas de ônibus')
        }
        
        const data = await response.json();

        const numberAndNames = data.map(linha => `${linha.numero} - ${linha.nome}`);

        return numberAndNames;
    } catch (error) {
        console.error('Erro ao obter as informações das linhas de ônibus', error);
        return null;
    }
}

obterLinhaDeOnibus().then(numberAndNames => {
    if (numberAndNames) {
        console.log(numberAndNames);
    }
});