/*
PROJETO FINAL - JOGO ITERATIVO
Aluno: Deyvet Walef dos Santos Martins
Turma: C016-M01-LAP
Versão do Programa: Final
*/

//DECLARAÇÃO DE VARIÁVEIS GLOBAIS:
const prompt = require("prompt-sync")();
let opcao, calculo, protecao;
(jangada = 0), (morrer = 0);

//DECLARANDO O OBJETO SOLDADO:
const soldado = {
  sede: 30,
  energia: 50,
  conhecimento: 10,
  alterarSede: function (quantidadeAgua) {
    this.sede = this.sede - quantidadeAgua;
    if (this.sede > 100) {
      this.sede = 100;
    } else if (this.sede < 0) {
      this.sede = 0;
    }
  },
  alterarEnergia: function (quantidadeEnergia) {
    this.energia = this.energia + quantidadeEnergia;
    if (this.energia > 100) {
      this.energia = 100;
    } else if (this.energia < 0) {
      this.energia = 0;
    }
  },
  alterarConhecimento: function (quantidadeConhecimento) {
    this.conhecimento = this.conhecimento + quantidadeConhecimento;
    if (this.conhecimento > 100) {
      this.conhecimento = 100;
    } else if (this.conhecimento < 0) {
      this.conhecimento = 0;
    }
  },
};

//FUNÇÃO PARA PASSAGEM DE TEMPO:
const tempo = {
  dia: 0,
  horas: 6,
  passarDias: function () {
    this.dia++;
  },
  passarHoras: function () {
    if (this.horas >= 24) {
      this.horas = 0;
    }
    this.horas = this.horas + 6;
  },
};

//FUNÇÃO PARA GERAR PROBABILIDADE DE MELHORIAS DAS ESTATÍSTICAS:
function deusa(min, max) {
  return Math.random() * (max - min) + min;
}

//FUNÇÃO PARA MOSTRAR STATUS DO SOLDADO:
function statusSoldado(conhecimento, energia, sede, protec) {
  console.log(
    "STATUS:\nSeu conhecimento de sobrevivência é de " + conhecimento + "%"
  );
  console.log("Sua energia é de " + energia.toFixed(2) + "%");
  console.log("Sua sede é de " + sede.toFixed(2) + "%");
  if (protec == true) {
    console.log("Você está protegido");
  } else {
    console.log("Você não está protegido");
  }
}

console.log(
  "Você é um soldado das forças especiais norte-americana e estava em um navio em direção ao Japão em uma missão \nsecreta, porém no caminho sua equipe sofreu ataques das tropas japonesas e você teve que se jogar ao mar em um bote.\n\nSeus aliados foram abatidos.\nAgora você está exilado em uma ilha deserta no oceano Pacífico.\n"
);

while (morrer == 0) {
  tempo.passarDias();
  protecao = false;

  console.log(
    "Agora são " + tempo.horas + ":00 horas do " + tempo.dia + "º dia\n"
  );

  //MOSTRANDO STATUS DO SOLDADO:
  statusSoldado(soldado.conhecimento, soldado.energia, soldado.sede, protecao);

  //TURNO MATUTINO:
  opcao = 0;
  while (opcao > 3 || opcao < 1) {
    console.log(
      "\nVocê acabou de acordar\n1-Caçar(Aumento de energia)\n2-Buscar água(Redução de sede)\n3-Construir Jangada(Necessário: 50% de energia)"
    );
    opcao = +prompt("Entre com uma opção: ");

    //CONDICIONAIS DE ACORDO COM CADA OPÇÃO:
    console.clear();
    switch (opcao) {
      case 1:
        //Alterando a quantidade de energia:
        console.log(
          "\nVocê optou por caçar e conseguiu capturar um javali com uma armadilha para poder comer "
        );
        calculo = deusa(soldado.conhecimento - 1, soldado.conhecimento + 1);
        console.log("Você conseguiu " + calculo.toFixed(2) + "% de energia");
        soldado.alterarEnergia(calculo);

        //Alterando a quantidade de água perdida:
        soldado.sede = soldado.sede + 0.6 * soldado.conhecimento;
        console.log(
          "Sua sede aumentou em " +
            (0.6 * soldado.conhecimento).toFixed(2) +
            "%"
        );

        //Alterando a quantidade de conhecimento adquirido:
        soldado.conhecimento++;

        tempo.passarHoras();
        break;

      case 2:
        //Alterando a quantidade de sede:
        console.log(
          "\nVocê optou por beber água e conseguiu encontrar uma nascente de água do lençol freático para beber "
        );
        calculo = deusa(soldado.conhecimento - 1, soldado.conhecimento + 1);
        console.log("Você conseguiu " + calculo.toFixed(2) + "% de água");
        soldado.alterarSede(calculo);

        //Alterando a quantidade de energia perdida:
        soldado.energia = soldado.energia - 0.6 * soldado.conhecimento;
        console.log(
          "Você perdeu " +
            0.6 * soldado.conhecimento.toFixed(2) +
            "% de energia"
        );

        //Alterando a quantidade de conhecimento adquirido:
        soldado.conhecimento++;

        tempo.passarHoras();
        break;
      case 3:
        console.log(
          "\nVocê optou por dar continuidade ao seu projeto de construir uma jangada para fugir da ilha "
        );
        if (soldado.energia < 50) {
          console.log(
            "Sua energia está abaixo de 50%, impossível trabalhar no projeto da jangada!"
          );
        } else {
          calculo = deusa(soldado.conhecimento - 1, soldado.conhecimento + 1);
          jangada = jangada + calculo;
          console.log("Você concluiu " + jangada.toFixed(2) + "% da jangada");

          //Alterando as quantidades de energia e água perdidas ao trabalhar no projeto da jangada:
          soldado.energia = soldado.energia - 50;
          console.log("Você perdeu 50% de energia");

          soldado.sede = soldado.sede + 0.6 * soldado.conhecimento;
          console.log(
            "Sua sede aumentou em " + 0.6 * soldado.conhecimento + "%"
          );

          tempo.passarHoras();
        }
        break;
      default:
        console.log("Opção inexistente.");
        break;
    }
  }

  //TURNO VESPERTINO:
  opcao = 0;
  while (opcao > 4 || opcao < 1) {
    console.log(
      "\nAgora são " +
        tempo.horas +
        ":00 horas do " +
        tempo.dia +
        "º dia\nO tempo está quente, portanto você sofrerá mais desidratação e perderá mais água e energia durante este período"
    );

    //MOSTRANDO STATUS DO SOLDADO:
    statusSoldado(
      soldado.conhecimento,
      soldado.energia,
      soldado.sede,
      protecao
    );

    console.log(
      "\n1-Caçar(Aumento de energia)\n2-Buscar água(Redução de sede)\n3-Construir Jangada(Necessário: 50% de energia)\n4-Fazer pesquisas e anotações sobre a Ilha (Obtém conhecimento)"
    );
    opcao = +prompt("Entre com uma opção: ");

    //CONDICIONAIS DE ACORDO COM CADA OPÇÃO:
    console.clear();
    switch (opcao) {
      case 1:
        //Alterando a quantidade de energia:
        console.log(
          "\nVocê optou por caçar novamente e conseguiu pescar um peixe enorme numa cachoeira da ilha "
        );
        calculo = deusa(soldado.conhecimento - 1, soldado.conhecimento + 1);
        calculo = calculo * 0.9; //Ganho menor de energia devido ao tempo mais quente
        console.log("Você conseguiu " + calculo.toFixed(2) + "% de energia");
        soldado.alterarEnergia(calculo);

        //Alterando a quantidade de água perdida:
        soldado.sede = soldado.sede + 0.7 * soldado.conhecimento;
        console.log(
          "Sua sede aumentou em " +
            (0.7 * soldado.conhecimento).toFixed(2) +
            "%\n"
        );

        //Alterando a quantidade de conhecimento adquirido:
        soldado.conhecimento++;

        tempo.passarHoras();
        break;

      case 2:
        //Alterando a quantidade de sede:
        calculo = deusa(soldado.conhecimento - 1, soldado.conhecimento + 1);
        calculo = calculo * 0.9; //Ganho menor de hidratação devido ao tempo mais quente

        console.log(
          "\nVocê optou por beber água e conseguiu encontrar uma nascente de água do lençol freático para beber "
        );
        console.log("Você conseguiu " + calculo.toFixed(2) + "% de água");
        soldado.alterarSede(calculo);

        //Alterando a quantidade de energia perdida:
        soldado.energia = soldado.energia - 0.7 * soldado.conhecimento;
        console.log(
          "Você perdeu " +
            (0.7 * soldado.conhecimento).toFixed(2) +
            "% de energia\n"
        );

        //Alterando a quantidade de conhecimento adquirido:
        soldado.conhecimento++;

        tempo.passarHoras();
        break;
      case 3:
        console.log(
          "\nVocê optou por dar continuidade ao seu projeto de construir uma jangada para fugir da ilha "
        );
        if (soldado.energia < 50) {
          console.log(
            "Sua energia está abaixo de 50%, impossível trabalhar no projeto da jangada!\n"
          );
        } else {
          calculo = deusa(soldado.conhecimento - 1, soldado.conhecimento + 1);
          jangada = jangada + calculo;
          console.log("Você concluiu " + jangada.toFixed(2) + "% da jangada");

          //Alterando as quantidades de energia e água perdidas ao trabalhar no projeto da jangada:
          soldado.energia = soldado.energia - 50;
          console.log("Você perdeu 50% de energia\n");

          soldado.sede = soldado.sede + 0.7 * soldado.conhecimento;
          console.log(
            "Sua sede aumentou em " +
              (0.7 * soldado.conhecimento).toFixed(2) +
              "%\n"
          );

          tempo.passarHoras();
        }
        break;
      case 4:
        soldado.conhecimento++;

        tempo.passarHoras();
        break;
      default:
        console.log("Opção inexistente.");
        break;
    }
  }

  //TURNO NOTURNO:
  opcao = 0;
  tempo.passarHoras();
  tempo.horas = tempo.horas - 6;

  while (opcao > 4 || opcao < 1) {
    console.log(
      "Agora são " +
        tempo.horas +
        ":00 horas do " +
        tempo.dia +
        "º dia\n\nO tempo está muito frio, portanto você sofrerá menos desidratação e perderá menos água e energia durante este período\n"
    );

    //MOSTRANDO STATUS DO SOLDADO:
    statusSoldado(
      soldado.conhecimento,
      soldado.energia,
      soldado.sede,
      protecao
    );

    console.log(
      "\n1-Dormir (Recuperar energia e descansar)\n2-Fazer uma fogueira(Diminui o risco de ser atacado por animais\n3-Construir Jangada(Necessário: 50% de energia)\n4-Fazer pesquisas e anotações sobre a Ilha (Obtém conhecimento)"
    );
    opcao = +prompt("Entre com uma opção: ");

    //CONDICIONAIS DE ACORDO COM CADA OPÇÃO:
    console.clear();
    switch (opcao) {
      case 1:
        //Alterando a quantidade de energia:
        calculo = deusa(soldado.conhecimento - 1, soldado.conhecimento + 1);
        console.log(
          "Você conseguiu dormir e ganhou " +
            calculo.toFixed(2) +
            "% de energia"
        );
        soldado.alterarEnergia(calculo);

        tempo.passarHoras();
        break;

      case 2:
        //Alterando o status de proteção e status de energia:
        console.log(
          "\nVocê optou por procurar lenhas e acender uma fogueira próxima aonde está sua barraca e se protegeu para a noite de sono "
        );
        soldado.energia = soldado.energia - 0.2 * soldado.conhecimento;
        console.log(
          "Você perdeu " +
            (0.2 * soldado.conhecimento).toFixed(2) +
            "% de energia"
        );
        protecao = true;
        //Alterando a quantidade de conhecimento adquirido:
        soldado.conhecimento++;

        tempo.passarHoras();
        break;
      case 3:
        console.log(
          "\nVocê optou por dar continuidade ao seu projeto de construir uma jangada para fugir da ilha "
        );
        if (energia < 50) {
          console.log(
            "Sua energia está abaixo de 50%, impossível trabalhar no projeto da jangada!"
          );
        } else {
          calculo = deusa(soldado.conhecimento - 1, soldado.conhecimento + 1);
          jangada = jangada + calculo;
          console.log("Você concluiu " + jangada.toFixed(2) + "% da jangada");

          //Alterando as quantidades de energia e água perdidas ao trabalhar no projeto da jangada:
          soldado.energia = soldado.energia - 50;
          console.log("Você perdeu 50% de energia");

          soldado.sede = soldado.sede + 0.6 * soldado.conhecimento;
          console.log(
            "Sua sede aumentou em " +
              (0.6 * soldado.conhecimento).toFixed(2) +
              "%"
          );

          tempo.passarHoras();
        }
        break;
      case 4:
        soldado.conhecimento++;

        tempo.passarHoras();
        break;
      default:
        console.log("Opção inexistente.");
        break;
    }
  }

  //FINAL DO DIA:
  console.log(
    "Agora são " +
      (tempo.horas - 1) +
      ":59 horas do " +
      tempo.dia +
      "º dia\n\nVocê está indo dormir devido ao dia exaustivo\n"
  );

  //MOSTRANDO STATUS DO SOLDADO:
  statusSoldado(soldado.conhecimento, soldado.energia, soldado.sede, protecao);

  if (protecao == false) {
    console.log("Infelizmente você não se protegeu para dormir nesta noite...");

    function decidirSuaVida(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    morrer = decidirSuaVida(0, soldado.conhecimento);
    if (morrer <= 10) {
      morrer = 1;
      console.log(
        "...e acabou sendo atacado por animais selvagens indo a óbito no " +
          tempo.dia +
          "°dia\n"
      );
    } else {
      morrer = 0;
      tempo.passarHoras();
      console.log("...mas você não morreu, graças a Deus.\n");
    }
  } else {
    tempo.passarHoras();
    console.log("Você tece uma ótima noite de sono\n");
  }

  if (jangada >= 100) {
    console.log(
      "\nPARABÉNS, VOCÊ CONCLUIU A SUA JANGADA E PODE FUGIR DA ILHA, LONGAS JORNADAS O AGUARDAM AGORA"
    );
    morrer = 1;
  }
}
