import { adicionarAoCarrinho } from "./menuCarrinho.js";
import { catalogo } from "./utilidades.js";

export function renderizarCatalogo() {
    for (const produtoCatalogo of catalogo) {
        const cartaoProduto = `<div class="shadow rounded w-25 p-2 m-2 d-flex flex-column  justify-content-between ${produtoCatalogo.pokemon ? 'pokemon' : 'treinador'}" id="card-produto${produtoCatalogo.id}">
        <div class="text-center w-100 h-100">
            <img class="img-thumbnail bg-body-secondary border-0 roundedP" src="./img/${produtoCatalogo.nomeArquivoImagem}" alt="Produto 1.">
        </div>
          <p class='fs-4 m-0 ms-3'>${produtoCatalogo.tipo}</p>
          <p class='fs-6 m-0 ms-3'>${produtoCatalogo.nome}</p>
          <p class='fs-5 m-0 ms-3'>$${produtoCatalogo.preco}</p>
          <button id="adicionar-${produtoCatalogo.id}" class='btn btn-outline-dark border border-0'><i class="fa-solid fa-cart-plus"></i></button>
      </div>`;

        document.getElementById("container-produto").innerHTML += cartaoProduto;
        document.getElementById(`adicionar-${produtoCatalogo.id}`);
    }

    for (const produtoCatalogo of catalogo) {
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id));
    }
}