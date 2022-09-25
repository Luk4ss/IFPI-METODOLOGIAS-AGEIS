export interface Acao{
    id?: number
    taxaB3?: number
    codigo: string,
    valorUnitario: number,
    quantidade: number,
    taxaCorretagem: number,
    operacao: string,
    data: string
    valorTotal?: number    
}