const listaEquip = document.getElementById('resultado-equipamento')
const select = document.getElementById('selectEquipamento')
const filtroEquip = document.getElementById('idFiltro')
const estoque = document.getElementById('resultados-estoque')

const resultEquip = getEquipamentos()

resultEquip.then(dados => {
    for(const key in dados) {
        // listaEquip.innerHTML += `<option value="${dados[key].idEquip}">${dados[key].nomeEquip}</option>`
        listaEquip.innerHTML += 
        `
            <ul id = "consulta" class = "ul-result">
                <li class = "li-result poppins-semibold">
                    <div class = "display-line">
                            ID DO TIPO: ${dados[key].idEquip} |
                            NOME: ${dados[key].nomeEquip}        
                    </div>

                    <div class = "display-line">
                        <button id="excluirEquip" class="material-symbols-outlined btn-3" onclick="excluiEquip(event, ${dados[key].idEquip})">
                        delete
                        </button>
                    </div>
                </li>
            </ul>
        `

    }

})

const selectEquipamento = getEquipamentos()

selectEquipamento.then(dados => {
    for(const key in dados){
        select.innerHTML += `<option value="${dados[key].idEquip}">${dados[key].nomeEquip}</option>`
    }
})


const selectFiltro = getEquipamentos()

selectFiltro.then(dados => {
    for(const key in dados){
        filtroEquip.innerHTML += `<option value="${dados[key].idEquip}">${dados[key].nomeEquip}</option>`
    }
})

async function consultarIdEquip() {
    const filtroEquip = document.getElementById("idFiltro").value;

    try {
        
        // Consultar dispositivos com os filtros
        let resultado 
        resultado = await getIdEstoque(filtroEquip);

        // Exibir os resultados da consulta
        exibirIdEstoque(resultado);
        
    } catch (error) {
        console.error("Erro ao consultar estoque:", error);
    }
}

function exibirIdEstoque(resultados) {
    const containerResult = document.getElementById("resultados-estoque");

    // Limpar o conteúdo anterior do container
    containerResult.innerHTML = "";

    
    // Verificar se há resultados a serem exibidos
    if (resultados && resultados.length > 0) {

        var resultadoElemento = document.createElement("div");

        resultadoElemento.innerHTML = 
        `
        <ul id = "quantidadeEstoque" class = "ul-result">
            <li class = "li-result poppins-semibold">
                <div class = "display-line">
                    QUANTIDADE: ${resultados.length}
                </div>
            </li>
        </ul>
        `

        // Criar elementos HTML para cada resultado e adicionar ao container
        for(const key in resultados){
            
            resultadoElemento.innerHTML += 
            `
            <ul id = "consulta" class = "ul-result">
                <li class = "li-result poppins-semibold">
                    <div class = "display-line">
                        TIPO: ${resultados[key].idEquip} |
                        ID UNICO: ${resultados[key].idEstoque} 
                    </div>
                </li>
            </ul>
            `
            ;

            containerResult.appendChild(resultadoElemento);
        }

    } else {

        // Caso não haja resultados, exibir uma mensagem indicando isso
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum resultado encontrado.";
        containerResult.appendChild(mensagem);
        
    }
}

const exibirEstoque = getEstoque()

exibirEstoque.then(dados => {

    estoque.innerHTML += 
    `
    <ul id = "quantidadeEstoque" class = "ul-result">
        <li class = "li-result poppins-semibold">
            <div class = "display-line">
                QUANTIDADE: ${dados.length}
            </div>
        </li>
    </ul>
    `

    for(const key in dados){

        estoque.innerHTML += 
        `
            <ul id = "consulta" class = "ul-result">
                <li class = "li-result poppins-semibold">
                    <div class = "display-line">
                            TIPO: ${dados[key].idEquip} |
                            ID UNICO: ${dados[key].idEstoque} 
                    </div>
                </li>
            </ul>
        `
    }
})

