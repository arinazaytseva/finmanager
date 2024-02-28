const modal = document.getElementById("my-modal")
const openModalButton = document.getElementById("open-modal-btn")
const closeModalButton = document.getElementById("close-modal-btn")
let isModalOpened = false

function openModal() {
    modal.style.visibility = "visible"
    modal.style.opacity = 1
    isModalOpened = true
}

function closeModal() {
    modal.style.visibility = "hidden"
    modal.style.opacity = 0
    isModalOpened = false
}

openModalButton.addEventListener("click", () => {
    if (!isModalOpened) {
        openModal()
    }
})

closeModalButton.addEventListener("click", () => {
    if (isModalOpened) {
        closeModal()
    }
})

// const modal = document.getElementById("my-modal")
// const openModalButton = document.getElementById("open-modal-btn")

// openModalButton.addEventListener("click", () => {
//     modal.style.visibility = "hidden"
//     modal.style.opacity = 0
//     isModalOpened = false
// })