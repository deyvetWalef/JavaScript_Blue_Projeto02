/*
PROJETO 02 - JOKENPÔ
Aluno: Deyvet Walef dos Santos Martins
Turma: C016-M01-LAP
Versão do Programa: Final
*/

//Declaração de variáveis:
const prompt = require("prompt-sync")();
let opcao = 1,
  rodadas;
let pontuacaoComputador = 0,
  pontuacaoUsuario = 0;
let opcaoComputador, opcaoUsuario;
let objetos = ["pedra", "papel", "tesoura"];

console.log("Bem vindo ao Jokenpô\n");

while (opcao != 3) {
  if (opcao == 1) {
    console.log("1 - Ler regras do jogo;\n2 - Jogar;\n3 - Encerrar o jogo\n");
    opcao = +prompt("Entre com a opção desejada: ");
  } else if (opcao == 2) {
    console.log(
      "1 - Ler regras do jogo;\n2 - Jogar novamente?;\n3 - Encerrar o jogo\n"
    );
    opcao = +prompt("Entre com a opção desejada: ");
  }
  //Utilizando o switch case, visto que será utilzado um menu de opções utilizando um número para cada opção:
  switch (opcao) {
    case 1:
      console.log(
        "\nRegras:\n*Pedra ganha da tesoura, mas perde para o papel;\n*Tesoura ganha do papel, mas perde para a pedra;\n*Papel ganha da pedra, mas perde para a tesoura.\n"
      );
      break;
    case 2:
      //Sempre zerando as pontuações a cada jogo, para evitar acumulação de pontuações indevidas:
      (pontuacaoComputador = 0), (pontuacaoUsuario = 0);
      rodadas = +prompt("Entre com a quantidade de rodadas que deseja jogar: ");

      //Iniciando o jogo com a quantidade de rodadas que o gamer desejou:
      for (rodadas; rodadas > 0; rodadas--) {
        console.log("Opções:\n1 - Pedra;\n2 - Papel;\n3 - Tesoura.");
        opcaoUsuario = +prompt("Entre com a opção desejada: ");

        //Corrigindo respostas inexistêntes:
        if (opcaoUsuario != 1 && opcaoUsuario != 2 && opcaoUsuario != 3) {
          console.log("Entre com uma opção válida (1 a 3), por favor\n");
          rodadas++;
          continue;
        } else {
          opcaoComputador = Math.floor(Math.random() * 3 + 1);
        }

        //Mostrando as respostas e declarando o vencedor da rodada:
        console.log(
          "Você escolheu " +
            objetos[opcaoUsuario - 1] +
            " e o computador escolheu " +
            objetos[opcaoComputador - 1] +
            "\n"
        );
        if (opcaoUsuario == 1 && opcaoComputador == 2) {
          console.log(
            "Papel embrulha Pedra, o computador venceu esta rodada\n"
          );
          pontuacaoComputador++;
        } else if (opcaoUsuario == 2 && opcaoComputador == 1) {
          console.log("Papel embrulha Pedra, você venceu esta rodada\n");
          pontuacaoUsuario++;
        } else if (opcaoUsuario == 2 && opcaoComputador == 3) {
          console.log(
            "Tesoura corta papel, o computador venceu esta rodada\n "
          );
          pontuacaoComputador++;
        } else if (opcaoUsuario == 3 && opcaoComputador == 2) {
          console.log("Tesoura corta papel, você venceu esta rodada\n ");
          pontuacaoUsuario++;
        } else if (opcaoUsuario == 3 && opcaoComputador == 1) {
          console.log(
            "Pedra esmaga tesoura, o computador ganhou esta rodada\n "
          );
          pontuacaoComputador++;
        } else if (opcaoUsuario == 1 && opcaoComputador == 3) {
          console.log("Pedra esmaga tesoura, você ganhou esta rodada\n ");
          pontuacaoUsuario++;
        } else {
          console.log("Empate, ninguém pontuou nesta rodada\n ");
        }

        console.log(
          "\nPontuação final da rodada:\nVocê = " +
            pontuacaoUsuario +
            "\nComputador = " +
            pontuacaoComputador +
            "\n"
        );
      }
      if (pontuacaoComputador > pontuacaoUsuario) {
        console.log(
          "%c\nO computador foi declarado campeão do jogo!\n",
          "color:red"
        );
      } else if (pontuacaoUsuario > pontuacaoComputador) {
        console.log("\nVocê foi declarado campeão do jogo!\n");
      } else {
        console.log("\nO jogo ficou empatado!\n");
      }
      break;
    case 3:
      console.log("Jogo Encerrado!\n");
      break;
    default:
      console.log("Opção Inexistente\n");
  }
}
