from typing import Union
from datetime import *

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import *
from sqlalchemy import *
from psycopg2 import *

from database_querys import getAll, insertAcao, getAllOrdenado, deleteAllAcoesBanco

app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Modelo de Dado que está vindo do front-end
class AcaoDTO(BaseModel):
    data: str
    codigo: str
    valorUnitario: float
    quantidade: int
    taxaCorretagem: float
    operacao: str
    


# region Entidades
class Acao:
    def __init__(self, codigo, valorUnitario, quantidade, taxaCorretagem, operacao, data, id=0):             
        self.codigo = codigo
        self.valorUnitario = valorUnitario
        self.quantidade = quantidade
        self.taxaCorretagem = taxaCorretagem        
        self.operacao = operacao
        self.data = data
        self.id = id
        self.taxaB3 = self.calcula_taxaB3(quantidade, valorUnitario)
        self.valorTotal = self.valor_liquido(quantidade, valorUnitario, operacao, taxaCorretagem)

    def calcula_taxaB3(self, qtd, valor_unitario):
        return (self.valor_bruto(qtd, valor_unitario) * 0.0003).__round__(2)

    def valor_bruto(self, qtd, valor_unitario):
        return (qtd * valor_unitario).__round__(2)

    def valor_liquido(self, qtd, valor_unitario, tipo_operacao, taxa_corretagem):
        if tipo_operacao == 'COMPRA':
            return (self.valor_bruto(qtd, valor_unitario) + self.taxaB3 + taxa_corretagem).__round__(2)

        return (self.valor_bruto(qtd, valor_unitario) - self.taxaB3 - taxa_corretagem).__round__(2)


# endregion


acoes = []

def carregar_dados(orderBy=0) -> None:
    acoes.clear()
    if orderBy == 0:
        acoes_no_banco = getAll()
    elif orderBy == 1:
         acoes_no_banco = getAllOrdenado('codigo')
    elif orderBy == 2:
        acoes_no_banco = getAllOrdenado('operacao')
    else:
       acoes_no_banco = getAllOrdenado('dt_operacao') 
    for r in acoes_no_banco:
        cd = r["codigo"]
        vu = float(r["valor_unitario"])
        qtd = int(r["quantidade"])
        op = r["operacao"]
        dt_op = r["dt_operacao"]
        taxa = float(r["taxa_corretagem"])
        id = int(r["id_acao"])
        acao = Acao(cd, vu, qtd, taxa, op, dt_op, id)
        acoes.append(acao)


@app.get("/acoes", status_code = 200)
def list_acoes():
    carregar_dados()
    return acoes

@app.get("/acoes/orderByCodigo", status_code = 200)
def list_acoes_ordenadas():
    carregar_dados(1)
    return acoes


@app.get("/acoes/orderByOperacao", status_code = 200)
def list_acoes_ordenadas():
    carregar_dados(2)
    return acoes

@app.get("/acoes/orderByData", status_code = 200)
def list_acoes_ordenadas():
    carregar_dados(3)
    return acoes


@app.post("/acoes", status_code = 201)
def insert_acoes(acaoDto: AcaoDTO):
    codigo = acaoDto.codigo
    valorUnitario = acaoDto.valorUnitario
    quantidade = acaoDto.quantidade
    taxaCorretagem = acaoDto.taxaCorretagem
    operacao = acaoDto.operacao
    data =  datetime.strptime(acaoDto.data.strip(), "%d/%m/%Y").date()
    acao_entity = Acao(codigo, valorUnitario, quantidade, taxaCorretagem, operacao, data)
    insertAcao(acao_entity)
    acoes.append(acao_entity)
    return acaoDto

@app.delete("/acoes/delete", status_code=204)
def deleteAllAcoes():
    deleteAllAcoesBanco()
    acoes.clear()
