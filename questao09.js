/*
 AVALIAÇÃO DE INTELIGÊNCIA ARTIFICIAL

 ALUNO: THIAGO SILVA NUNES DE GOUVÊA


*/


let shuffle = (this && this.shuffle) || function () {
  for (var v = 0, i = 0, ag = arguments.length; i < ag; i++) v = v + arguments[i].length;  
    for (var y = Array(v), k = 0, i = 0; i < ag; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) y[k] = a[j];
      
  return y;
};


let individuoPop = [
{ 
  Individuo: "10010101", 
  fitness: 0 
},
{ 
  Individuo: "11011010", 
  fitness: 0 
},
{ 
  Individuo: "01101011", 
  fitness: 0 
},
{ 
  Individuo: "01101101", 
  fitness: 0 
},
{ 
  Individuo: "11101110", 
  fitness: 0 
},
{ 
  Individuo: "01111010", 
  fitness: 0 
},
{ 
  Individuo: "11000111", 
  fitness: 0 
},
{ 
  Individuo: "11100001", 
  fitness: 0 
},
];

// função que calcula o fitness de acordo com a formula do fit
function encontrarFitness(x) {

formulaCalc = parseFloat((Math.pow(x, 2) - 12 * x + 16).toFixed(10));
return formulaCalc;

}

function algoritmoGenetico(populacao) {
  let individuoPop = populacao;
  let geracoes = 0;
  let encontrar = false;

  let novaGeracao = function () {
  geracoes++;

  console.log("População: ", individuoPop);
  console.log("Geração: ", geracoes);

  let populacaoFit = individuoPop.map(function (expr) {
   
      let valorDecimal = parseInt(expr.Individuo, 2);
 
      let resultadoFit = encontrarFitness(valorDecimal);
    return {
      Individuo: expr.Individuo,
      fitness: resultadoFit,
    };
  });

  console.log("Fitness da população: ", populacaoFit);

  //encontrando os individuos com o metodo filter
  let encontrarIndividuo = populacaoFit.filter(function (i) {
    return i.fitness < 800;
  });

  console.log("encontrarIndividuo", encontrarIndividuo);

  if (encontrarIndividuo.length > 0) {
    console.log( "Individuos menos aptos : ", encontrarIndividuo);
    console.log("Geração: ", geracoes);
    encontrar = true;
  }

  
  let ordenarPopulacao = populacaoFit.sort(function (IndividuoA, IndividuoB){
    if (IndividuoA.fitness > IndividuoB.fitness) {
      return -1;
    }
    if (IndividuoA.fitness < IndividuoB.fitness) {
      return 1;
    }
    return 0;
  });

  console.log(
    "População ordenada com base no fitness: ",
    ordenarPopulacao
  );

  let length = ordenarPopulacao.length;

  
  let melhoresIndividuos = ordenarPopulacao.slice(0, length / 2);

  let firstArray = [];
  let segundoArray= [];

 
  // Encontrando os melhores individuos pela seleção em torneio
  melhoresIndividuos.forEach(function (expr) {

      let binario = expr.Individuo;
      //metodo slice faz o fatiamento do array para o cruzamento
      let first = binario.slice(0, 4);
       
      let second= binario.slice(4, 8);
       
    firstArray.push(first);
    segundoArray.push(second);
  });

  
  segundoArray.reverse();

  let novaPopulacao = firstArray.map(function (parcial, i) {
    return {
      Individuo: "" + parcial + segundoArray[i],
      fitness: 0,
    };
  });


  individuoPop = shuffle(melhoresIndividuos, novaPopulacao);
  // gerando a nova população 
  let populacaoEvoluida = individuoPop.map(function (expr) {
   
      let dados = expr.Individuo.split("");

      let modDadosArray = dados.map(function (Individuo) {

      return "" + Math.round(Math.random());

    });

    let modDados = modDadosArray.join("");

    return {

      Individuo: modDados,

      fitness: 0,

    };
  });
  individuoPop = populacaoEvoluida;
};

//Enquanto não atingir as 400 gerações o algoritmo se repetirá
while (geracoes < 400) {
  novaGeracao();
}

return "População encontrada com os critérios";
}

// Rodando o algoritmo
algoritmoGenetico(individuoPop);
