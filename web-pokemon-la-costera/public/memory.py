import random

def inicialitzaTauler(mida):
   
    return [['?' for _ in range(mida)] for _ in range(mida)]

def mostraTauler(tauler):
   
    mida = len(tauler)
    print("  " + " ".join(map(str, range(mida))))  # Números de columna
    for i, fila in enumerate(tauler):
        print(f"{i} " + " ".join(fila))  # Números de fila i contingut

def posaPeces(mida):
    
    lletres = [chr(65 + i // 2) for i in range(mida * mida)]  # A, A, B, B, ...
    matriu = []
    for i in range(mida):
        fila = lletres[i * mida:(i + 1) * mida]
        matriu.append(fila)
    return matriu

def remenaPeces(matriu):
    
    mida = len(matriu)
    peces = [matriu[i][j] for i in range(mida) for j in range(mida)]
    random.shuffle(peces)
    for i in range(mida):
        for j in range(mida):
            matriu[i][j] = peces.pop()

def torn(tauler, secret, jugador):
    
    print(f"\nTorn del jugador {jugador}!")
    mida = len(tauler)

    def validarDada():
        while True:
            try:
                valor = int(input("Introdueix un valor (0 a {}) : ".format(mida - 1)))
                if 0 <= valor < mida:
                    return valor
                else:
                    print("Valor fora de rang. Torna-ho a intentar.")
            except ValueError:
                print("Entrada no vàlida. Torna-ho a intentar.")

    def validarCasella(fila, columna):
        return tauler[fila][columna] == '?'

    # Primera tirada
    print("Primera tirada...")
    while True:
        fila1 = validarDada()
        columna1 = validarDada()
        if validarCasella(fila1, columna1):
            break
        print("Casella ja destapada. Torna-ho a intentar.")
    tauler[fila1][columna1] = secret[fila1][columna1]
    mostraTauler(tauler)

    # Segona tirada
    print("Segona tirada...")
    while True:
        fila2 = validarDada()
        columna2 = validarDada()
        if validarCasella(fila2, columna2) and (fila1 != fila2 or columna1 != columna2):
            break
        print("Casella no vàlida. Torna-ho a intentar.")
    tauler[fila2][columna2] = secret[fila2][columna2]
    mostraTauler(tauler)

    # Comprovar si coincideixen
    if secret[fila1][columna1] == secret[fila2][columna2]:
        print("Coincideixen! Les peces es queden destapades.")
        return True
    else:
        print(f"No coincideixen: {secret[fila1][columna1]} i {secret[fila2][columna2]}. Es tornen a tapar les peces.")
        tauler[fila1][columna1] = '?'
        tauler[fila2][columna2] = '?'
        return False

def obtenirMidaTauler():
    
    while True:
        try:
            mida = int(input("Introdueix la mida del tauler (nombre parell entre 2 i 10): "))
            if mida >= 2 and mida <= 10 and mida % 2 == 0:
                return mida
            else:
                print("La mida ha de ser un nombre parell entre 2 i 10. Torna-ho a intentar.")
        except ValueError:
            print("Entrada no vàlida. Torna-ho a intentar.")

# Programa principal
if __name__ == "__main__":
    print("Benvingut al joc del Memory!")
    mida = obtenirMidaTauler()  # Obtenir la mida del tauler del jugador
    tauler = inicialitzaTauler(mida)
    secret = posaPeces(mida)
    remenaPeces(secret)

    mostraTauler(tauler)

    # Joc principal
    punts_jugador1 = 0
    punts_jugador2 = 0
    jugador_actual = 1

    while punts_jugador1 + punts_jugador2 < (mida * mida) // 2:
        if jugador_actual == 1:
            if torn(tauler, secret, jugador_actual):
                punts_jugador1 += 1
            else:
                jugador_actual = 2  # Cambiar al jugador 2
        else:
            if torn(tauler, secret, jugador_actual):
                punts_jugador2 += 1
            else:
                jugador_actual = 1  # Cambiar al jugador 1

        print(f"Punts jugador 1: ", punts_jugador1, "Punts jugador 2: ", punts_jugador2)

    # Mostrar el guanyador
    print("\nFelicitats! El joc ha acabat!")
    if punts_jugador1 > punts_jugador2:
        print("El guanyador és el jugador 1 amb", punts_jugador1, "punts!")
    elif punts_jugador2 > punts_jugador1:
        print("El guanyador és el jugador 2 amb", punts_jugador2, "punts!")
    else:
        print("És un empat!")