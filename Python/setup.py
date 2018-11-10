# -*- coding: utf-8 -*-

import ibm_db
from sheetsu import SheetsuClient

import conexao
import formata_valor
import adiciona_evento


while True:
    #try:
    client = SheetsuClient("https://sheetsu.com/apis/v1.0su/4705062944af")
    mensagem = str(client.read(limit=1))

    value = formata_valor.formata(mensagem)

    data = value[0]
    temperatura = value[1]
    estado = value[2]

    adiciona_evento.verifica_igualdade(data, temperatura, estado)

    #except:
        #print("Erro ao buscar Informações - 502 Bad Gateway")
