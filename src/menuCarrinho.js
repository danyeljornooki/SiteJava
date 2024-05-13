import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades.js";

const idsProdutoCarrinhoQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho() {
    document.getElementById("carrinho").classList.remove("invisible");
    document.getElementById("carrinho").classList.add("visible");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("visible");
    document.getElementById("carrinho").classList.add("invisible");
}

function irParaCheckout(){
    if (Object.keys(idsProdutoCarrinhoQuantidade).length === 0) {
        return;
    }
    window.location.href = window.location.origin + "/SiteJavaScript-main/checkout.html";
}

export function inicializarCarrinho() {
    const botaofecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-Carrinho");
    const botaoIrParaCheckout = document.getElementById('finalizar-compra') 

    botaofecharCarrinho.addEventListener("click", fecharCarrinho);
    botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
    atualizarPrecoCarrinho();
    botaoIrParaCheckout.addEventListener('click', irParaCheckout);
}

function removerDoCarrinho(idProduto) {
    delete idsProdutoCarrinhoQuantidade[idProduto];
    salvarLocalStorage('carrinho', idsProdutoCarrinhoQuantidade);
    atualizarPrecoCarrinho();
    renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
    idsProdutoCarrinhoQuantidade[idProduto]++;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
    if (idsProdutoCarrinhoQuantidade[idProduto] === 1) {
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoQuantidade[idProduto]--;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
    document.getElementById("quantidade-" + idProduto).innerText =
        idsProdutoCarrinhoQuantidade[idProduto];
}

function desenharProdutoCarrinho(idProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutoCarrinho = document.getElementById("produtos-carrinho");

    const elementoArticle = document.createElement("article");
    const articleClasses = [
        "d-flex",
        "bg-light",
        "rounded",
        "p-1",
        "position-relative",
        "mb-2",
    ];

    for (const articleClass of articleClasses) {
        elementoArticle.classList.add(articleClass);
    }

    const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id
        }" class="btn text-danger border border-0 position-absolute top-0 end-0 rounded-circle" style="--bs-btn-hover-color: bs-dark;">
          <i class="fa-regular fa-circle-xmark"></i>
      </button>
      <img src="./img/${produto.nomeArquivoImagem
        }" class="w-25 rounded" alt="Audino">
      <div class="py-2 d-flex flex-column justify-content-between">
          <p class=" text-dark-emphasis fs-4 m-0 ms-3">${produto.tipo}</p>
          <p class=" text-body-secondary fs-6 m-0 ms-3">${produto.nome}</p>
          <p class=" text-success fs-5 m-0 ms-3">$${produto.preco}</p>
      </div>
      <div class='d-flex align-items-end text-dark  position-absolute bottom-0 end-0 ts-4'>
        <button id="decrementar-produto-${produto.id}" class="btn">-</button>
        <p id='quantidade-${produto.id}' class="ms-2 mb-1">${idsProdutoCarrinhoQuantidade[produto.id]
        }</p>
        <button id="incrementar-produto-${produto.id
        }" class='btn ms-2'>+</button>
      </div>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutoCarrinho.appendChild(elementoArticle);

    document
        .getElementById(`decrementar-produto-${produto.id}`)
        .addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

    document
        .getElementById(`incrementar-produto-${produto.id}`)
        .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

    document
        .getElementById(`remover-item-${produto.id}`)
        .addEventListener("click", () => removerDoCarrinho(produto.id));
    atualizarPrecoCarrinho();

}

export function renderizarProdutosCarrinho() {
    const containerProdutoCarrinho = document.getElementById("produtos-carrinho");
    containerProdutoCarrinho.innerHTML = "";
    for (const idProduto in idsProdutoCarrinhoQuantidade) {
        desenharProdutoCarrinho(idProduto);
    }
}

export function adicionarAoCarrinho(idProduto) {
    if (idProduto in idsProdutoCarrinhoQuantidade) {
        incrementarQuantidadeProduto(idProduto);
        return;
    }

    idsProdutoCarrinhoQuantidade[idProduto] = 1;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoQuantidade);
    desenharProdutoCarrinho(idProduto);
}

export function atualizarPrecoCarrinho() {
    const precoCarrinho = document.getElementById('preco-total');
    let precoTotalCarrinho = 0;
    for (const idProdutoCarrinho in idsProdutoCarrinhoQuantidade) {
        precoTotalCarrinho += catalogo.find(p => p.id == idProdutoCarrinho).preco * idsProdutoCarrinhoQuantidade[idProdutoCarrinho];
    }
    precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
}