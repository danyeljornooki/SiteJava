const cartaoProdutos = document.getElementById('container-produto');

function exibirTodos(){
    const produtosEscondidos = Array.from(cartaoProdutos.getElementsByClassName('d-none'));

    for(const produto of produtosEscondidos){
        produto.classList.remove('d-none');
    }
}

function esconderPokemon(){
    exibirTodos()
    const produtosPokemon = Array.from(cartaoProdutos.getElementsByClassName('pokemon'));
    for(const produto of produtosPokemon){
        produto.classList.add('d-none');
    }

}

function esconderTreinador(){
    exibirTodos()
    const produtosTreinador = Array.from(cartaoProdutos.getElementsByClassName('treinador'));
    for(const produto of produtosTreinador){
        produto.classList.add('d-none');
    }

}

export function inicializarFiltros(){
    document.getElementById('exibir-todos').addEventListener('click', exibirTodos);
    document.getElementById('exibir-treinador').addEventListener('click', esconderPokemon);
    document.getElementById('exibir-pokemon').addEventListener('click', esconderTreinador);
}
