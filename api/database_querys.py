from tkinter.tix import Tree
from sqlalchemy import *
from psycopg2 import *



# Create 
# db.execute("CREATE TABLE IF NOT EXISTS films (title text, director text, year text)")  
# db.execute("INSERT INTO films (title, director, year) VALUES ('Doctor Strange', 'Scott Derrickson', '2016')")

# Read

global order;

order = "desc"

def getAll():
    """
    
    Conecta-se ao banco de dados e executa uma consulta retornado todas ações.

    """
    connection_string = "postgresql://postgres:123456@localhost:5432/metagil"
    db = create_engine(connection_string)
    result_set = db.execute("SELECT * FROM acao") 
    return result_set 


def getAllOrdenado(orderBy):
    """
    
    Conecta-se ao banco de dados e executa uma consulta retornado todas ações de forma ordenada.

    """
    global order;
    connection_string = "postgresql://postgres:123456@localhost:5432/metagil"
    db = create_engine(connection_string)
    if order == "desc":
        order = "asc"
    if orderBy == "id_acao":
        order = "asc"
    else:
        order = "desc"
    result_set = db.execute(f"SELECT * FROM acao ORDER BY {orderBy} {order} ") 
    return result_set 


def insertAcao(acao):
    """
    
    Conecta-se ao banco de dados e faz-se uma INSERT no banco de dados de uma ação.

    """
    connection_string = "postgresql://postgres:123456@localhost:5432/metagil"
    db = create_engine(connection_string)
    db.execute(f"INSERT INTO acao(codigo, valor_unitario,  quantidade,   taxa_b3,  operacao,  taxa_corretagem,valor_total,dt_operacao) VALUES('{acao.codigo}', {acao.valorUnitario}, {acao.quantidade}, {acao.taxaB3}, '{acao.operacao}', {acao.taxaCorretagem},  {acao.valorTotal}, '{acao.data}')")


def deleteAllAcoesBanco():
    """
    
    Conecta-se ao banco de dados e executa uma consulta deletando todas ações.

    """
    connection_string = "postgresql://postgres:123456@localhost:5432/metagil"
    db = create_engine(connection_string)
    db.execute("DELETE FROM acao") 


def main():
    pass


if __name__ == '__main__':
    main()