import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from dotenv import load_dotenv


load_dotenv()
DB_NAME = os.getenv("POSTGRESQL_DB_NAME")
USER_NAME = os.getenv("POSTGRESQL_USER_NAME")
USER_PASSWORD = os.getenv("POSTGRESQL_USER_PASSWORD")

SQLALCHEMY_DATABASE_URL = f"postgresql://{USER_NAME}:{USER_PASSWORD}@localhost/{DB_NAME}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
