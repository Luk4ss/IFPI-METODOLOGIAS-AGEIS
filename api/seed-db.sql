drop table acao;

create table IF NOT EXISTS acao(
id_acao SERIAL PRIMARY KEY,
codigo VARCHAR(20),
valor_unitario NUMERIC(20,2),
quantidade BIGINT,
taxa_b3 NUMERIC(12,2),
operacao VARCHAR(10),
taxa_corretagemNUMERIC(12,2),
valor_total NUMERIC(20,2),
dt_operacao DATE
);

INSERT INTO acao(codigo, valor_unitario, quantidade, taxa_b3, operacao, taxa_corretagem,
	valor_total, dt_operacao) 
VALUES('B3SA3',12.00, 100, 0.36, 'COMPRA', 2.50, 1202.86, '24/09/2022');

INSERT INTO acao(codigo, valor_unitario, quantidade, taxa_b3, operacao, taxa_corretagem,
	valor_total, dt_operacao) 
VALUES('ITSA4', 9.50, 100, 0.28, 'COMPRA', 2.50, 957.78, '21/09/2022');

INSERT INTO acao(codigo, valor_unitario, quantidade, taxa_b3, operacao, taxa_corretagem,
	valor_total, dt_operacao) 
VALUES('B3SA3', 20.00, 100, 0.60, 'VENDA', 2.50, 1996.90, '20/09/2022');