import os
import re

# Dictionnaire des abréviations des pays
pays_abrev = {
    "fr": "france",
    "us": "united-states",
    # Ajoutez d'autres abréviations de pays et leur nom complet en anglais ici
}

# Chemin du dossier contenant les images
dossier = "1x1"

current_dir = os.getcwd() + f"\\asset\\img\\flags\\{dossier}"

# Parcours de tous les fichiers dans le dossier
for fichier in os.listdir(current_dir):
    chemin_complet = os.path.join(dossier, fichier)
    
    # Vérifier si le fichier est un fichier PNG
    if os.path.isfile(chemin_complet) and fichier.lower().endswith(".png"):
        
        # Extraire l'abréviation du nom de fichier
        abreviation = re.match(r'([a-zA-Z]+)\.png', fichier).group(1).lower()
        
        # Vérifier si l'abréviation existe dans le dictionnaire
        if abreviation in pays_abrev:
            # Renommer le fichier avec le nom complet en anglais
            nouveau_nom = pays_abrev[abreviation] + ".png"
            nouveau_chemin = os.path.join(dossier, nouveau_nom)
            os.rename(chemin_complet, nouveau_chemin)
            print(f"Renommage de {fichier} en {nouveau_nom}")
        else:
            print(f"Aucune correspondance trouvée pour l'abréviation {abreviation}")
