// Кнопки сортирвоки расходов по ...
const sortExpansesByDateBtn = document.getElementById("sort_expanses_by_date_btn")
const sortExpansesByCategoryBtn = document.getElementById("sort_expanses_by_category_btn")
const sortExpansesByAmountBtn = document.getElementById("sort_expanses_by_amount_btn")

let sortExpansesByDateOrder = "desc" // Начальный порядок сортировки расходов по дате
let sortExpansesByCategoryOrder = "desc" // Начальный порядок сортировки расходов по категории
let sortExpansesByAmountOrder = "desc" // Начальный порядок сортировки расходов по сумме

// Кнопки сортирвоки доходов по ...
const sortIncomesByDateBtn = document.getElementById("sort_incomes_by_date_btn")
const sortIncomesByCategoryBtn = document.getElementById("sort_incomes_by_category_btn")
const sortIncomesByAmountBtn = document.getElementById("sort_incomes_by_amount_btn")

let sortIncomesByDateOrder = "desc" // Начальный порядок сортировки доходов по дате
let sortIncomesByCategoryOrder = "desc" // Начальный порядок сортировки доходов по категории
let sortIncomesByAmountOrder = "desc" // Начальный порядок сортировки доходов по сумме

let account_id = sortExpansesByDateBtn.getAttribute("account_id") // Получаем значение account_id

function showExpansesElement(data, mainElement) {
    // Функция, которая меняет структуры с классом expanses или с классом incomes
    for (let index in data) {
        // Создаем элемент с классом "operation"
        const operationDiv = document.createElement("div")
        operationDiv.classList.add("operation")
        // Создаем элемент с классом "operation-date" и добавляем в operationDiv
        const operationDateDiv = document.createElement("div")
        operationDateDiv.classList.add("operation-date")
        operationDateDiv.innerHTML = `<p>${data[index].day}/${data[index].month}/${data[index].year}</p>`
        operationDiv.appendChild(operationDateDiv)
        // Создаем элемент с классом "operation-category" и добавляем в operationDiv
        const operationCategoryDiv = document.createElement("div")
        operationCategoryDiv.classList.add("operation-category")
        operationCategoryDiv.innerHTML = `<p>${data[index].name_category}</p>`
        operationDiv.appendChild(operationCategoryDiv)
        // Создаем элемент с классом "operation-amount" и добавляем в operationDiv
        const operationAmountDiv = document.createElement("div")
        operationAmountDiv.classList.add("operation-amount")
        operationAmountDiv.innerHTML = `<p>${data[index].amount}</p>`
        operationDiv.appendChild(operationAmountDiv)
        // Создаем элемент с классом "change-operation" и добавляем в operationDiv
        const changeOperationDiv = document.createElement("div")
        changeOperationDiv.classList.add( "change-operation")
        changeOperationDiv.innerHTML = `<p><i account_id=${account_id} expanse_id=${data[index].id} class="fa-solid fa-pen open-modal-change-delete-expanse-btn"></i></p>`
        operationDiv.appendChild(changeOperationDiv)
        // Добавляем в элемент с классом expanses
        mainElement.appendChild(operationDiv)
    }
    addEventExpanseListeners()
}

function showIncomesElement(data, mainElement) {
    // Функция, которая меняет структуры с классом expanses или с классом incomes
    for (let index in data) {
        // Создаем элемент с классом "operation"
        const operationDiv = document.createElement("div")
        operationDiv.classList.add("operation")
        // Создаем элемент с классом "operation-date" и добавляем в operationDiv
        const operationDateDiv = document.createElement("div")
        operationDateDiv.classList.add("operation-date")
        operationDateDiv.innerHTML = `<p>${data[index].day}/${data[index].month}/${data[index].year}</p>`
        operationDiv.appendChild(operationDateDiv)
        // Создаем элемент с классом "operation-category" и добавляем в operationDiv
        const operationCategoryDiv = document.createElement("div")
        operationCategoryDiv.classList.add("operation-category")
        operationCategoryDiv.innerHTML = `<p>${data[index].name_category}</p>`
        operationDiv.appendChild(operationCategoryDiv)
        // Создаем элемент с классом "operation-amount" и добавляем в operationDiv
        const operationAmountDiv = document.createElement("div")
        operationAmountDiv.classList.add("operation-amount")
        operationAmountDiv.innerHTML = `<p>${data[index].amount}</p>`
        operationDiv.appendChild(operationAmountDiv)
        // Создаем элемент с классом "change-operation" и добавляем в operationDiv
        const changeOperationDiv = document.createElement("div")
        changeOperationDiv.classList.add( "change-operation")
        changeOperationDiv.innerHTML = `<p><i account_id=${account_id} income_id=${data[index].id} class="fa-solid fa-pen open-modal-change-delete-income-btn"></i></p>`
        operationDiv.appendChild(changeOperationDiv)
        // Добавляем в элемент с классом expanses
        mainElement.appendChild(operationDiv)
    }
    addEventIncomeListeners()
}

function defineOrder(sortSmthBySomeOrder) {
    // Смена порядка сортировки
    if (sortSmthBySomeOrder === "desc") {
        sortSmthBySomeOrder = "asc"
    }
    else if (sortSmthBySomeOrder === "asc") {
        sortSmthBySomeOrder = "desc"
    }
    return(sortSmthBySomeOrder)
}
// Расходы
// Сортировка расходов по полю Дата
sortExpansesByDateBtn.addEventListener("click", async () => {
    // Отправление запроса на получение данных
    sortExpansesByDateOrder = defineOrder(sortExpansesByDateOrder)
    const response = await fetch(`/accounts/${account_id}/sort`, {
        method: "POST",
        body: JSON.stringify(
            {sort: "expanses", sortBy: "date", order: `${sortExpansesByDateOrder}`}
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // Получаем данные
    const data = await response.json()
    // Получаем и очищаем текущий элемент с id "expanses"
    const expansesDiv = document.getElementById("expanses")
    expansesDiv.innerHTML = ""
    showExpansesElement(data, expansesDiv)
})
// Сортировка расходов по полю Категория
sortExpansesByCategoryBtn.addEventListener("click", async () => {
    // Отправление запроса на получение данных
    sortExpansesByCategoryOrder = defineOrder(sortExpansesByCategoryOrder)
    
    const response = await fetch(`/accounts/${account_id}/sort`, {
        method: "POST",
        body: JSON.stringify(
            {sort: "expanses", sortBy: "category", order: `${sortExpansesByCategoryOrder}`}
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // Получаем данные
    const data = await response.json()
    // Получаем и очищаем текущий элемент с id "expanses"
    const expansesDiv = document.getElementById("expanses")
    expansesDiv.innerHTML = ""
    showExpansesElement(data, expansesDiv)
})
// Сортировка расходов по полю Сумма
sortExpansesByAmountBtn.addEventListener("click", async () => {
    // Отправление запроса на получение данных
    sortExpansesByAmountOrder = defineOrder(sortExpansesByAmountOrder)
    
    const response = await fetch(`/accounts/${account_id}/sort`, {
        method: "POST",
        body: JSON.stringify(
            {sort: "expanses", sortBy: "amount", order: `${sortExpansesByAmountOrder}`}
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // Получаем данные
    const data = await response.json()
    // Получаем и очищаем текущий элемент с id "expanses"
    const expansesDiv = document.getElementById("expanses")
    expansesDiv.innerHTML = ""
    showExpansesElement(data, expansesDiv)
})
// Доходы
// Сортировка доходов по полю Дата
sortIncomesByDateBtn.addEventListener("click", async () => {
    // Отправление запроса на получение данных
    sortIncomesByDateOrder = defineOrder(sortIncomesByDateOrder)
    const response = await fetch(`/accounts/${account_id}/sort`, {
        method: "POST",
        body: JSON.stringify(
            {sort: "incomes", sortBy: "date", order: `${sortIncomesByDateOrder}`}
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // Получаем данные
    const data = await response.json()
    // Получаем и очищаем текущий элемент с id "incomes"
    const incomesDiv = document.getElementById("incomes")
    incomesDiv.innerHTML = ""
    showIncomesElement(data, incomesDiv)
})
// Сортировка доходов по полю Категория
sortIncomesByCategoryBtn.addEventListener("click", async () => {
    // Отправление запроса на получение данных
    sortIncomesByCategoryOrder = defineOrder(sortIncomesByCategoryOrder)
    
    const response = await fetch(`/accounts/${account_id}/sort`, {
        method: "POST",
        body: JSON.stringify(
            {sort: "incomes", sortBy: "category", order: `${sortIncomesByCategoryOrder}`}
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // Получаем данные
    const data = await response.json()
    // Получаем и очищаем текущий элемент с id "expanses"
    const incomesDiv = document.getElementById("incomes")
    incomesDiv.innerHTML = ""
    showIncomesElement(data, incomesDiv)
})
// Сортировка доходов по полю Сумма
sortIncomesByAmountBtn.addEventListener("click", async () => {
    // Отправление запроса на получение данных
    sortIncomesByAmountOrder = defineOrder(sortIncomesByAmountOrder)
    
    const response = await fetch(`/accounts/${account_id}/sort`, {
        method: "POST",
        body: JSON.stringify(
            {sort: "incomes", sortBy: "amount", order: `${sortIncomesByAmountOrder}`}
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // Получаем данные
    const data = await response.json()
    // Получаем и очищаем текущий элемент с id "expanses"
    const incomesDiv = document.getElementById("incomes")
    incomesDiv.innerHTML = ""
    showIncomesElement(data, incomesDiv)
})