const urlBusLines = 'http://gistapis.etufor.ce.gov.br:8081/api/linhas/';

async function obterLinhaDeOnibus() {
    try {
        const response = await fetch(urlBusLines);

        if (!response.ok) {
            throw new Error('Não foi possivel obter as informações das linhas de ônibus');
        }

        const data = await response.json();

        const numbersAndNames = data.map(linha => `${linha.numero} - ${linha.nome}`);

        return numbersAndNames;
    } catch (error) {
        console.error('Erro ao obter as informações das linhas de ônibus', error);
        return null;
    }
}

function preencherListaLinhas(numbersAndNames) {
    const datalist = document.getElementById('listaLinhas');

    datalist.innerHTML = '';

    numbersAndNames.forEach(numberName => {
        const option = document.createElement('option');
        option.value = numberName;
        datalist.appendChild(option);
    });
}

// document.getElementById('buttonSearch').addEventListener('click', function () {
//     const inputValue = document.getElementById('meuInput').value;
//     console.log('Valor do input:', inputValue);
// })

obterLinhaDeOnibus().then(numbersAndNames => {
    if (numbersAndNames) {
        preencherListaLinhas(numbersAndNames);
    }
});