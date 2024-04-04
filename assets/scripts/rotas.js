const urlBusLines = 'http://gistapis.etufor.ce.gov.br:8081/api/linhas/';
const loadingIndicador = document.getElementById('loadingIndicador');
const inputLoading = document.getElementById('meuInput');
const buttonLoading = document.getElementById('buttonSearch')

async function obterLinhaDeOnibus() {
    try {
        loadingIndicador.style.display = 'block'
        inputLoading.classList.add('input-loading');
        buttonLoading.classList.add('input-loading');

        const response = await fetch(urlBusLines);

        if (!response.ok) {
            throw new Error('Não foi possivel obter as informações das linhas de ônibus');
        }

        const data = await response.json();

        const numbersAndNames = data.map(linha => `${linha.numero} - ${linha.nome}`);

        inputLoading.classList.remove('input-loading');
        buttonLoading.classList.remove('input-loading')

        return numbersAndNames;
    } catch (error) {
        console.error('Erro ao obter as informações das linhas de ônibus', error);

        loadingIndicador.style.display = 'none';
        inputLoading.classList.remove('input-loading');
        inputLoading.style.display = 'none';

        return null;
    } finally {
        loadingIndicador.style.display = 'none';
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

obterLinhaDeOnibus().then(numbersAndNames => {
    if (numbersAndNames) {
        preencherListaLinhas(numbersAndNames);
    }
});
