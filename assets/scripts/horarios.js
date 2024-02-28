

async function obterHorariosDosOnibus(numeroLinha) {
    try {
        const dataAtual = new Date().toISOString().slice(0, 10).replace(/\D/g, '');
        const urlHorarios = `http://gistapis.etufor.ce.gov.br:8081/api/horarios/${numeroLinha}?data=${dataAtual}`;

        const response = await fetch(urlHorarios);

        if (!response.ok) {
            throw new Error('Não foi possível obter as informações dos horários do ônibus');
        }

        const data = await response.json();

        const horariosSaida = data.map(item => {
            const postoControle = item.postoControle;
            const horarios = item.horarios.map(saida => ({
                horario: saida.horario,
                acessivel: saida.acessivel
            }));
            return { postoControle, horarios}
        });

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
        const horariosArray = await obterHorariosDosOnibus(numeroLinha);

        if (horariosArray) {
            horariosArray.forEach(horario => {
                console.log(`Horaios de saida agrupados por posto de controle: ${horario.postoControle}`);
                console.log(horario.horarios)
            })
            
        }
    } catch (error) {
        console.error('Erro ao buscar os horários:', error);
    }
});
