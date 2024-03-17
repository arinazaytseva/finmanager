import sys

from datetime import datetime

sys.path.insert(0, "/Users/arinazajceva/code/finmanager")

from sqlalchemy import select, insert, update, desc, delete, func
from sqlalchemy.sql import and_

from core.base import User, Account, Expanse, Income, Category_Expanse, Category_Income
from core.db import engine


# SELECT-запрос получить список пользователей и всю информацию о них
def get_users_data() -> dict:
    """Функция, которая выполняет запрос для получения данных о пользователях"""
    stmt = select(User)
    users = {}
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            users[row[3]] = {
                "id": row[0],
                "name": row[1],
                "surname": row[2],
                "hashed_password": row[4]
            }
    return users


# INSERT-запрос добавить пользователя
def add_user(user_name: str, user_surname: str, \
                user_mail: str, user_hashed_password: str):
    """Функция, которая выполняет запрос для добавления пользователя в таблицу User"""
    stmt = insert(User).values(name=user_name, surname=user_surname, email=user_mail, \
                               hashed_password=user_hashed_password)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()


# SELECT-запрос получить name, surname пользователя по id 
def get_user_data(user_id: int) -> dict:
    """Возвращает name, surname пользователя по id"""
    stmt = select(User).where(User.id == user_id)
    users = {}
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            users[row[0]] = {
                "name": row[1],
                "surname": row[2]
            }
    return users


# SELECT-запрос получить список счетов и их id, name по user_id
def get_accounts_data(user_id: int) -> dict:
    """Возвращает id и name счетов пользователя по user_id"""
    stmt = select(Account).where(Account.user_id == user_id)
    accounts = {}
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            accounts[row[0]] = {
                "name": row[1],
                "balance": row[2],
                "currency": row[3]
            }
    return accounts


# INSERT-запрос добавить пользователя
def add_account(account_name: str, account_balance: float, \
                   account_currency: str, account_user_id: int):
    """Dыполняет запрос для добавления счета в таблицу Account"""
    stmt = insert(Account).values(name=account_name, balance=account_balance, \
                                  currency=account_currency, user_id=account_user_id)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()


def get_account_user_data(account_id: int):
    """Возвращает информацию о счете и его владельце"""
    stmt = select(Account.id, Account.name, Account.balance, Account.currency, \
                  User.name, User.surname).join(User.accounts) \
                  .where(Account.id == account_id)
    account = {}
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            account = {
                "id": row[0],
                "name": row[1],
                "balance": row[2],
                "currency": row[3],
                "name_owner": row[4],
                "surname_owner": row[5]
            }
    return account


def get_expanses_categories_data(account_id: int):
    """..."""
    stmt = select(Expanse.id, Expanse.amount, Expanse.date, Category_Expanse.name) \
                  .join(Category_Expanse.expanses).where(Expanse.account_id == account_id) \
                  .order_by(desc(Expanse.date))
    expanses = {}
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            year = str(row[2]).split("-")[0][2:]
            month = str(row[2]).split("-")[1]
            day = str(row[2]).split("-")[2]

            expanses[row[0]] = {
                "amount": row[1],
                "year": year,
                "month": month,
                "day": day,
                "name_category": row[3]
            }
    return expanses


def get_incomes_categories_data(account_id: int):
    """..."""
    stmt = select(Income.id, Income.amount, Income.date, Category_Income.name) \
                  .join(Category_Income.incomes).where(Income.account_id == account_id) \
                  .order_by(desc(Income.date))
    incomes = {}
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            year = str(row[2]).split("-")[0][2:]
            month = str(row[2]).split("-")[1]
            day = str(row[2]).split("-")[2]

            incomes[row[0]] = {
                "amount": row[1],
                "year": year,
                "month": month,
                "day": day,
                "name_category": row[3]
            }
    return incomes


def get_categories_expanses(account_id: int):
    """..."""
    stmt = select(Category_Expanse.name).where(Category_Expanse.account_id == account_id)
    categories_expanses = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            categories_expanses.append(row[0])
    return categories_expanses


def get_categories_incomes(account_id: int):
    """..."""
    stmt = select(Category_Income.name).where(Category_Income.account_id == account_id)
    categories_incomes = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            categories_incomes.append(row[0])
    return categories_incomes


def add_expanse(account_id: int, date: str, amount: float, category_name: str):
    """Добавление расхода и изменение баланса счета"""
    get_balance_stmt = select(Account.balance).where(Account.id == account_id)
    with engine.connect() as conn:
        for row in conn.execute(get_balance_stmt):
            balance = row[0]
    category_id = select(Category_Expanse.id).where(Category_Expanse.name == category_name)
    add_stmt = insert(Expanse).values(amount=amount, account_id=account_id, category_expanse_id=category_id, date=date)
    update_stmt = update(Account).where(Account.id == account_id).values(balance=(balance-amount))
    add_stmt.compile()
    with engine.connect() as conn:
        conn.execute(add_stmt)
        conn.commit()
    update_stmt.compile()
    with engine.connect() as conn:
        conn.execute(update_stmt)
        conn.commit()


def add_income(account_id: int, date: str, amount: float, category_name: str):
    """Добавление доходв и изменение баланса счета"""
    get_balance_stmt = select(Account.balance).where(Account.id == account_id)
    with engine.connect() as conn:
        for row in conn.execute(get_balance_stmt):
            balance = row[0]
    category_id = select(Category_Income.id).where(Category_Income.name == category_name)
    add_stmt = insert(Income).values(amount=amount, account_id=account_id, category_income_id=category_id, date=date)
    update_stmt = update(Account).where(Account.id == account_id).values(balance=(balance+amount))
    add_stmt.compile()
    with engine.connect() as conn:
        conn.execute(add_stmt)
        conn.commit()
    update_stmt.compile()
    with engine.connect() as conn:
        conn.execute(update_stmt)
        conn.commit()


def add_category_expanse(account_id: int, name: str):
    """..."""
    stmt = insert(Category_Expanse).values(name=name, account_id=account_id)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()


def add_category_income(account_id: int, name: str):
    """..."""
    stmt = insert(Category_Income).values(name=name, account_id=account_id)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()


def change_account_name(account_id: int, new_account_name: str):
    """..."""
    stmt = update(Account).where(Account.id == account_id).values(name=new_account_name)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()


def delete_account(account_id: int):
    """..."""
    stmt = delete(Account).where(Account.id == account_id)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()

# Запросы для сортировки
def get_expanses_asc_sort(account_id: int, order_by_column_name) -> list:
    """..."""
    stmt = select(Expanse.id, Expanse.amount, \
                  Expanse.date, Category_Expanse.name) \
                  .join(Category_Expanse.expanses) \
                  .where(Expanse.account_id == account_id) \
                  .order_by((order_by_column_name.asc()))
    expanses = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            year = str(row[2]).split("-")[0][2:]
            month = str(row[2]).split("-")[1]
            day = str(row[2]).split("-")[2]

            expanses.append({
                "id": row[0],
                "amount": row[1],
                "year": year,
                "month": month,
                "day": day,
                "name_category": row[3]
            })
    return expanses


def get_expanses_desc_sort(account_id: int, order_by_column_name) -> list:
    """..."""
    stmt = select(Expanse.id, Expanse.amount, \
                  Expanse.date, Category_Expanse.name) \
                  .join(Category_Expanse.expanses) \
                  .where(Expanse.account_id == account_id) \
                  .order_by(desc(order_by_column_name))
    expanses = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            year = str(row[2]).split("-")[0][2:]
            month = str(row[2]).split("-")[1]
            day = str(row[2]).split("-")[2]

            expanses.append({
                "id": row[0],
                "amount": row[1],
                "year": year,
                "month": month,
                "day": day,
                "name_category": row[3]
            })
    return expanses


def get_incomes_asc_sort(account_id: int, order_by_column_name) -> list:
    """..."""
    stmt = select(Income.id, Income.amount, \
                  Income.date, Category_Income.name) \
                  .join(Category_Income.incomes) \
                  .where(Income.account_id == account_id) \
                  .order_by((order_by_column_name.asc()))
    incomes = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            year = str(row[2]).split("-")[0][2:]
            month = str(row[2]).split("-")[1]
            day = str(row[2]).split("-")[2]

            incomes.append({
                "id": row[0],
                "amount": row[1],
                "year": year,
                "month": month,
                "day": day,
                "name_category": row[3]
            })
    return incomes


def get_incomes_desc_sort(account_id: int, order_by_column_name) -> list:
    """..."""
    stmt = select(Income.id, Income.amount, \
                  Income.date, Category_Income.name) \
                  .join(Category_Income.incomes) \
                  .where(Income.account_id == account_id) \
                  .order_by(desc(order_by_column_name))
    incomes = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            str_date = row[2].strftime("%Y-%m-%d")
            year = str_date.split("-")[0][2:]
            month = str_date.split("-")[1]
            day = str_date.split("-")[2]

            incomes.append({
                "id": row[0],
                "amount": row[1],
                "year": year,
                "month": month,
                "day": day,
                "name_category": row[3]
            })
    return incomes

# Изменение расхода
def change_expanse_date(expanse_date, expanse_id: int):
    """Изменить дату расхода"""
    stmt = update(Expanse).where(Expanse.id == expanse_id).values(date=expanse_date)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()


def change_expanse_category(expanse_category: str, expanse_id: int):
    """Изменить категорию расхода"""
    select_stmt = select(Category_Expanse.id).where(Category_Expanse.name == expanse_category)
    with engine.connect() as conn:
        for row in conn.execute(select_stmt):
            category_expanse_id = row[0]
    
    update_stmt = update(Expanse).where(Expanse.id == expanse_id) \
        .values(category_expanse_id=category_expanse_id)
    update_stmt.compile()
    with engine.connect() as conn:
        conn.execute(update_stmt)
        conn.commit()


def change_expanse_amount(expanse_amount: float, account_id: int, expanse_id: int):
    """Изменить сумму расхода"""
    get_balance_stmt = select(Account.balance).where(Account.id == account_id) # Получаем текущий баланс
    with engine.connect() as conn:
        for row in conn.execute(get_balance_stmt):
            balance = row[0]
    get_amount_stmt = select(Expanse.amount).where(Expanse.id == expanse_id) # Получаем предыдущую сумму расхода
    with engine.connect() as conn:
        for row in conn.execute(get_amount_stmt):
            amount = row[0]
    stmt = update(Expanse).where(Expanse.id == expanse_id).values(amount=expanse_amount) # Обновляем сумму расхода
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()
    update_stmt = update(Account).where(Account.id == account_id).values(balance=(balance+amount-expanse_amount)) # Обновлем баланс счета
    update_stmt.compile()
    with engine.connect() as conn:
        conn.execute(update_stmt)
        conn.commit()

# Удаление расхода
def delete_expanse(account_id: int, expanse_id: int):
    """Удалить расход"""
    get_balance_stmt = select(Account.balance).where(Account.id == account_id)
    with engine.connect() as conn:
        for row in conn.execute(get_balance_stmt):
            balance = row[0]
    get_amount_stmt = select(Expanse.amount).where(Expanse.id == expanse_id)
    with engine.connect() as conn:
        for row in conn.execute(get_amount_stmt):
            amount = row[0]
    delete_stmt = delete(Expanse).where(Expanse.id == expanse_id)
    delete_stmt.compile()
    with engine.connect() as conn:
        conn.execute(delete_stmt)
        conn.commit()
    update_stmt = update(Account).where(Account.id == account_id).values(balance=(balance+amount))
    update_stmt.compile()
    with engine.connect() as conn:
        conn.execute(update_stmt)
        conn.commit()

# Изменение дохода
def change_income_date(income_date, income_id: int):
    """Изменить дату дохода"""
    stmt = update(Income).where(Income.id == income_id).values(date=income_date)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()


def change_income_category(income_category: str, income_id: int):
    """Изменить категорию дохода"""
    select_stmt = select(Category_Income.id).where(Category_Income.name == income_category)
    with engine.connect() as conn:
        for row in conn.execute(select_stmt):
            category_income_id = row[0]
    
    update_stmt = update(Income).where(Income.id == income_id) \
        .values(category_income_id=category_income_id)
    update_stmt.compile()
    with engine.connect() as conn:
        conn.execute(update_stmt)
        conn.commit()


def change_income_amount(income_amount: float, account_id: int, income_id: int):
    """Изменить сумму дохода"""
    get_balance_stmt = select(Account.balance).where(Account.id == account_id) # Получаем текущий баланс
    with engine.connect() as conn:
        for row in conn.execute(get_balance_stmt):
            balance = row[0]
    get_amount_stmt = select(Income.amount).where(Income.id == income_id) # Получаем предыдущую сумму расхода
    with engine.connect() as conn:
        for row in conn.execute(get_amount_stmt):
            amount = row[0]
    stmt = update(Income).where(Income.id == income_id).values(amount=income_amount) # Обновляем сумму расхода
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()
    update_stmt = update(Account).where(Account.id == account_id).values(balance=(balance-amount+income_amount)) # Обновлем баланс счета
    update_stmt.compile()
    with engine.connect() as conn:
        conn.execute(update_stmt)
        conn.commit()

# Удаление расхода
def delete_income(account_id: int, income_id: int):
    """Удалить расход"""
    get_balance_stmt = select(Account.balance).where(Account.id == account_id)
    with engine.connect() as conn:
        for row in conn.execute(get_balance_stmt):
            balance = row[0]
    get_amount_stmt = select(Income.amount).where(Income.id == income_id)
    with engine.connect() as conn:
        for row in conn.execute(get_amount_stmt):
            amount = row[0]
    delete_stmt = delete(Income).where(Income.id == income_id)
    delete_stmt.compile()
    with engine.connect() as conn:
        conn.execute(delete_stmt)
        conn.commit()
    update_stmt = update(Account).where(Account.id == account_id).values(balance=(balance-amount))
    update_stmt.compile()
    with engine.connect() as conn:
        conn.execute(update_stmt)
        conn.commit()


def change_expanse_category_name(expanse_category: str, expanse_category_new_name: str):
    """Изменение наименования категории расходов"""
    stmt = update(Category_Expanse).where(Category_Expanse.name == expanse_category) \
        .values(name=expanse_category_new_name)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()


def change_income_category_name(income_category: str, income_category_new_name: str):
    """Изменение наименования категории доходов"""
    stmt = update(Category_Income).where(Category_Income.name == income_category) \
        .values(name=income_category_new_name)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()


def delete_expanse_category(account_id: int, expanse_category: str):
    """Удалить категорию расходов"""
    total_expanses_stmt = select(func.sum(Expanse.amount)).join(Category_Expanse).where(Category_Expanse.name == expanse_category)
    total_expanses_stmt.compile()
    with engine.connect() as conn:
        for row in conn.execute(total_expanses_stmt):
            total_expanses = row[0]
        conn.commit()
    get_balance_stmt = select(Account.balance).where(Account.id == account_id)
    with engine.connect() as conn:
        for row in conn.execute(get_balance_stmt):
            balance = row[0]
    try:
        update_stmt = update(Account).where(Account.id == account_id).values(balance=(balance+total_expanses))
        update_stmt.compile()
        with engine.connect() as conn:
            conn.execute(update_stmt)
            conn.commit()
    except TypeError:
        pass
    stmt = delete(Category_Expanse).where(Category_Expanse.name == expanse_category)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()


def delete_income_category(account_id: int, income_category: str):
    """Удалить категорию расходов"""
    total_incomes_stmt = select(func.sum(Income.amount)).join(Category_Income).where(Category_Income.name == income_category)
    total_incomes_stmt.compile()
    with engine.connect() as conn:
        for row in conn.execute(total_incomes_stmt):
            total_incomes = row[0]
        conn.commit()
    get_balance_stmt = select(Account.balance).where(Account.id == account_id)
    with engine.connect() as conn:
        for row in conn.execute(get_balance_stmt):
            balance = row[0]
    try:
        update_stmt = update(Account).where(Account.id == account_id).values(balance=(balance-total_incomes))
        update_stmt.compile()
        with engine.connect() as conn:
            conn.execute(update_stmt)
            conn.commit()
    except:
        pass
    stmt = delete(Category_Income).where(Category_Income.name == income_category)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()


def get_expanse_categories(account_id: int) -> list:
    """..."""
    stmt = select(Category_Expanse.id, Category_Expanse.name) \
        .where(Category_Expanse.account_id == account_id)
    expanse_categories = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            expanse_categories.append({
                "id": row[0],
                "name": row[1]
            })
    return expanse_categories


def get_income_categories(account_id: int) -> list:
    """..."""
    stmt = select(Category_Income.id, Category_Income.name) \
        .where(Category_Income.account_id == account_id)
    income_categories = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            income_categories.append({
                "id": row[0],
                "name": row[1]
            })
    return income_categories


def filter_expanses(params: dict):
    """Фильтруем расходы по категориям, сумме, дате"""
    stmt = select(Expanse.id, Expanse.date, Category_Expanse.name, Expanse.amount).join(Category_Expanse.expanses).where(
        and_(
            (Expanse.category_expanse_id.in_(params["id_categories"]) if params["id_categories"] is not None else True),
            Expanse.amount.between(params.get("startAmountValue", 0.0), 
                                   params.get("endAmountValue", 1000000000.0)),
            Expanse.date.between(params.get("startDateValue", datetime(1970, 1, 1)),
                                 params.get("endDateValue", datetime(2199, 1, 1)))
        )
    )
    expanses = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            str_date = row[1].strftime("%Y-%m-%d")
            year = str_date.split("-")[0][2:]
            month = str_date.split("-")[1]
            day = str_date.split("-")[2]
            expanses.append({
                "id": row[0],
                "year": year,
                "month": month,
                "day": day,
                "name_category": row[2],
                "amount": row[3]
            })
    return expanses


def filter_incomes(params: dict):
    """Фильтруем доходы по категориям, сумме, дате"""
    stmt = select(Income.id, Income.date, Category_Income.name, Income.amount).join(Category_Income.incomes).where(
        and_(
            (Income.category_income_id.in_(params["id_categories"]) if params["id_categories"] is not None else True),
            Income.amount.between(params.get("startAmountValue", 0.0), 
                                   params.get("endAmountValue", 1000000000.0)),
            Income.date.between(params.get("startDateValue", datetime(1970, 1, 1)),
                                 params.get("endDateValue", datetime(2199, 1, 1)))
        )
    )
    incomes = []
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            str_date = row[1].strftime("%Y-%m-%d")
            year = str_date.split("-")[0][2:]
            month = str_date.split("-")[1]
            day = str_date.split("-")[2]
            incomes.append({
                "id": row[0],
                "year": year,
                "month": month,
                "day": day,
                "name_category": row[2],
                "amount": row[3]
            })
    return incomes

# SELECT-запрос получить список операций expanses и incomes по account_id
# INSERT-запрос добавить счет
# Создать категории для всех

# Добавить пользователя
# INSERT INTO users (name, surname, email, hashed_password) 
# VALUES ('', '', '', '');
