import os
import base64
import hmac
import hashlib

from typing import Optional
from dotenv import load_dotenv

from fastapi import FastAPI, Form, Cookie
from fastapi.responses import Response
# from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates

from app.queries import select_users_all, insert_user
# Объект Cookie для чтения данных куки
# Объект Form для чтения данных из формы
app = FastAPI()

# app.mount(
#     "/static",
#     StaticFiles(directory="static"),
#     name="static"
# )

# templates = Jinja2Templates(directory="templates")

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
PASSWORD_SALT = os.getenv("PASSWORD_SALT")

with open("templates/login.html", "r") as f:
    login_page = f.read()

with open("templates/register.html", "r") as f:
    registration_page = f.read()


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
    """Возвращает захэшированный пароль"""
    return hashlib.sha256( (password + PASSWORD_SALT).encode() ).hexdigest().lower()


def verify_password(password: str, stored_hashed_password: str) -> bool:
    """Возвращает результат проверки пароля"""
    hashed_password = get_hashed_password(password)
    return hashed_password == stored_hashed_password


@app.get("/")
def index_page(mail_signed: Optional[str] = Cookie(default=None)) -> Response:
    """Функция, которая отправляет в ответ страницу главную страницу"""
    users = select_users_all()
    if not mail_signed:
        return Response(login_page, media_type="text/html")
    valid_mail = get_data_from_signed_string(mail_signed)
    if not valid_mail:
        response = Response(login_page, media_type="text/html")
        response.delete_cookie("mail_signed")
        return response
    try:
        user = users[valid_mail]
    except KeyError:
        response = Response(login_page, media_type="text/html")
        response.delete_cookie(key="mail")
        return response
    return Response(
        f"Привет, {user["name"]} {user["surname"]}!", media_type="text/html"
    )


@app.post("/login")
def post_login_page(mail: str = Form(...), password: str = Form(...)) -> Response:
    """..."""
    users = select_users_all()
    user = users.get(mail)

    if not user or not verify_password(password, user["hashed_password"]):
        return Response(login_page, media_type="text/html")
    
    response = Response(
        f"Привет, {user["name"]} {user["surname"]}!", media_type="text/html"
    )
    mail_signed = base64.b64encode(mail.encode()).decode() + "." + sign_data(mail)
    response.set_cookie(key="mail_signed", value=mail_signed)
    return response


@app.get("/register")
async def get_register_page() -> Response:
    """..."""
    return Response(registration_page, media_type="text/html")


@app.post("/register")
async def post_register_page(name: str = Form(...), surname: str = Form(...), \
                             mail: str = Form(...), password: str = Form(...)) -> Response:
    """..."""
    users = select_users_all()
    if mail in users:
        return Response(registration_page)
    insert_user(name, surname, mail, get_hashed_password(password))
    return Response(login_page, media_type="text/html")
