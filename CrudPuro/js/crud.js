list = [];

let getLocalStorage = JSON.parse(localStorage.getItem("chave")) || []
const setLocalStorage = (getLocalStorage) => localStorage.setItem("chave", JSON.stringify(getLocalStorage))

window.addEventListener("load", () => {
    totalValor();
    updateList();
})

function updateList() {
    const listContainer = document.querySelector(".list");
    listContainer.innerHTML = "";

    getLocalStorage.forEach((tarefa) => renderCard(tarefa, listContainer))
}

function renderCard(element, listContainer) {
    const card = document.createElement("tr")
    card.innerHTML += `
        <td>${element.nome}</td>
        <td>R$ ${parseInt(element.valor).toFixed(2)}</td>
        <td>${element.data}</td>
        <td>
            <a class="btn-small waves-effect waves-light green" onClick="EditCard(${element.id})">
                <i class="material-icons">edit</i> 
            </a>
            <a class="btn-small waves-effect waves-light red" onClick="DeleteCard(${element.id})">
                <i class="material-icons">delete</i> 
            </a>
        </td>
    `

    listContainer.appendChild(card)
}

function totalValor() {
    let soma = 0; // Zere o valor antes de recalcular

    let getLocalStorage = JSON.parse(localStorage.getItem("chave")) || [];

    getLocalStorage.forEach(element => {
        soma += parseInt(element.valor);
    });

    document.querySelector(".price").innerHTML = `Total: R$ ${soma.toFixed(2)}`;
}



function DeleteCard(id) {

    list = getLocalStorage.filter(item => item.id !== id);


    setLocalStorage(list);
    totalValor();
    updateList();
    
}

function EditCard(id) {

    let tarefa = getLocalStorage.find((item) => item.id == id)

    if (tarefa) {
        document.querySelector(".editId").innerHTML = tarefa.id;
        document.querySelector(".editNome").value = tarefa.nome;
        document.querySelector(".editValor").value = tarefa.valor;
        document.querySelector(".editData").value = tarefa.data;

        document.querySelector(".modal-backdrop").style.display = "block";
        document.querySelector(".modalEdit").style.display = "block";
    }
}

document.querySelector("#editToyForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const editId = document.querySelector(".editId").innerHTML;
    const editNome = document.querySelector(".editNome").value
    const editValor = parseFloat(document.querySelector(".editValor").value);
    const editData = document.querySelector(".editData").value

    // Atualize o item na lista
    getLocalStorage.forEach((item) => {
        if (item.id == editId) {
            item.nome = editNome;
            item.valor = editValor;
            item.data = editData;
        }
    });

    setLocalStorage(getLocalStorage);

    document.querySelector(".modal-backdrop").style.display = "none";
    document.querySelector(".modalEdit").style.display = "none";

    totalValor();
    updateList();
});
