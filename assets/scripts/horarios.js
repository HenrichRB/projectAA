

async function obterHorariosDosOnibus(numeroLinha) {
    try {
        const dataAtual = new Date().toISOString().slice(0, 10);
        const urlHorarios = `http://gistapis.etufor.ce.gov.br:8081/api/horarios/${numeroLinha}?data=${dataAtual}`;

        const response = await fetch(urlHorarios);

        if (!response.ok) {
            throw new Error('Não foi possível obter as informações dos horários do ônibus');
        }

        return response.json;
    } catch (error) {
        console.error('Erro ao obter informações dos horários do ònibus:', error);
        return null;
    }
}

document.getElementById('buttonSearch').addEventListener('click', async function () {
    const numeroLinha = document.getElementById('meuInput').value;

    if (numeroLinha.trim() === '') {
        console.error('Por favor, insira um número de linha válido');
        return;
    }
})
