from sqlalchemy import *
from psycopg2 import *



# Create 
# db.execute("CREATE TABLE IF NOT EXISTS films (title text, director text, year text)")  
# db.execute("INSERT INTO films (title, director, year) VALUES ('Doctor Strange', 'Scott Derrickson', '2016')")

# Read

def getAll():
    connection_string = "postgresql://postgres:123456@localhost:5432/metagil"
    db = create_engine(connection_string)
    result_set = db.execute("SELECT * FROM acao") 
    return result_set 


def getAllOrdenado(orderBy):
    connection_string = "postgresql://postgres:123456@localhost:5432/metagil"
    db = create_engine(connection_string)
    result_set = db.execute(f"SELECT * FROM acao ORDER BY {orderBy} desc ") 
    return result_set 


def insertAcao(acao):
    connection_string = "postgresql://postgres:123456@localhost:5432/metagil"
    db = create_engine(connection_string)
    db.execute(f"INSERT INTO acao(codigo, valor_unitario,  quantidade,   taxa_b3,  operacao,  taxa_corretagem,valor_total,dt_operacao) VALUES('{acao.codigo}', {acao.valorUnitario}, {acao.quantidade}, {acao.taxaB3}, '{acao.operacao}', {acao.taxaCorretagem},  {acao.valorTotal}, '{acao.data}')")


def deleteAllAcoesBanco():
    connection_string = "postgresql://postgres:123456@localhost:5432/metagil"
    db = create_engine(connection_string)
    db.execute("DELETE FROM acao") 


def main():
    pass


if __name__ == '__main__':
    main()