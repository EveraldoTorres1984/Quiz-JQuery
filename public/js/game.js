//Variaveis de controle do Jogo

let perguntasFeitas = [];

function gerarPergunta() {

}

//Perguntas do jogo
const perguntas = [{
        pergunta: "Qual dessas linguagens não é considerada uma linguagem de programação ?",
        respostas: ["PHP", "HTML", "JavaScript", "C++"],
        correta: "resp1"
    },
    {
        pergunta: "Em que ano o Brasil foi descoberto?",
        respostas: ["1450", "1550", "1500", "1400"],
        correta: "resp2"
    }, {
        pergunta: "A última Copa do Mundo que o Brasil conquistou foi em:",
        respostas: ["1998", "1994", "2002", "2006"],
        correta: "resp2"
    },
    {
        pergunta: "Quantos Mundiais tem o Palmeiras?",
        respostas: ["0", "1", "2", "3"],
        correta: "resp0"
    },
    {
        pergunta: "O que significa a sigla HTML?",
        respostas: ["Hyper Text Message Language", "Hyper Text Markup Langague", "Hyper Theory Massive Language", "Hyper Text Massive Lineup"],
        correta: "resp1"
    },
    {
        pergunta: "Qual dessas linguagens é considerada uma linguagem de marcação?",
        respostas: ["PHP", "C++", "JavaScript", "HTML"],
        correta: "resp3"
    }
];

var qtdPerguntas = perguntas.length - 1;

gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas) {
    //Gerar um número aleatório
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    aleatorio = Number(aleatorio);
    console.log(aleatorio);

    //Verificar se a pergunta sorteada já foi feita
    if (!perguntasFeitas.includes(aleatorio)) {
        //colocar como pergunta feita
        perguntasFeitas.push(aleatorio);
        //preencher o html com os dados da questão sorteada
        var p_selecionada = perguntas[aleatorio].pergunta;

        //alimentar a pergunta vindo do sorteio
        $("#pergunta").html(p_selecionada);
        $("#pergunta").attr('data-indice', aleatorio);

        //colocar as respostas
        for (let i = 0; i < 4; i++) {
            $('#resp' + i).html(perguntas[aleatorio].respostas[i]);
        }
        //embaralhando as respostas
        var pai = $("#respostas");
        var botoes = pai.children();
        for (let i = 1; i < botoes.length; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }
    } else {
        //Se a pergunta já foi feita
        if (perguntasFeitas.length < qtdPerguntas + 1) {
            return gerarPergunta(maxPerguntas);
        } else {
            //console.log("Acabaram as perguntas");
            $('#quiz').addClass('oculto');
            $('#mensagem').html('Parabéns, você acertou todas as ' + qtdPerguntas + ' perguntas e venceu o jogo!');
            $('#status').removeClass('oculto');
        }
    }
}

$('.resposta').on('click', function () {
    if ($('#quiz').attr('data-status') !== 'travado') {
        resetaBotoes();
        //Adiciona a classe selecionar
        $(this).addClass('selecionada');
    }
});

$('#confirm').on('click', function () {
    //pegar o índice da pergunta
    var indice = $('#pergunta').attr('data-indice');

    //Qual é a resposta certa
    var respCerta = perguntas[indice].correta;

    //Resposta selecionada pelo usuario
    $('.resposta').each(function () {
        if ($(this).hasClass('selecionada')) {
            var respostaEscolhida = $(this).attr('id');
            if (respCerta == respostaEscolhida) {
                proximaPergunta();
            } else {
                $('#quiz').attr('data-status', 'travado');
                $("#confirm").addClass('oculto');
                $('#' + respCerta).addClass('correta');
                $('#' + respostaEscolhida).removeClass('selecionada');
                $('#' + respostaEscolhida).addClass('errada');
                setTimeout(function () {
                    gameOver();
                }, 2000)
            }
        }
    })
});

function newGame() {
    $("#confirm").removeClass('oculto');
    $('#quiz').attr('data-status', 'ok');
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
    $('#quiz').removeClass('oculto');
    $('#status').addClass('oculto');
}

function proximaPergunta() {
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
}

function resetaBotoes() {
    $('.resposta').each(function () {
        if ($(this).hasClass('selecionada')) {
            $(this).removeClass('selecionada');
        }
        if ($(this).hasClass('correta')) {
            $(this).removeClass('correta');
        }
        if ($(this).hasClass('errada')) {
            $(this).removeClass('errada');
        }
    });
}

function gameOver() {
    $('#quiz').addClass('oculto');
    $('#mensagem').html('Game Over! Gostaria de tentar de novo?');
    $('#status').removeClass('oculto');
}

$("#novoJogo").on('click', function () {
    newGame();
})