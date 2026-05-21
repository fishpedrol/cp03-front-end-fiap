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

for (let i = 0; i < botoesAdicionar.length; i++) {
    botoesAdicionar[i].addEventListener("click", function () {
        const nome = this.getAttribute("data-nome");
        const preco = parseFloat(this.getAttribute("data-preco"));
        const img = this.getAttribute("data-img");

        adicionarAoCarrinho(nome, preco, img);
    });
}

function adicionarAoCarrinho(nome, preco, img) {
    let encontrou = false;

    for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].nome === nome) {
            carrinho[i].quantidade = carrinho[i].quantidade + 1;
            encontrou = true;
            break;
        }
    }

    if (!encontrou) {
        const produto = {
            nome: nome,
            preco: preco,
            img: img,
            quantidade: 1
        };
        carrinho.push(produto);
    }

    atualizarCarrinho();
    mostrarAlerta();
}

function removerDoCarrinho(indicenindice) {
    carrinho.splice(indice, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    contadorSpan.textContent = totalItens;
    textoVazio.style.display = carrinho.length === 0 ? "block" : "none";
    listaItens.innerHTML = "";

    carrinho.forEach((item, indice) => {
        const precoFormatado = item.preco.toFixed(2).replace(".", ",");

        listaItens.innerHTML += `
            <div class="carrinho-item">
                <img src="${item.img}" alt="${item.nome}">
                <div class="carrinho-item-info">
                    <p>${item.nome}</p>
                    <span>R$ ${precoFormatado} x ${item.quantidade}</span>
                </div>
                <button class="btn-remover" onclick="removerDoCarrinho(${indice})">✕</button>
            </div>
        `;
    });

    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    totalSpan.textContent = total.toFixed(2).replace(".", ",");
}

function abrirCarrinho() {
    painelCarrinho.classList.add("aberto");
    overlay.classList.add("ativo");
}

function fecharCarrinho() {
    painelCarrinho.classList.remove("aberto");
    overlay.classList.remove("ativo");
}

function mostrarAlerta() {
    alerta.classList.add("visivel");
    setTimeout(() => {
        alerta.classList.remove("visivel");
    }, 2000);
}

if (btnCarrinho) btnCarrinho.addEventListener("click", abrirCarrinho);
if (btnFechar) btnFechar.addEventListener("click", fecharCarrinho);
if (overlay) overlay.addEventListener("click", fecharCarrinho);

if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio! Adicione produtos antes de finalizar.");
        } else {
            alert("Compra finalizada com sucesso! 🎮 Obrigado por comprar na GameZone!");
            carrinho = [];
            atualizarCarrinho();
            fecharCarrinho();
        }
    });
}

