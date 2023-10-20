export const setLocalStorage = (getLocalStorage) => localStorage.setItem("chave" , JSON.stringify(getLocalStorage))

export const getLocalStorage = JSON.parse(localStorage.getItem("chave")) || []