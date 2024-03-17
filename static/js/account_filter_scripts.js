// Получаю и отображаю список категорий
const expanseCategories = document.getElementById("expanse-categories")
const filterExpansesBtn = document.getElementById("filter-expanses-btn")
arrayExpanseCategories = []

openModalFilterExpansesBtn.addEventListener("click", async () => {
    // Отправление запроса на получение данных
    const response = await fetch(`/accounts/${account_id}/get-categories`, {
        method: "POST",
        body: JSON.stringify(
            {get: "expanses"}
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // Получаем данные
    const data = await response.json()
    // Получаем и очищаем текущий элемент с id "expanse-categories"
    expanseCategories.innerHTML = ""
    for (let index in data) {
        categoryIsSelected = false
        const category = document.createElement("div")
        category.classList.add("categories__element")
        category.setAttribute("value", `${data[index].id}`)
        category.innerHTML = `${data[index].name}`
        expanseCategories.appendChild(category)
        category.addEventListener("click", () => {
            value = category.getAttribute("value")
            if (!categoryIsSelected) {
                arrayExpanseCategories.push(value)
                category.classList.remove("categories__element")
                category.classList.add("categories__element-selected")
                categoryIsSelected = true
            }
            else {
                newArrayExpanseCategories = arrayExpanseCategories.filter(item => item !== value);
                arrayExpanseCategories = newArrayExpanseCategories
                category.classList.remove("categories__element-selected")
                category.classList.add("categories__element")
                categoryIsSelected = false
            }
        })

    }
})

filterExpansesBtn.addEventListener("click", async () => {
    // Отправление запроса на получение данных
    const response = await fetch(`/accounts/${account_id}/filter`, {
        method: "POST",
        body: JSON.stringify(
            {
                "type": "expanses",
                "id_categories": arrayExpanseCategories,
                "startDateValue": document.getElementById("expanse-start-date").value,
                "endDateValue": document.getElementById("expanse-end-date").value,
                "startAmountValue": document.getElementById("expanse-start-amount").value,
                "endAmountValue": document.getElementById("expanse-end-amount").value
            }
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // Получаем данные
    const data = await response.json()
    // Закрываем модальное окно
    closeModalFilterExpanses()
    // Функция, которая меняет структуры с классом expanses или с классом incomes
    const expansesDiv = document.getElementById("expanses")
    expansesDiv.innerHTML = ""
    const incomesDiv = document.getElementById("incomes")
    incomesDiv.innerHTML = ""
    showExpansesElement(data, expansesDiv)
})

// Получаю и отображаю список категорий
const incomeCategories = document.getElementById("income-categories")
const filterIncomesBtn = document.getElementById("filter-incomes-btn")
arrayIncomeCategories = []

openModalFilterIncomesBtn.addEventListener("click", async () => {
    // Отправление запроса на получение данных
    const response = await fetch(`/accounts/${account_id}/get-categories`, {
        method: "POST",
        body: JSON.stringify(
            {get: "incomes"}
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // Получаем данные
    const data = await response.json()
    // Получаем и очищаем текущий элемент с id "expanse-categories"
    incomeCategories.innerHTML = ""
    for (let index in data) {
        categoryIsSelected = false
        const category = document.createElement("div")
        category.classList.add("categories__element")
        category.setAttribute("value", `${data[index].id}`)
        category.innerHTML = `${data[index].name}`
        incomeCategories.appendChild(category)
        category.addEventListener("click", () => {
            value = category.getAttribute("value")
            if (!categoryIsSelected) {
                arrayIncomeCategories.push(value)
                category.classList.remove("categories__element")
                category.classList.add("categories__element-selected")
                categoryIsSelected = true
            }
            else {
                newArrayIncomeCategories = arrayIncomeCategories.filter(item => item !== value);
                arrayIncomeCategories = newArrayIncomeCategories
                category.classList.remove("categories__element-selected")
                category.classList.add("categories__element")
                categoryIsSelected = false
            }
        })

    }
})

filterIncomesBtn.addEventListener("click", async () => {
    // Отправление запроса на получение данных
    const response = await fetch(`/accounts/${account_id}/filter`, {
        method: "POST",
        body: JSON.stringify(
            {
                "type": "incomes",
                "id_categories": arrayIncomeCategories,
                "startDateValue": document.getElementById("income-start-date").value,
                "endDateValue": document.getElementById("income-end-date").value,
                "startAmountValue": document.getElementById("income-start-amount").value,
                "endAmountValue": document.getElementById("income-end-amount").value
            }
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    // Получаем данные
    const data = await response.json()
    // Закрываем модальное окно
    closeModalFilterIncomes()
    // Функция, которая меняет структуры с классом expanses или с классом incomes
    const incomesDiv = document.getElementById("incomes")
    incomesDiv.innerHTML = ""
    const expansesDiv = document.getElementById("expanses")
    expansesDiv.innerHTML = ""
    showIncomesElement(data, incomesDiv)
})
