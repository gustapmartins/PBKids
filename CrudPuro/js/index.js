const setLocalStorage = (tarefas) => localStorage.setItem("chave" , JSON.stringify(tarefas))

document.querySelector(".btn").addEventListener("click", (e) => createCard(e))

function createCard(e) {
    e.preventDefault();

    let tarefas = JSON.parse(localStorage.getItem("chave")) || []

    const list = {
        id: Date.now(),
        nome: document.querySelector(".nome").value,
        data: document.querySelector(".data").value,
        valor: document.querySelector(".valor").value,
    }

    tarefas.push(list)

    setLocalStorage(tarefas)
}