const nomeCreate = document.querySelector(".nome");
const dataCreate = document.querySelector(".data");
const valorCreate = document.querySelector(".valor");

let getLocalStorage = JSON.parse(localStorage.getItem("chave")) || []
const setLocalStorage = (tarefas) => localStorage.setItem("chave" , JSON.stringify(tarefas))

function createCard(e) {
    e.preventDefault();

    const list = {
        id: Date.now(),
        nome: nomeCreate.value,
        data: dataCreate.value,
        valor: valorCreate.value,
    }

    getLocalStorage.push(list)

    setLocalStorage(getLocalStorage)
}

document.querySelector(".btn").addEventListener("click", (e) => createCard(e))