# -*- coding: utf-8 -*-

import ibm_db

import conexao

connection = conexao.conexao()


def verifica_igualdade(dt, temp, status):

    select = "SELECT DTEVENTO FROM EVENTO ORDER BY IDEVENTO DESC LIMIT 1"

    result = ibm_db.fetch_both(ibm_db.exec_immediate(connection, select))

    dtevento = result["DTEVENTO"]

    if(dt != dtevento):
        insere_evento(dt, temp, status)


def insere_evento(dt, temp, status):

    insert = "INSERT INTO DBA.EVENTO (IDUSUARIO, DTEVENTO, TEMPERATURA, STATUS) VALUES(2, '%s', '%s', '%s')" % (
        dt, temp, status)

    ibm_db.exec_immediate(connection, insert)
