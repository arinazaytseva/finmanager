import sys

sys.path.insert(0, "/Users/arinazajceva/code/finmanager")

from sqlalchemy import select, insert

from core.base import User
from core.db import engine


def select_users_all() -> dict:
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


def insert_user(user_name: str, user_surname: str, \
                user_mail: str, user_hashed_password: str):
    """Функция, которая выполняет запрос для добавления пользователя в таблицу User"""
    stmt = insert(User).values(name=user_name, surname=user_surname, email=user_mail, \
                               hashed_password=user_hashed_password)
    stmt.compile()
    with engine.connect() as conn:
        conn.execute(stmt)
        conn.commit()

# Добавить пользователя
# INSERT INTO users (name, surname, email, hashed_password) 
# VALUES ('', '', '', '');
