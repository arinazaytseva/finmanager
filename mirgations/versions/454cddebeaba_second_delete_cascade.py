"""second delete cascade

Revision ID: 454cddebeaba
Revises: e74f634e1b48
Create Date: 2024-03-06 18:22:43.798689

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '454cddebeaba'
down_revision: Union[str, None] = 'e74f634e1b48'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('categories_expanse_account_id_fkey', 'categories_expanse', type_='foreignkey')
    op.create_foreign_key(None, 'categories_expanse', 'accounts', ['account_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('categories_income_account_id_fkey', 'categories_income', type_='foreignkey')
    op.create_foreign_key(None, 'categories_income', 'accounts', ['account_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('expanses_account_id_fkey', 'expanses', type_='foreignkey')
    op.create_foreign_key(None, 'expanses', 'accounts', ['account_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('incomes_account_id_fkey', 'incomes', type_='foreignkey')
    op.create_foreign_key(None, 'incomes', 'accounts', ['account_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'incomes', type_='foreignkey')
    op.create_foreign_key('incomes_account_id_fkey', 'incomes', 'accounts', ['account_id'], ['id'])
    op.drop_constraint(None, 'expanses', type_='foreignkey')
    op.create_foreign_key('expanses_account_id_fkey', 'expanses', 'accounts', ['account_id'], ['id'])
    op.drop_constraint(None, 'categories_income', type_='foreignkey')
    op.create_foreign_key('categories_income_account_id_fkey', 'categories_income', 'accounts', ['account_id'], ['id'])
    op.drop_constraint(None, 'categories_expanse', type_='foreignkey')
    op.create_foreign_key('categories_expanse_account_id_fkey', 'categories_expanse', 'accounts', ['account_id'], ['id'])
    # ### end Alembic commands ###
