

async function obterHorariosDosOnibus(numeroLinha) {
    try {
        const dataAtual = new Date().toISOString().slice(0, 10).replace(/\D/g, '');
        const urlHorarios = `http://gistapis.etufor.ce.gov.br:8081/api/horarios/${numeroLinha}?data=${dataAtual}`;

        const response = await fetch(urlHorarios);

        if (!response.ok) {
            throw new Error('Não foi possível obter as informações dos horários do ônibus');
        }

        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');

        const horariosSaida = [];

        const horariosSaidaNodes = xmlDoc.getElementsByTagName('horariosSaida');
        for (let i = 0; i < horariosSaidaNodes.length; i++) {
            const horariosSaidaNode = horariosSaidaNodes[i];
            const postoControle = horariosSaidaNode.getElementsByTagName('postoControle')[0].textContent;
            const saidas =  horariosSaidaNode.getElementsByTagName('saida');
            const horarios = [];
            for (let c = 0; c < saidas.length; c++) {
                const saida = saidas[c];
                const horario = saida.getElementsByTagName('horario')[0].textContent;
                const acessivel = saida.getElementsByTagName('acessivel')[0].textContent;
                horarios.push({horario, acessivel});
            }
            horariosSaida.push({postoControle, horarios});
        }

        return horariosSaida;
    } catch (error) {
        console.error('Erro ao obter informações dos horários do ònibus:', error);
        return null;
    }
}

document.getElementById('buttonSearch').addEventListener('click', async function () {
    const entradaUsuario = document.getElementById('meuInput').value;

    const numeroLinha = entradaUsuario.match(/\d+/)[0];

    if (!numeroLinha) {
        console.error('Por favor, insira o número da linha');
        return;
    }

    try {
        const horarios = await obterHorariosDosOnibus(numeroLinha);

        if (horarios) {
            console.log('Horários de saída agrupados por posto de controle:', horarios.postoControle);
        }
    } catch (error) {
        console.error('Erro ao buscar os horários:', error);
    }
});
