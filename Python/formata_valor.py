# -*- coding: utf-8 -*-


def formata(msg):
    #msg = str(msg.split("[{u'Carimbo de data/hora': u'"))
    #msg = str(msg.split("u'Temperatura': u"))


    data = ""
    for i in range(41, 60):
        data = data + msg[i]

    temperatura = ""
    for i in range(106, 111):
        temperatura = temperatura + msg[i]

    estado = msg[105]

    print data
    print temperatura
    print estado

    return data, temperatura, estado


    [{u'AY': u'', u'Carimbo de data/hora': u'08/11/2018 22:24:58', u'AZ': u'', u'Temperatura': u'', u'AX': u'025.80'}]

