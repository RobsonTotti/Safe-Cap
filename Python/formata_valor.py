# -*- coding: utf-8 -*-


def formata(msg):
    msg = str(msg.split("[{u'Carimbo de data/hora': u'"))
    #msg = str(msg.split("u'Temperatura': u"))


    data = ""
    for i in range(6, 25):
        data = data + msg[i]

    temperatura = ""
    for i in range(46, 48):
        temperatura = temperatura + msg[i]

    estado = msg[60]

    return data, temperatura, estado