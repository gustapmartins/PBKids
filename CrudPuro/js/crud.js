const listContainer = document.querySelector(".list");
const editId = document.querySelector(".editId");
const editNome = document.querySelector(".editNome");
const editValor = document.querySelector(".editValor")
const editData = document.querySelector(".editData");
const price = document.querySelector(".price");
const modalBackDrop = document.querySelector(".modal-backdrop");
const modalEdit = document.querySelector(".modalEdit");

let getLocalStorage = JSON.parse(localStorage.getItem("chave")) || []
const setLocalStorage = (getLocalStorage) => localStorage.setItem("chave", JSON.stringify(getLocalStorage))

window.addEventListener("load", () => {
    totalValor();
    updateList();
})

function updateList() {
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

    getLocalStorage.forEach(element => {
        soma += parseInt(element.valor);
    });

    price.innerHTML = `Total: R$ ${soma.toFixed(2)}`;
}

function DeleteCard(id) {
    getLocalStorage = getLocalStorage.filter(item => item.id !== id);

    setLocalStorage(getLocalStorage);
    totalValor();
    updateList();
}

function EditCard(id) {

    let tarefa = getLocalStorage.find((item) => item.id == id)

    if (tarefa) {
        editId.innerHTML = tarefa.id;
        editNome.value = tarefa.nome;
        editValor.value = tarefa.valor;
        editData.value = tarefa.data;

        modalBackDrop.style.display = "block";
        modalEdit.style.display = "block";
    }
}

document.querySelector("#editToyForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const Id = editId.innerHTML;
    const Nome = editNome.value
    const Valor = parseFloat(editValor.value);
    const Data = editData.value 

    // Atualize o item na lista
    getLocalStorage.forEach((item) => {
        if (item.id == Id) {
            item.nome = Nome;
            item.valor = Valor;
            item.data = Data;
        }
    });

    setLocalStorage(getLocalStorage);

    modalBackDrop.style.display = "none";
    modalEdit.style.display = "none";

    totalValor();
    updateList();
});
