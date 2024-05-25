import json
import os

## Find unused flags in countries.json and unused flags in svg folder ##

if __name__ == "__main__":

    flagImages: list[str] = []
    flagImagesPath: str = "src/asset/img/flags/4x3/"
    for _, _, files in os.walk(flagImagesPath):
        for file in files:
            flagImages.append(file.replace(".svg", "")) if file.endswith('.svg') else None

    flagsInJson: list[str] = []
    flagDatasPath: str = "src/asset/data/countries.json"
    with open(flagDatasPath, 'r') as f:
        flagsInJson = json.load(f)

    print (f"\nCountries to add in {flagDatasPath} : %s \n" % [flag for flag in flagImages if flag not in [flag["code"] for flag in flagsInJson]])

    print (f"Countries without image in {flagImagesPath} : %s \n" % [flag["code"] for flag in flagsInJson if flag["code"] not in flagImages])