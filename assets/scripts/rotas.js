const urlLinhaOnibus = 'http://gistapis.etufor.ce.gov.br:8081/api/linhas/';
const IndicadorDeLoading = document.getElementById('IndicadorDeLoading');
const inputLoading = document.getElementById('meuInput');
const buttonLoading = document.getElementById('buttonSearch')

async function obterLinhaDeOnibus() {
    try {
        IndicadorDeLoading.style.display = 'block'
        inputLoading.classList.add('input-loading');
        buttonLoading.classList.add('input-loading');

        const response = await fetch(urlLinhaOnibus);

        if (!response.ok) {
            throw new Error('Não foi possivel obter as informações das linhas de ônibus');
        }

        const data = await response.json();

        const NumeroENomeLinha = data.map(linha => `${linha.numero} - ${linha.nome}`);

        inputLoading.classList.remove('input-loading');
        buttonLoading.classList.remove('input-loading')

        return NumeroENomeLinha;
    } catch (error) {
        console.error('Erro ao obter as informações das linhas de ônibus', error);

        IndicadorDeLoading.style.display = 'none';
        inputLoading.classList.remove('input-loading');
        inputLoading.style.display = 'none';

        return null;
    } finally {
        IndicadorDeLoading.style.display = 'none';
    }
}

function preencherListaLinhas(NumeroENomeLinha) {
    const datalist = document.getElementById('listaLinhas');

    datalist.innerHTML = '';

    NumeroENomeLinha.forEach(numberName => {
        const option = document.createElement('option');
        option.value = numberName;
        datalist.appendChild(option);
    });
}

obterLinhaDeOnibus().then(NumeroENomeLinha => {
    if (NumeroENomeLinha) {
        preencherListaLinhas(NumeroENomeLinha);
    }
});
