const btnMenu = document.getElementById("btn-menu");
const menuNav = document.getElementById("menu-nav");

if (btnMenu && menuNav) {
    btnMenu.addEventListener("click", function () {
        menuNav.classList.toggle("menu-aberto");
    });
}

let carrinho = [];

const btnCarrinho = document.getElementById("btn-carrinho");
const painelCarrinho = document.getElementById("carrinho-painel");
const overlay = document.getElementById("carrinho-overlay");
const btnFechar = document.getElementById("btn-fechar-carrinho");
const listaItens = document.getElementById("carrinho-itens");
const textoVazio = document.getElementById("carrinho-vazio");
const contadorSpan = document.getElementById("carrinho-contador");
const totalSpan = document.getElementById("carrinho-total");
const alerta = document.getElementById("alerta-carrinho");
const btnFinalizar = document.getElementById("btn-finalizar");

const botoesAdicionar = document.querySelectorAll(".btn-adicionar");
gi
for (let i = 0; i < botoesAdicionar.length; i++) {
    botoesAdicionar[i].addEventListener("click", function () {
        const nome = this.getAttribute("data-nome");
        const preco = parseFloat(this.getAttribute("data-preco"));
        const img = this.getAttribute("data-img");

        adicionarAoCarrinho(nome, preco, img);
    });
}
