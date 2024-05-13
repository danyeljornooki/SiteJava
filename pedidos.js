import { lerLocalStorage, desenharProdutoCarrinhoSimples } from "/SiteJavaScript-main/src/utilidades.js";

function alterarStyle(){
    const pedidos =  Array.from(document.getElementsByClassName('pedidoFeito'));
    const pedidoFt =  Array.from(document.getElementsByClassName('cartao'));
    for(const style of pedidos){
        style.classList.remove('bg-opacity-10', 'bg-black');
        style.classList.add('border', 'w-50','h-50', 'bg-dark');
    }
    for(const style of pedidoFt){
        style.classList.remove('text-dark');
        style.classList.add('text-light');

    }
}

function criarPedidoHistorico(pedidoComData) {
    
    const elementoPedido = `<p class='ts-2 fw-bold m-4 '>${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-BR', {hour:'2-digit', minute:'2-digit'})}</p>
    <section class='p-3 rounded w-50 mb-2 d-flex flex-column align-items-center' id='container-pedidos-${pedidoComData.dataPedido}'></section>
    `;
    
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML += elementoPedido;

    
    for (const idProduto in pedidoComData.pedido) {
        desenharProdutoCarrinhoSimples(idProduto, `container-pedidos-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto]);
    }
}

function reenderizarHistoricoPedidos(){
    const historico = lerLocalStorage('historico');
    for(const pedidoComData of historico){
        criarPedidoHistorico(pedidoComData);
    }
}

reenderizarHistoricoPedidos();
alterarStyle();