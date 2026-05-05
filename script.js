class PedidoDTO {
    constructor(cliente, telefone, doce, bebida, preco) {
        this.cliente = cliente;
        this.telefone = telefone;
        this.doce = doce;
        this.bebida = bebida;
        this.preco = preco;
    }

    validar() {
        if (!this.cliente) {
            throw new Error("Nome obrigatório!");
        }

        if (!this.telefone) {
            throw new Error("Telefone obrigatório!");
        }

        if (!this.doce && !this.bebida) {
            throw new Error("Escolha pelo menos um item!");
        }

        if (isNaN(this.preco) || this.preco <= 0) {
            throw new Error("Preço inválido.");
        }

        return true;
    }
}

let pedidos = [];

const precosDoces = {
    "Brigadeiro": 5,
    "Bolo de Cenoura": 15,
    "Bolo de Laranja": 15,
    "Palha Italiana": 8,
    "Copo da Felicidade": 12
};

const precosBebidas = {
    "Coca-Cola": 6,
    "Água": 3,
    "Suco de maracujá": 7
};

function atualizarPreco() {
    const doce = document.getElementById("doces").value;
    const bebida = document.getElementById("bebidas").value;

    const precoDoce = precosDoces[doce] || 0;
    const precoBebida = precosBebidas[bebida] || 0;

    document.getElementById("preco").value = precoDoce + precoBebida || "";
}

document.getElementById("doces").addEventListener("change", atualizarPreco);
document.getElementById("bebidas").addEventListener("change", atualizarPreco);

function adicionarPedido() {
    try {
        const cliente = document.getElementById("cliente").value;
        const telefone = document.getElementById("telefone").value;
        const doce = document.getElementById("doces").value;
        const bebida = document.getElementById("bebidas").value;
        const preco = parseFloat(document.getElementById("preco").value);

        const pedido = new PedidoDTO(cliente, telefone, doce, bebida, preco);
        pedido.validar();

        pedidos.push(pedido);

        atualizarLista();

        // limpar campos
        document.getElementById("cliente").value = "";
        document.getElementById("telefone").value = "";
        document.getElementById("doces").value = "";
        document.getElementById("bebidas").value = "";
        document.getElementById("preco").value = "";

    } catch (erro) {
        alert(erro.message);
    }
}

function atualizarLista() {
    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    pedidos.forEach((p) => {
        const li = document.createElement("li");

        li.innerHTML = `
            Cliente: ${p.cliente} <br>
            Telefone: ${p.telefone} <br>
            Doce: ${p.doce || "—"} <br>
            Bebida: ${p.bebida || "—"} <br>
            Preço: R$ ${p.preco.toFixed(2)}
        `;

        lista.appendChild(li);
    });

    const total = pedidos.reduce((soma, p) => soma + p.preco, 0);
    document.getElementById("totalPedidos").innerText =
        "Total: R$ " + total.toFixed(2);
}