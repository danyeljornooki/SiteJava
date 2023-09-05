export const catalogo = [{
    id: "1",
    nome: "Audino",
    tipo: "Pokemon",
    preco: 70,
    nomeArquivoImagem: "prod_1.jpg",
    pokemon: true,
},
{
    id: "2",
    nome: "Baltoy",
    tipo: "Pokemon",
    preco: 80,
    nomeArquivoImagem: "prod_2.jpg",
    pokemon: true,
},
{
    id: "3",
    nome: "Amoongus",
    tipo: "Pokemon",
    preco: 80,
    nomeArquivoImagem: "prod_3.jpg",
    pokemon: true,
},
{
    id: "4",
    nome: "Beartic",
    tipo: "Pokemon",
    preco: 80,
    nomeArquivoImagem: "prod_4.jpg",
    pokemon: true,
},
{
    id: "5",
    nome: "Barboach",
    tipo: "Pokemon",
    preco: 80,
    nomeArquivoImagem: "prod_5.jpg",
    pokemon: true,
},
{
    id: "6",
    nome: "Arboliva",
    tipo: "Pokemon",
    preco: 80,
    nomeArquivoImagem: "prod_6.jpg",
    pokemon: true,
},
{
    id: "7",
    nome: "Arven",
    tipo: "treinador",
    preco: 80,
    nomeArquivoImagem: "prod_7.jpg",
    pokemon: false,
},
{
    id: "8",
    nome: "Armarouge",
    tipo: "Pokemon",
    preco: 80,
    nomeArquivoImagem: "prod_8.jpg",
    pokemon: true,
},
{
    id: "9",
    nome: "Phoebe",
    tipo: "treinador",
    preco: 200,
    nomeArquivoImagem: "prod_9.png",
    pokemon: false,
},
];

export function salvarLocalStorage(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStore(chave){
    localStorage.removeItem(chave);
}

export function desenharProdutoCarrinhoSimples(idProduto, idContainerHtlm, quantidadeProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutoCarrinho = document.getElementById(idContainerHtlm);

    const elementoArticle = document.createElement("article");
    const articleClasses = [
        "d-flex",
        "pedidoFeito",
        "rounded",
        "bg-black",
        "bg-opacity-10",
        "p-1",
        "position-relative",
        "mb-2",
    ];

    for (const articleClass of articleClasses) {
        elementoArticle.classList.add(articleClass);
    }

    const cartaoProdutoCarrinho = `<img src="./img/${produto.nomeArquivoImagem
        }" class="rounded" style="width: 25%" alt="Audino">
      <div class="py-2 d-flex flex-column justify-content-between">
          <p class=" text-dark fs-4 m-0 ms-3 cartao">${produto.tipo}</p>
          <p class=" text-dark fs-6 m-0 ms-3 cartao">${produto.nome}</p>
          <p class=" text-success fs-5 m-0 ms-3">$${produto.preco}</p>
      </div>
      <div class='d-flex align-items-end text-dark  position-absolute bottom-0 end-0 ts-4'>
        <p id='quantidade-${produto.id}' class="ms-2 mb-1 me-4 cartao">Quantidade: ${quantidadeProduto}</p>
      </div>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutoCarrinho.appendChild(elementoArticle);

}