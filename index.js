function Pessoa(altura, peso) {
    if (!altura || !peso) {
        throw new Error("Altura e peso são obrigatórios");
    }

    this.altura = altura;
    this.peso = peso;
}

function Nutricionista(altura, peso) {
    Pessoa.call(this, altura, peso);
    console.log('peso: ' + peso);
    console.log('altura: ' + altura);
    this.imc = function () {
        return this.peso / (this.altura * this.altura);
    };



    this.classificaIMC = function () {
        var imc = this.imc();
        console.log('imc: '+ imc);
        if (imc < 18.5) {
            return "Abaixo do peso";
        }
        if (imc >= 18.5 && imc < 24.9) {
            return "Peso normal";
        }
        if (imc >= 25 && imc < 29.9) {
            return "Sobrepeso";
        }

        return "Obesidade";
    };

    this.montaTabelaIMC = function (classificacao){
        var imc = this.imc();
        var tabela = document.getElementById("tabelaIMC").getElementsByTagName("tbody")[0];
        tabela.innerHTML = '';        
        var ar = ["Abaixo do peso","Peso normal","Sobrepeso", "Obesidade"]
        ar.forEach(element => {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.textContent = this.recuperaInfoIMC(element) +' - '+ element;
            if (element == classificacao) {
                td.style.fontWeight = 'bold';  
            }
            tr.appendChild(td);
            tabela.appendChild(tr);              
        });
    }
    this.recuperaInfoIMC = function(classificacao) {
        var valor;
        switch (classificacao) {
            case "Abaixo do peso":
                valor = "< 18,5 kg/m²"
                break;
            case "Peso normal":
                valor = "18,5 - 24,9 kg/m²"
                break;    
            case "Sobrepeso":
                valor = "25,0 - 29,9 kg/m²"
                break; 
            case "Obesidade":
                valor = "30,0 - 34,9 kg/m²"
                break;                                         
        }
        return valor;
    }    
}
Nutricionista.prototype = Object.create(Pessoa.prototype);
Nutricionista.prototype.constructor = Nutricionista;


function renderizaResultadoIMC(nutricionista) {
    document.getElementById("imc").innerText =
        nutricionista.imc().toFixed(2) + " - " + nutricionista.classificaIMC();
        nutricionista.montaTabelaIMC(nutricionista.classificaIMC());
}

function actionCalcularIMCBuilder() {
    var alturaEl = document.getElementById("altura");
    var pesoEl = document.getElementById("peso");

    return function actionCalcularIMC(evt) {
        evt.preventDefault();

        var nutricionista = new Nutricionista(
            parseFloat(alturaEl.value),
            parseFloat(pesoEl.value)
        );
        console.log(Nutricionista.prototype.constructor);
        console.log(nutricionista instanceof Pessoa);

        renderizaResultadoIMC(nutricionista);
    }
}

window.onload = function () {
    document
        .getElementById("calcular")
        .addEventListener("click", actionCalcularIMCBuilder());
        
};
