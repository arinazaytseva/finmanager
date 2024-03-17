import os
import base64
from datetime import datetime
import hmac
import hashlib
import sys
from typing import Optional
from dotenv import load_dotenv

sys.path.append("/Users/arinazajceva/code/finmanager")

from fastapi import FastAPI, Form, Cookie, Request
from fastapi.responses import Response, RedirectResponse,JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from core.base import Expanse, Income, Category_Expanse, Category_Income
from app import queries


load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
PASSWORD_SALT = os.getenv("PASSWORD_SALT")

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")


def sign_data(data: str) -> str:
    """Возвращает подписанные данные data"""
    return hmac.new(
        SECRET_KEY.encode(),
        msg=data.encode(),
        digestmod=hashlib.sha256
    ).hexdigest().upper()


def get_data_from_signed_string(data_signed: str) -> Optional[str]:
    """Возвращает данные data"""
    data_base64, sign = data_signed.split(".")
    data = base64.b64decode(data_base64.encode()).decode()
    valid_sign = sign_data(data)
    if hmac.compare_digest(valid_sign, sign):
        return data


def get_hashed_password(password: str) -> str:
    """Возвращает хэшированный пароль"""
    return hashlib.sha256( (password + PASSWORD_SALT).encode() ).hexdigest().lower()


def verify_password(password: str, stored_hashed_password: str) -> bool:
    """Возвращает результат проверки пароля"""
    hashed_password = get_hashed_password(password)
    return hashed_password == stored_hashed_password


@app.get("/")
def get_login_page(request: Request, mail_signed: Optional[str] = Cookie(default=None)) -> Response:
    """Возвращает страницу аутентификации"""
    if not mail_signed: # Если Cookie нет, возвращем страницу аутентификации
        return templates.TemplateResponse("login.html", {"request": request})
    valid_mail = get_data_from_signed_string(mail_signed)
    if not valid_mail: # Проверяем Cookie, если почта не соответствует, возвращаем страницу аутентификации
        response = templates.TemplateResponse("login.html", media_type="text/html")
        response.delete_cookie(key="mail_signed")
        return response
    users = queries.get_users_data()
    try:
        user = users[valid_mail]
    except KeyError:
        response = templates.TemplateResponse("login.html", {"request": request})
        response.delete_cookie(key="mail_signed")
        return response
    return templates.TemplateResponse("user.html", {"request": request, \
                                                    "user_id": user["id"], \
                                                    "user_name": user["name"], \
                                                    "user_surname": user["surname"], \
                                                    "accounts": queries.get_accounts_data(user["id"])})


@app.post("/")
def post_login_page(request: Request, mail: Optional[str] = Form(default=None), \
                    password: Optional[str] = Form(default=None), \
                    mail_signed: Optional[str] = Cookie(default=None)) -> Response:
    """Получает данные из формы, проверяет пароль и перенаправляет \
        на главную страницу"""
    users = queries.get_users_data()
    if mail_signed:
        valid_mail = get_data_from_signed_string(mail_signed)
        user = users.get(valid_mail)
        return templates.TemplateResponse("user.html", {"request": request, \
                                                        "user_id": user["id"], \
                                                        "user_name": user["name"], \
                                                        "user_surname": user["surname"], \
                                                        "accounts": queries.get_accounts_data(user["id"])})
    
    user = users.get(mail)
    if not user or not verify_password(password, user["hashed_password"]):
        return templates.TemplateResponse("login.html", {"request": request})
    
    response = templates.TemplateResponse("user.html", {"request": request, \
                                                        "user_id": user["id"], \
                                                        "user_name": user["name"], \
                                                        "user_surname": user["surname"], \
                                                        "accounts": queries.get_accounts_data(user["id"])})
    mail_signed = base64.b64encode(mail.encode()).decode() + "." + sign_data(mail)
    response.set_cookie(key="mail_signed", value=mail_signed)
    return response


@app.get("/register")
async def get_register_page(request: Request) -> Response:
    """Возвращает страницу регистрации"""
    return templates.TemplateResponse("register.html", {"request": request})


@app.post("/register")
async def post_register_page(request: Request, name: str = Form(...), \
                             surname: str = Form(...), mail: str = Form(...), \
                             password: str = Form(...)) -> Response:
    """Получает данные из формы, создает нового пользователя и перенаправляет \
        на страницу аутентификации"""
    users = queries.get_users_data()
    if mail in users:
        return templates.TemplateResponse("register.html", {"request": request})
    queries.add_user(name, surname, mail, get_hashed_password(password))
    return RedirectResponse("/")


@app.post("/user/{user_id}")
async def post_user_page(request: Request, user_id: int,
                         name: str = Form(...), \
                         balance: str = Form(...), \
                         currency: str = Form(...)):
    """Получает данные из формы, создает новый счет и перенаправляет \
        на Главную страницу"""
    queries.add_account(name, float(balance), currency, user_id)
    return RedirectResponse("/")


@app.get("/logout")
async def redirect_login_page():
    """Удаляет Cookie и перенаправляет на страницу /"""
    response = RedirectResponse("/")
    response.delete_cookie(key="mail_signed")
    return response


@app.get("/accounts/{account_id}")
async def get_account_page(request: Request, account_id: int):
    """Возвращает страницу счета"""
    account_data = queries.get_account_user_data(account_id)
    return templates.TemplateResponse("account.html", {"request": request, \
                                                        "id": account_data["id"], \
                                                        "name": account_data["name"], \
                                                        "balance": round(account_data["balance"], 2), \
                                                        "currency": account_data["currency"], \
                                                        "name_owner": account_data["name_owner"], \
                                                        "surname_owner": account_data["surname_owner"], \
                                                        "expanses": queries.get_expanses_categories_data(account_id), \
                                                        "incomes": queries.get_incomes_categories_data(account_id), \
                                                        "categories_expanses": queries.get_categories_expanses(account_id), \
                                                        "categories_incomes": queries.get_categories_incomes(account_id)})


@app.post("/accounts/{account_id}")
async def post_account_page(request: Request, account_id: int):
    """Возвращает страницу счета"""
    account_data = queries.get_account_user_data(account_id)
    return templates.TemplateResponse("account.html", {"request": request, \
                                                       "id": account_data["id"], \
                                                        "name": account_data["name"], \
                                                        "balance": round(account_data["balance"], 2), \
                                                        "currency": account_data["currency"], \
                                                        "name_owner": account_data["name_owner"], \
                                                        "surname_owner": account_data["surname_owner"], \
                                                        "expanses": queries.get_expanses_categories_data(account_id), \
                                                        "incomes": queries.get_incomes_categories_data(account_id), \
                                                        "categories_expanses": queries.get_categories_expanses(account_id), \
                                                        "categories_incomes": queries.get_categories_incomes(account_id)})


@app.post("/accounts/{account_id}/add_expanse")
async def post_add_expanse(request: Request, account_id: int, date: str = Form(...), \
                            amount: str = Form(...), category: str = Form(...)):
    """..."""
    queries.add_expanse(account_id, date, float(amount), category)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/add_income")
async def post_add_income(request: Request, account_id: int, date: str = Form(...), \
                            amount: str = Form(...), category: str = Form(...)):
    """..."""
    queries.add_income(account_id, date, float(amount), category)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/add_category_expanse")
async def post_add_category_expanse(request: Request, account_id: int, name: str = Form(...)):
    """..."""
    queries.add_category_expanse(account_id, name)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/add_category_income")
async def post_add_category_income(request: Request, account_id: int, name: str = Form(...)):
    """..."""
    queries.add_category_income(account_id, name)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/change-account-name")
async def post_change_account_name(request: Request, account_id: int, new_account_name: str = Form(...)):
    """..."""
    queries.change_account_name(account_id, new_account_name)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/delete-account")
async def post_delete_account(request: Request, account_id: int):
    """..."""
    queries.delete_account(account_id)
    return RedirectResponse("/")


@app.post("/accounts/{account_id}/sort")
async def post_sort_data(request: Request, account_id: int):
    """..."""
    data = await request.json()
    if data["sort"] == "expanses":
        if data["sortBy"] == "date":
            if data["order"] == "asc":
                expanses = queries.get_expanses_asc_sort(account_id, Expanse.date)
            else:
                expanses = queries.get_expanses_desc_sort(account_id, Expanse.date)
        if data["sortBy"] == "category":
            if data["order"] == "asc":
                expanses = queries.get_expanses_asc_sort(account_id, Category_Expanse.name)
            else:
                expanses = queries.get_expanses_desc_sort(account_id, Category_Expanse.name)
        if data["sortBy"] == "amount":
            if data["order"] == "asc":
                expanses = queries.get_expanses_asc_sort(account_id, Expanse.amount)
            else:
                expanses = queries.get_expanses_desc_sort(account_id, Expanse.amount)
        return JSONResponse(content=expanses)
    if data["sort"] == "incomes":
        if data["sortBy"] == "date":
            if data["order"] == "asc":
                incomes = queries.get_incomes_asc_sort(account_id, Income.date)
            else:
                incomes = queries.get_incomes_desc_sort(account_id, Income.date)
        if data["sortBy"] == "category":
            if data["order"] == "asc":
                incomes = queries.get_incomes_asc_sort(account_id, Category_Income.name)
            else:
                incomes = queries.get_incomes_desc_sort(account_id, Category_Income.name)
        if data["sortBy"] == "amount":
            if data["order"] == "asc":
                incomes = queries.get_incomes_asc_sort(account_id, Income.amount)
            else:
                incomes = queries.get_incomes_desc_sort(account_id, Income.amount)
        return JSONResponse(content=incomes)
    

@app.post("/accounts/{account_id}/expanses/{expanse_id}/change")
async def post_change_expanse(account_id: int, expanse_id: int,\
                         date: Optional[str] = Form(default=None), \
                         category: Optional[str] = Form(default=None), \
                         amount: Optional[str] = Form(default=None)):
    """..."""
    if date is not None:
        queries.change_expanse_date(date, expanse_id)
    if category is not None:
        queries.change_expanse_category(category, expanse_id)
    if amount is not None:
        queries.change_expanse_amount(float(amount), account_id, expanse_id)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/expanses/{expanse_id}/delete")
async def post_delete_expanse(account_id: int, expanse_id: int):
    """..."""
    queries.delete_expanse(account_id, expanse_id)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/incomes/{income_id}/change")
async def post_change_income(account_id: int, income_id: int, \
                         date: Optional[str] = Form(default=None), \
                         category: Optional[str] = Form(default=None), \
                         amount: Optional[str] = Form(default=None)):
    """..."""
    if date is not None:
        queries.change_income_date(date, income_id)
    if category is not None:
        queries.change_income_category(category, income_id)
    if amount is not None:
        queries.change_income_amount(float(amount), account_id, income_id)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/incomes/{income_id}/delete")
async def post_delete_income(account_id: int, income_id: int):
    """..."""
    queries.delete_income(account_id, income_id)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/change-expanse-category-name")
async def post_change_expanse_category_name(account_id: int, \
                                            expanse_category: str = Form(...), \
                                            expanse_category_new_name: str = Form(...)):
    """..."""
    queries.change_expanse_category_name(expanse_category, expanse_category_new_name)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/change-income-category-name")
async def post_change_income_category_name(account_id: int, \
                                           income_category: str = Form(...), \
                                           income_category_new_name: str = Form(...)):
    """..."""
    queries.change_income_category_name(income_category, income_category_new_name)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/delete-expanse-category")
async def post_delete_expanse_category(account_id: int, \
                                       expanse_category: str = Form(...)):
    """..."""
    queries.delete_expanse_category(account_id, expanse_category)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/delete-income-category")
async def post_delete_income_category(account_id: int, \
                               income_category: str = Form(...)):
    """..."""
    queries.delete_income_category(account_id, income_category)
    return RedirectResponse(f"/accounts/{account_id}")


@app.post("/accounts/{account_id}/get-categories")
async def get_categories(request: Request, account_id: int):
    """..."""
    data = await request.json()
    print(data)
    if data["get"] == "expanses":
        expanse_categories = queries.get_expanse_categories(account_id)
        print(expanse_categories)
        return JSONResponse(content=expanse_categories)
    if data["get"] == "incomes":
        income_categories = queries.get_income_categories(account_id)
        print(income_categories)
        return JSONResponse(content=income_categories)
    

@app.post("/accounts/{account_id}/filter")
async def post_filter(request: Request):
    """..."""
    data = await request.json()

    id_categories = []
    for number in data["id_categories"]:
        id_categories.append(int(number))
    if not id_categories:
        id_categories = None
    data["id_categories"] = id_categories

    if data["startAmountValue"]:
        data["startAmountValue"] = float(data["startAmountValue"])
    else:
        data["startAmountValue"] = 0.0

    if data["endAmountValue"]:
        data["endAmountValue"] = float(data["endAmountValue"])
    else:
        data["endAmountValue"] = 1000000000.0

    if data["startDateValue"]:
        data["startDateValue"] = datetime.strptime(data["startDateValue"], "%Y-%m-%d")
    else:
        data["startDateValue"] = datetime(1970, 1, 1)

    if data["endDateValue"]:
        data["endDateValue"] = datetime.strptime(data["endDateValue"], "%Y-%m-%d")
    else:
        data["endDateValue"] = datetime(2199, 1, 1)

    if data["startAmountValue"]:
        try:
            data["startAmountValue"] = float(data["startAmountValue"])
        except ValueError:
            print("Ошибка: Невозможно сконвертировать строку в число типа float.")
    else:
        pass

    if data["endAmountValue"]:
        try:
            data["endAmountValue"] = float(data["endAmountValue"])
        except ValueError:
            print("Ошибка: Невозможно сконвертировать строку в число типа float.")
    else:
        pass
    
    print(data)
    if data["type"] == "expanses":
        expanses = queries.filter_expanses(data)
        return JSONResponse(content=expanses)
    if data["type"] == "incomes":
        incomes = queries.filter_incomes(data)
        print(incomes)
        return JSONResponse(content=incomes)
