document.getElementById('amount-input').addEventListener("input", function(e) {
    this.value = this.value.replace(/[^0-9.]/g, ''); // Удаляем все символы, кроме цифр и точки
});
// Button Добавить
// 1
const modalAddSmth = document.getElementById("modal-add-smth")
const openModalAddSmthBtn = document.getElementById("open-modal-add-smth-btn")
const closeModalAddSmthBtn = document.getElementById("close-modal-add-smth-btn")
let isModalAddSmthOpened = false

function openModalAddSmth() {
    modalAddSmth.style.visibility = "visible"
    modalAddSmth.style.opacity = 1
    isModalAddSmthOpened = true
}
function closeModalAddSmth() {
    modalAddSmth.style.visibility = "hidden"
    modalAddSmth.style.opacity = 0
    isModalAddSmthOpened = false
}

openModalAddSmthBtn.addEventListener("click", () => {
    if (!isModalAddSmthOpened) {
        openModalAddSmth()
    }
})
closeModalAddSmthBtn.addEventListener("click", () => {
    if (isModalAddSmthOpened) {
        closeModalAddSmth()
    }
})
modalAddSmth.addEventListener("click", (event) => {
    if (event.target === modalAddSmth) {
        closeModalAddSmth()
    }
})
// 1.1
const modalChooseOperationType = document.getElementById("modal-choose-operation-type")
const openModalChooseOperationTypeBtn = document.getElementById("open-modal-choose-operation-type-btn")
const closeModalChooseOperationTypeBtn = document.getElementById("close-modal-choose-operation-type-btn")
let isModalChooseOperationTypeOpened = false

function openModalChooseOperationType() {
    modalChooseOperationType.style.visibility = "visible"
    modalChooseOperationType.style.opacity = 1
    isModalChooseOperationTypeOpened = true
}
function closeModalChooseOperationType() {
    modalChooseOperationType.style.visibility = "hidden"
    modalChooseOperationType.style.opacity = 0
    isModalChooseOperationTypeOpened = false
}

openModalChooseOperationTypeBtn.addEventListener("click", () => {
    if (!isModalChooseOperationTypeOpened) {
        openModalChooseOperationType()
        closeModalAddSmth()
    }
})
closeModalChooseOperationTypeBtn.addEventListener("click", () => {
    if (isModalChooseOperationTypeOpened) {
        closeModalChooseOperationType()
    }
})
modalChooseOperationType.addEventListener("click", (event) => {
    if (event.target === modalChooseOperationType) {
        closeModalChooseOperationType()
    }
})
// 1.2
const modalChooseCategoryType = document.getElementById("modal-choose-category-type")
const openModalChooseCategoryTypeBtn = document.getElementById("open-modal-choose-category-type-btn")
const closeModalChooseCategoryTypeBtn = document.getElementById("close-modal-choose-category-type-btn")
let isModalChooseCategoryTypeOpened = false

function openModalChooseCategoryType() {
    modalChooseCategoryType.style.visibility = "visible"
    modalChooseCategoryType.style.opacity = 1
    isModalChooseCategoryTypeOpened = true
}
function closeModalChooseCategoryType() {
    modalChooseCategoryType.style.visibility = "hidden"
    modalChooseCategoryType.style.opacity = 0
    isModalChooseCategoryTypeOpened = false
}

openModalChooseCategoryTypeBtn.addEventListener("click", () => {
    if (!isModalChooseCategoryTypeOpened) {
        openModalChooseCategoryType()
        closeModalAddSmth()
    }
})
closeModalChooseCategoryTypeBtn.addEventListener("click", () => {
    if (isModalChooseCategoryTypeOpened) {
        closeModalChooseCategoryType()
    }
})
modalChooseCategoryType.addEventListener("click", (event) => {
    if (event.target === modalChooseCategoryType) {
        closeModalChooseCategoryType()
    }
})
// 1.1.1
const modalAddExpanse = document.getElementById("modal-add-expanse")
const openModalAddExpanseBtn = document.getElementById("open-modal-add-expanse-btn")
const closeModalAddExpanseBtn = document.getElementById("close-modal-add-expanse-btn")
let isModalAddExpanseOpened = false

function openModalAddExpanse() {
    modalAddExpanse.style.visibility = "visible"
    modalAddExpanse.style.opacity = 1
    isModalAddExpanseOpened = true
}
function closeModalAddExpanse() {
    modalAddExpanse.style.visibility = "hidden"
    modalAddExpanse.style.opacity = 0
    isModalAddExpanseOpened = false
}

openModalAddExpanseBtn.addEventListener("click", () => {
    if (!isModalAddExpanseOpened) {
        openModalAddExpanse()
        closeModalChooseOperationType()
    }
})
closeModalAddExpanseBtn.addEventListener("click", () => {
    if (isModalAddExpanseOpened) {
        closeModalAddExpanse()
    }
})
modalAddExpanse.addEventListener("click", (event) => {
    if (event.target === modalAddExpanse) {
        closeModalAddExpanse()
    }
})
// 1.1.2
const modalAddIncome = document.getElementById("modal-add-income")
const openModalAddIncomeBtn = document.getElementById("open-modal-add-income-btn")
const closeModalAddIncomeBtn = document.getElementById("close-modal-add-income-btn")
let isModalAddIncomeOpened = false

function openModalAddIncome() {
    modalAddIncome.style.visibility = "visible"
    modalAddIncome.style.opacity = 1
    isModalAddIncomeOpened = true
}
function closeModalAddIncome() {
    modalAddIncome.style.visibility = "hidden"
    modalAddIncome.style.opacity = 0
    isModalAddIncomeOpened = false
}

openModalAddIncomeBtn.addEventListener("click", () => {
    if (!isModalAddIncomeOpened) {
        openModalAddIncome()
        closeModalChooseOperationType()
    }
})
closeModalAddIncomeBtn.addEventListener("click", () => {
    if (isModalAddIncomeOpened) {
        closeModalAddIncome()
    }
})
modalAddIncome.addEventListener("click", (event) => {
    if (event.target === modalAddIncome) {
        closeModalAddIncome()
    }
})
// 1.2.1
const modalAddExpanseCategory = document.getElementById("modal-add-expanse-category")
const openModalAddExpanseCategoryBtn = document.getElementById("open-modal-add-expanse-category-btn")
const closeModalAddExpanseCategoryBtn = document.getElementById("close-modal-add-expanse-category-btn")
let isModalAddExpanseCategoryOpened = false

function openModalAddExpanseCategory() {
    modalAddExpanseCategory.style.visibility = "visible"
    modalAddExpanseCategory.style.opacity = 1
    isModalAddExpanseCategoryOpened = true
}
function closeModalAddExpanseCategory() {
    modalAddExpanseCategory.style.visibility = "hidden"
    modalAddExpanseCategory.style.opacity = 0
    isModalAddExpanseCategoryOpened = false
}

openModalAddExpanseCategoryBtn.addEventListener("click", () => {
    if (!isModalAddExpanseCategoryOpened) {
        openModalAddExpanseCategory()
        closeModalChooseCategoryType()
    }
})
closeModalAddExpanseCategoryBtn.addEventListener("click", () => {
    if (isModalAddExpanseCategoryOpened) {
        closeModalAddExpanseCategory()
    }
})
modalAddExpanseCategory.addEventListener("click", (event) => {
    if (event.target === modalAddExpanseCategory) {
        closeModalAddExpanseCategory()
    }
})
// 1.2.2
const modalAddIncomeCategory = document.getElementById("modal-add-income-category")
const openModalAddIncomeCategoryBtn = document.getElementById("open-modal-add-income-category-btn")
const closeModalAddIncomeCategoryBtn = document.getElementById("close-modal-add-income-category-btn")
let isModalAddIncomeCategoryOpened = false

function openModalAddIncomeCategory() {
    modalAddIncomeCategory.style.visibility = "visible"
    modalAddIncomeCategory.style.opacity = 1
    isModalAddIncomeCategoryOpened = true
}
function closeModalAddIncomeCategory() {
    modalAddIncomeCategory.style.visibility = "hidden"
    modalAddIncomeCategory.style.opacity = 0
    isModalAddIncomeCategoryOpened = false
}

openModalAddIncomeCategoryBtn.addEventListener("click", () => {
    if (!isModalAddIncomeCategoryOpened) {
        openModalAddIncomeCategory()
        closeModalChooseCategoryType()
    }
})
closeModalAddIncomeCategoryBtn.addEventListener("click", () => {
    if (isModalAddIncomeCategoryOpened) {
        closeModalAddIncomeCategory()
    }
})
modalAddIncomeCategory.addEventListener("click", (event) => {
    if (event.target === modalAddIncomeCategory) {
        closeModalAddIncomeCategory()
    }
})
// Button Переимновать категорию/счет
// 1
const modalChangeName = document.getElementById("modal-change-name")
const openModalChangeNameBtn = document.getElementById("open-modal-change-name-btn")
const closeModalChangeNameBtn = document.getElementById("close-modal-change-name-btn")
let isModalChangeNameOpened = false

function openModalChangeName() {
    modalChangeName.style.visibility = "visible"
    modalChangeName.style.opacity = 1
    isModalChangeNameOpened = true
}
function closeModalChangeName() {
    modalChangeName.style.visibility = "hidden"
    modalChangeName.style.opacity = 0
    isModalChangeNameOpened = false
}

openModalChangeNameBtn.addEventListener("click", () => {
    if (!isModalChangeNameOpened) {
        openModalChangeName()
    }
})
closeModalChangeNameBtn.addEventListener("click", () => {
    if (isModalChangeNameOpened) {
        closeModalChangeName()
    }
})
modalChangeName.addEventListener("click", (event) => {
    if (event.target === modalChangeName) {
        closeModalChangeName()
    }
})
// Button Переименовать категорию
// 1.1
const modalChangeCategoryNameChooseCategoryType = document.getElementById("modal-change-category-name-choose-category-type")
const openModalChangeCategoryNameChooseCategoryTypeBtn = document.getElementById("open-modal-change-category-name-choose-category-type-btn")
const closeModalChangeCategoryNameChooseCategoryTypeBtn = document.getElementById("close-modal-change-category-name-choose-category-type-btn")
let isModalChangeCategoryNameChooseCategoryTypeOpened = false

function openModalChangeCategoryNameChooseCategoryType() {
    modalChangeCategoryNameChooseCategoryType.style.visibility = "visible"
    modalChangeCategoryNameChooseCategoryType.style.opacity = 1
    isModalChangeCategoryNameChooseCategoryTypeOpened = true
}
function closeModalChangeCategoryNameChooseCategoryType() {
    modalChangeCategoryNameChooseCategoryType.style.visibility = "hidden"
    modalChangeCategoryNameChooseCategoryType.style.opacity = 0
    isModalChangeCategoryNameChooseCategoryTypeOpened = false
}

openModalChangeCategoryNameChooseCategoryTypeBtn.addEventListener("click", () => {
    if (!isModalChangeCategoryNameChooseCategoryTypeOpened) {
        openModalChangeCategoryNameChooseCategoryType()
        closeModalChangeName()
    }
})
closeModalChangeCategoryNameChooseCategoryTypeBtn.addEventListener("click", () => {
    if (isModalChangeCategoryNameChooseCategoryTypeOpened) {
        closeModalChangeCategoryNameChooseCategoryType()
    }
})
modalChangeCategoryNameChooseCategoryType.addEventListener("click", (event) => {
    if (event.target === modalChangeCategoryNameChooseCategoryType) {
        closeModalChangeCategoryNameChooseCategoryType()
    }
})
// Button Расходов
// 1.1.1
const modalChangeExpanseCategoryName = document.getElementById("modal-change-expanse-category-name")
const openModalChangeExpanseCategoryNameBtn = document.getElementById("open-modal-change-expanse-category-name-btn")
const closeModalChangeExpanseCategoryNameBtn = document.getElementById("close-modal-change-expanse-category-name-btn")
let isModalChangeExpanseCategoryNameOpened = false

function openModalChangeExpanseCategoryName() {
    modalChangeExpanseCategoryName.style.visibility = "visible"
    modalChangeExpanseCategoryName.style.opacity = 1
    isModalChangeExpanseCategoryNameOpened = true
}
function closeModalChangeExpanseCategoryName() {
    modalChangeExpanseCategoryName.style.visibility = "hidden"
    modalChangeExpanseCategoryName.style.opacity = 0
    isModalChangeExpanseCategoryNameOpened = false
}

openModalChangeExpanseCategoryNameBtn.addEventListener("click", () => {
    if (!isModalChangeExpanseCategoryNameOpened) {
        openModalChangeExpanseCategoryName()
        closeModalChangeCategoryNameChooseCategoryType()
    }
})
closeModalChangeExpanseCategoryNameBtn.addEventListener("click", () => {
    if (isModalChangeExpanseCategoryNameOpened) {
        closeModalChangeExpanseCategoryName()
    }
})
modalChangeExpanseCategoryName.addEventListener("click", (event) => {
    if (event.target === modalChangeExpanseCategoryName) {
        closeModalChangeExpanseCategoryName()
    }
})
// Button Доходов
// 1.1.2
const modalChangeIncomeCategoryName = document.getElementById("modal-change-income-category-name")
const openModalChangeIncomeCategoryNameBtn = document.getElementById("open-modal-change-income-category-name-btn")
const closeModalChangeIncomeCategoryNameBtn = document.getElementById("close-modal-change-income-category-name-btn")
let isModalChangeIncomeCategoryNameOpened = false

function openModalChangeIncomeCategoryName() {
    modalChangeIncomeCategoryName.style.visibility = "visible"
    modalChangeIncomeCategoryName.style.opacity = 1
    isModalChangeIncomeCategoryNameOpened = true
}
function closeModalChangeIncomeCategoryName() {
    modalChangeIncomeCategoryName.style.visibility = "hidden"
    modalChangeIncomeCategoryName.style.opacity = 0
    isModalChangeIncomeCategoryNameOpened = false
}

openModalChangeIncomeCategoryNameBtn.addEventListener("click", () => {
    if (!isModalChangeIncomeCategoryNameOpened) {
        openModalChangeIncomeCategoryName()
        closeModalChangeCategoryNameChooseCategoryType()
    }
})
closeModalChangeIncomeCategoryNameBtn.addEventListener("click", () => {
    if (isModalChangeIncomeCategoryNameOpened) {
        closeModalChangeIncomeCategoryName()
    }
})
modalChangeIncomeCategoryName.addEventListener("click", (event) => {
    if (event.target === modalChangeIncomeCategoryName) {
        closeModalChangeIncomeCategoryName()
    }
})
// Button Переименовать счет
// 1.2
const modalChangeAccountName = document.getElementById("modal-change-account-name")
const openModalChangeAccountNameBtn = document.getElementById("open-modal-change-account-name-btn")
const closeModalChangeAccountNameBtn = document.getElementById("close-modal-change-account-name-btn")
let isModalChangeAccountNameOpened = false

function openModalChangeAccountName() {
    modalChangeAccountName.style.visibility = "visible"
    modalChangeAccountName.style.opacity = 1
    isModalChangeAccountNameOpened = true
}
function closeModalChangeAccountName() {
    modalChangeAccountName.style.visibility = "hidden"
    modalChangeAccountName.style.opacity = 0
    isModalChangeAccountNameOpened = false
}

openModalChangeAccountNameBtn.addEventListener("click", () => {
    if (!isModalChangeAccountNameOpened) {
        openModalChangeAccountName()
        closeModalChangeName()
    }
})
closeModalChangeAccountNameBtn.addEventListener("click", () => {
    if (isModalChangeAccountNameOpened) {
        closeModalChangeAccountName()
    }
})
modalChangeAccountName.addEventListener("click", (event) => {
    if (event.target === modalChangeAccountName) {
        closeModalDeleteAccount()
    }
})
// Button Удалить
// 1
const modalDelete = document.getElementById("modal-delete")
const openModalDeleteBtn = document.getElementById("open-modal-delete-btn")
const closeModalDeleteBtn = document.getElementById("close-modal-delete-btn")
let isModalDeleteOpened = false

function openModalDelete() {
    modalDelete.style.visibility = "visible"
    modalDelete.style.opacity = 1
    isModalDeleteOpened = true
}
function closeModalDelete() {
    modalDelete.style.visibility = "hidden"
    modalDelete.style.opacity = 0
    isModalDeleteOpened = false
}

openModalDeleteBtn.addEventListener("click", () => {
    if (!isModalDeleteOpened) {
        openModalDelete()
    }
})
closeModalDeleteBtn.addEventListener("click", () => {
    if (isModalDeleteOpened) {
        closeModalDelete()
    }
})
modalDelete.addEventListener("click", (event) => {
    if (event.target === modalDelete) {
        closeModalDelete()
    }
})
// Button Удалить категорию
// 1.1
const modalDeleteCategoryChooseCategoryType = document.getElementById("modal-delete-category-choose-category-type")
const openModalDeleteCategoryChooseCategoryTypeBtn = document.getElementById("open-modal-delete-category-choose-category-type-btn")
const closeModalDeleteCategoryChooseCategoryTypeBtn = document.getElementById("close-modal-delete-category-choose-category-type-btn")
let isModalDeleteCategoryChooseCategoryTypeOpened = false

function openModalDeleteCategoryChooseCategoryType() {
    modalDeleteCategoryChooseCategoryType.style.visibility = "visible"
    modalDeleteCategoryChooseCategoryType.style.opacity = 1
    isModalDeleteCategoryChooseCategoryTypeOpened = true
}
function closeModalDeleteCategoryChooseCategoryType() {
    modalDeleteCategoryChooseCategoryType.style.visibility = "hidden"
    modalDeleteCategoryChooseCategoryType.style.opacity = 0
    isModalDeleteCategoryChooseCategoryTypeOpened = false
}

openModalDeleteCategoryChooseCategoryTypeBtn.addEventListener("click", () => {
    if (!isModalDeleteCategoryChooseCategoryTypeOpened) {
        openModalDeleteCategoryChooseCategoryType()
        closeModalDelete()
    }
})
closeModalDeleteCategoryChooseCategoryTypeBtn.addEventListener("click", () => {
    if (isModalDeleteCategoryChooseCategoryTypeOpened) {
        closeModalDeleteCategoryChooseCategoryType()
    }
})
modalDeleteCategoryChooseCategoryType.addEventListener("click", (event) => {
    if (event.target === modalDeleteCategoryChooseCategoryType) {
        closeModalDeleteCategoryChooseCategoryType()
    }
})
// Button Расходов
// 1.1.1
const modalDeleteExpanseCategory = document.getElementById("modal-delete-expanse-category")
const openModalDeleteExpanseCategoryBtn = document.getElementById("open-modal-delete-expanse-category-btn")
const closeModalDeleteExpanseCategoryBtn = document.getElementById("close-modal-delete-expanse-category-btn")
let isModalDeleteExpanseCategoryOpened = false

function openModalDeleteExpanseCategory() {
    modalDeleteExpanseCategory.style.visibility = "visible"
    modalDeleteExpanseCategory.style.opacity = 1
    isModalDeleteExpanseCategoryOpened = true
}
function closeModalDeleteExpanseCategory() {
    modalDeleteExpanseCategory.style.visibility = "hidden"
    modalDeleteExpanseCategory.style.opacity = 0
    isModalDeleteExpanseCategoryOpened = false
}

openModalDeleteExpanseCategoryBtn.addEventListener("click", () => {
    if (!isModalDeleteExpanseCategoryOpened) {
        openModalDeleteExpanseCategory()
        closeModalDeleteCategoryChooseCategoryType()
        alert("При удалении категории происходит удаление операций данной категории!")
    }
})
closeModalDeleteExpanseCategoryBtn.addEventListener("click", () => {
    if (isModalDeleteExpanseCategoryOpened) {
        closeModalDeleteExpanseCategory()
    }
})
modalDeleteExpanseCategory.addEventListener("click", (event) => {
    if (event.target === modalDeleteExpanseCategory) {
        closeModalDeleteExpanseCategory()
    }
})
// Button Доходов
// 1.1.2
const modalDeleteIncomeCategory = document.getElementById("modal-delete-income-category")
const openModalDeleteIncomeCategoryBtn = document.getElementById("open-modal-delete-income-category-btn")
const closeModalDeleteIncomeCategoryBtn = document.getElementById("close-modal-delete-income-category-btn")
let isModalDeleteIncomeCategoryOpened = false

function openModalDeleteIncomeCategory() {
    modalDeleteIncomeCategory.style.visibility = "visible"
    modalDeleteIncomeCategory.style.opacity = 1
    isModalDeleteIncomeCategoryOpened = true
}
function closeModalDeleteIncomeCategory() {
    modalDeleteIncomeCategory.style.visibility = "hidden"
    modalDeleteIncomeCategory.style.opacity = 0
    isModalDeleteIncomeCategoryOpened = false
}

openModalDeleteIncomeCategoryBtn.addEventListener("click", () => {
    if (!isModalDeleteIncomeCategoryOpened) {
        openModalDeleteIncomeCategory()
        closeModalDeleteCategoryChooseCategoryType()
        alert("При удалении категории происходит удаление операций данной категории!")
    }
})
closeModalDeleteIncomeCategoryBtn.addEventListener("click", () => {
    if (isModalDeleteIncomeCategoryOpened) {
        closeModalDeleteIncomeCategory()
    }
})
modalDeleteIncomeCategory.addEventListener("click", (event) => {
    if (event.target === modalDeleteIncomeCategory) {
        closeModalDeleteIncomeCategory()
    }
})
// Button Удалить счет
// 1.2
const modalDeleteAccount = document.getElementById("modal-delete-account")
const openModalDeleteAccountBtn = document.getElementById("open-modal-delete-account-btn")
const closeModalDeleteAccountBtn = document.getElementById("close-modal-delete-account-btn")
let isModalDeleteAccountOpened = false

function openModalDeleteAccount() {
    modalDeleteAccount.style.visibility = "visible"
    modalDeleteAccount.style.opacity = 1
    isModalDeleteAccountOpened = true
}
function closeModalDeleteAccount() {
    modalDeleteAccount.style.visibility = "hidden"
    modalDeleteAccount.style.opacity = 0
    isModalDeleteAccountOpened = false
}

openModalDeleteAccountBtn.addEventListener("click", () => {
    if (!isModalDeleteAccountOpened) {
        openModalDeleteAccount()
        closeModalDelete()
        alert("При удалении счета все операции также будут удалены. Продолжить?")
    }
})
closeModalDeleteAccountBtn.addEventListener("click", () => {
    if (isModalDeleteAccountOpened) {
        closeModalDeleteAccount()
    }
})
modalDeleteAccount.addEventListener("click", (event) => {
    if (event.target === modalDeleteAccount) {
        closeModalDeleteAccount()
    }
})
// Модальное окно для изменения/удаления операции
// Модальное окно для изменения/удаления расхода
const modalChangeDeleteExpanse = document.getElementById("modal-change-delete-expanse")
const changeExpanseForm = document.getElementById("change-expanse-form")
const deleteExpanseForm = document.getElementById("delete-expanse-form")
const closeModalChangeDeleteExpanseBtn = document.getElementById("close-modal-change-delete-expanse-btn")
let isModalChangeDeleteExpanseOpened = false

function openModalChangeDeleteExpanse(account_id, expanse_id) {
    changeExpanseForm.setAttribute("action", `/accounts/${account_id}/expanses/${expanse_id}/change`)
    deleteExpanseForm.setAttribute("action", `/accounts/${account_id}/expanses/${expanse_id}/delete`)
    modalChangeDeleteExpanse.style.visibility = "visible"
    modalChangeDeleteExpanse.style.opacity = 1
    isModalChangeDeleteExpanseOpened = true
}
function closeModalChangeDeleteExpanse() {
    modalChangeDeleteExpanse.style.visibility = "hidden"
    modalChangeDeleteExpanse.style.opacity = 0
    isModalChangeDeleteExpanseOpened = false
}

function addEventExpanseListeners() {
    document.querySelectorAll(".open-modal-change-delete-expanse-btn").forEach((openModalChangeDeleteExpanseBtn) => {
        openModalChangeDeleteExpanseBtn.addEventListener("click", () => {
            account_id = openModalChangeDeleteExpanseBtn.getAttribute("account_id")
            expanse_id = openModalChangeDeleteExpanseBtn.getAttribute("expanse_id")
            if (!isModalChangeDeleteExpanseOpened) {
                openModalChangeDeleteExpanse(account_id, expanse_id)
            }
        })
        closeModalChangeDeleteExpanseBtn.addEventListener("click", () => {
            if (isModalChangeDeleteExpanseOpened) {
                closeModalChangeDeleteExpanse()
            }
        })
        modalChangeDeleteExpanse.addEventListener("click", (event) => {
            if (event.target === modalChangeDeleteExpanse) {
                closeModalChangeDeleteExpanse()
            }
        })
    })
}
// Модальное окно для изменения/удаления дохода
const modalChangeDeleteIncome = document.getElementById("modal-change-delete-income")
const changeIncomeForm = document.getElementById("change-income-form")
const deleteIncomeForm = document.getElementById("delete-income-form")
const closeModalChangeDeleteIncomeBtn = document.getElementById("close-modal-change-delete-income-btn")
let isModalChangeDeleteIncomeOpened = false

function openModalChangeDeleteIncome(account_id, income_id) {
    changeIncomeForm.setAttribute("action", `/accounts/${account_id}/incomes/${income_id}/change`)
    deleteIncomeForm.setAttribute("action", `/accounts/${account_id}/incomes/${income_id}/delete`)
    modalChangeDeleteIncome.style.visibility = "visible"
    modalChangeDeleteIncome.style.opacity = 1
    isModalChangeDeleteIncomeOpened = true
}
function closeModalChangeDeleteIncome() {
    modalChangeDeleteIncome.style.visibility = "hidden"
    modalChangeDeleteIncome.style.opacity = 0
    isModalChangeDeleteIncomeOpened = false
}

function addEventIncomeListeners() {
    document.querySelectorAll(".open-modal-change-delete-income-btn").forEach((openModalChangeDeleteIncomeBtn) => {
        openModalChangeDeleteIncomeBtn.addEventListener("click", () => {
            account_id = openModalChangeDeleteIncomeBtn.getAttribute("account_id")
            income_id = openModalChangeDeleteIncomeBtn.getAttribute("income_id")
            if (!isModalChangeDeleteIncomeOpened) {
                openModalChangeDeleteIncome(account_id, income_id)
            }
        })
        closeModalChangeDeleteIncomeBtn.addEventListener("click", () => {
            if (isModalChangeDeleteIncomeOpened) {
                closeModalChangeDeleteIncome()
            }
        })
        modalChangeDeleteIncome.addEventListener("click", (event) => {
            if (event.target === modalChangeDeleteIncome) {
                closeModalChangeDeleteIncome()
            }
        })
    })
}

addEventExpanseListeners()
addEventIncomeListeners()
// Фильтровать
const modalFilterOperationsChooseOperationType = document.getElementById("modal-filter-operations-choose-operation-type")
const openModalFilterOperationsChooseOperationTypeBtn = document.getElementById("open-modal-filter-operations-choose-operation-type-btn")
const closeModalFilterOperationsChooseOperationTypeBtn = document.getElementById("close-modal-filter-operations-choose-operation-type-btn")
let isModalFilterOperationsChooseOperationTypeOpened = false

function openModalFilterOperationsChooseOperationType() {
    modalFilterOperationsChooseOperationType.style.visibility = "visible"
    modalFilterOperationsChooseOperationType.style.opacity = 1
    isModalFilterOperationsChooseOperationTypeOpened = true
}
function closeModalFilterOperationsChooseOperationType() {
    modalFilterOperationsChooseOperationType.style.visibility = "hidden"
    modalFilterOperationsChooseOperationType.style.opacity = 0
    isModalFilterOperationsChooseOperationTypeOpened = false
}

openModalFilterOperationsChooseOperationTypeBtn.addEventListener("click", () => {
    if (!isModalFilterOperationsChooseOperationTypeOpened) {
        openModalFilterOperationsChooseOperationType()
    }
})
closeModalFilterOperationsChooseOperationTypeBtn.addEventListener("click", () => {
    if (isModalFilterOperationsChooseOperationTypeOpened) {
        closeModalFilterOperationsChooseOperationType()
    }
})
modalFilterOperationsChooseOperationType.addEventListener("click", (event) => {
    if (event.target === modalFilterOperationsChooseOperationType) {
        closeModalFilterOperationsChooseOperationType()
    }
})
// Фильтровать расходы
const modalFilterExpanses = document.getElementById("modal-filter-expanses")
const openModalFilterExpansesBtn = document.getElementById("open-modal-filter-expanses-btn")
const closeModalFilterExpansesBtn = document.getElementById("close-modal-filter-expanses-btn")
let isModalFilterExpansesOpened = false

function openModalFilterExpanses() {
    modalFilterExpanses.style.visibility = "visible"
    modalFilterExpanses.style.opacity = 1
    isModalFilterExpansesOpened = true
}
function closeModalFilterExpanses() {
    modalFilterExpanses.style.visibility = "hidden"
    modalFilterExpanses.style.opacity = 0
    isModalFilterExpansesOpened = false
}

openModalFilterExpansesBtn.addEventListener("click", () => {
    if (!isModalFilterExpansesOpened) {
        openModalFilterExpanses()
        closeModalFilterOperationsChooseOperationType()
    }
})
closeModalFilterExpansesBtn.addEventListener("click", () => {
    if (isModalFilterExpansesOpened) {
        closeModalFilterExpanses()
    }
})
modalFilterExpanses.addEventListener("click", (event) => {
    if (event.target === modalFilterExpanses) {
        closeModalFilterExpanses()
    }
})
// Фильтровать доходы
const modalFilterIncomes = document.getElementById("modal-filter-incomes")
const openModalFilterIncomesBtn = document.getElementById("open-modal-filter-incomes-btn")
const closeModalFilterIncomesBtn = document.getElementById("close-modal-filter-incomes-btn")
let isModalFilterIncomesOpened = false

function openModalFilterIncomes() {
    modalFilterIncomes.style.visibility = "visible"
    modalFilterIncomes.style.opacity = 1
    isModalFilterIncomesOpened = true
}
function closeModalFilterIncomes() {
    modalFilterIncomes.style.visibility = "hidden"
    modalFilterIncomes.style.opacity = 0
    isModalFilterIncomesOpened = false
}

openModalFilterIncomesBtn.addEventListener("click", () => {
    if (!isModalFilterIncomesOpened) {
        openModalFilterIncomes()
        closeModalFilterOperationsChooseOperationType()
    }
})
closeModalFilterIncomesBtn.addEventListener("click", () => {
    if (isModalFilterIncomesOpened) {
        closeModalFilterIncomes()
    }
})
modalFilterIncomes.addEventListener("click", (event) => {
    if (event.target === modalFilterIncomes) {
        closeModalFilterExpanses()
    }
})
