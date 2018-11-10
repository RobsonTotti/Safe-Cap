# -*- coding: utf-8 -*-

import ibm_db

def conexao():
    connection = ibm_db.connect("DATABASE=SAFECAP;HOSTNAME=LOCALHOST;PORT=50000;PROTOCOL=TCPIP; UID=dba;PWD=123", "", "")

    return connection