import { renderizarCatalogo } from "./src/cartaoProduto.js"
import { inicializarFiltros } from "./src/filtros.js"
import { inicializarCarrinho, atualizarPrecoCarrinho, renderizarProdutosCarrinho } from "./src/menuCarrinho.js"

renderizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();