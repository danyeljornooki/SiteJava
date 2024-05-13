import { desenharProdutoCarrinhoSimples, lerLocalStorage, apagarDoLocalStore, salvarLocalStorage } from "/src/utilidades.js";

function desenhaProdutosCheckout(){
    const idsProdutoCarrinhoQuantidade = lerLocalStorage('carrinho') ?? {};
    for(const idProduto in idsProdutoCarrinhoQuantidade){
        desenharProdutoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoQuantidade[idProduto])
    }
}

function finalizarCompra(evento){
    evento.preventDefault();
    const idsProdutoCarrinhoQuantidade = lerLocalStorage('carrinho') ?? {};
    if(Object.keys(idsProdutoCarrinhoQuantidade).length === 0 ){
        return;
    }

    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoQuantidade
    }
    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage('historico', historicoDePedidosAtualizado);
    apagarDoLocalStore('carrinho');

    window.location.href = window.location.origin + '/pedidos.html';
}

desenhaProdutosCheckout();

document.addEventListener('submit', (evt) => finalizarCompra(evt));
