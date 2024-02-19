from sqlalchemy import Column, Integer, String, Float, ForeignKey, Enum, Date
from sqlalchemy.orm import relationship

from core.db import Base


class User(Base):
    """Класс для таблицы Пользователи"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(20))
    surname = Column(String(20))
    email = Column(String(30), unique=True)
    hashed_password = Column(String(100))

    accounts = relationship("Account", back_populates="user")


class Account(Base):
    """Класс для таблицы Счета"""
    __tablename__ = "accounts"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(20))
    balance = Column(Float)
    currency = Column(Enum("RUB", "USD", "EUR", name="currency_enum", create_type=False))
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="accounts")
    incomes = relationship("Income", back_populates="account")
    expanses = relationship("Expanse", back_populates="account")


class Income(Base):
    """Класс для таблицы Доходы"""
    __tablename__ = "incomes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    amount = Column(Float)
    account_id = Column(Integer, ForeignKey("accounts.id"))
    category_income_id = Column(Integer, ForeignKey("categories_income.id"))
    date = Column(Date)

    account = relationship("Account", back_populates="incomes")
    category_income = relationship("Category_Income", back_populates="incomes")


class Expanse(Base):
    """Класс для таблицы Расходы"""
    __tablename__ = "expanses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    amount = Column(Float)
    account_id = Column(Integer, ForeignKey("accounts.id"))
    category_expanse_id = Column(Integer, ForeignKey("categories_expanse.id"))
    date = Column(Date)

    account = relationship("Account", back_populates="expanses")
    category_expanse = relationship("Category_Expanse", back_populates="expanses")


class Category_Income(Base):
    """Класс для таблицы Категории дохода"""
    __tablename__ = "categories_income"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(20))

    incomes = relationship("Income", back_populates="category_income")


class Category_Expanse(Base):
    """Класс для таблицы Категории расходов"""
    __tablename__ = "categories_expanse"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(20))

    expanses = relationship("Expanse", back_populates="category_expanse")
