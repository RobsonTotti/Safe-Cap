# -*- coding: utf-8 -*-


import ibm_db
from sheetsu import SheetsuClient

import conexao
import formata_valor
import adiciona_evento


# while True:
try:
    client = SheetsuClient("https://sheetsu.com/apis/v1.0su/7435ec86a4ee")
    mensagem = str(client.read(limit=1))

    msg = mensagem
    aux = ""
    for i in range(0, 2):
        aux = aux + msg[i]

    print "AUX: " + aux
    print mensagem

    if(aux == "[{"):

        value = formata_valor.formata(mensagem)

        data = value[0]
        temperatura = value[1]
        estado = value[2]

        print value

        adiciona_evento.verifica_igualdade(data, temperatura, estado)
    else:
        print "Erro ao buscar Informações - 502 Bad Gateway"

except Exception, e:
    #print("Erro ao buscar Informações - 502 Bad Gateway")
    print e

'''

from sheetsu import SheetsuClient

client = SheetsuClient("https://sheetsu.com/apis/v1.0su/7435ec86a4ee")
# Read first two rows from sheet "Sheet2"
#client.read(sheet="Sheet2", limit=2)

mensagem = str(client.read(limit=1))

print mensagem
'''
