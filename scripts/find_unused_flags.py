import json
import os
from _vars import flag_images_path, base_data_path

#/ Find unused flags in countries.json and unused flags in svg folder
if __name__ == "__main__":

    flag_images: list[str] = []
    for _, _, files in os.walk(flag_images_path):
        for file in files:
            flag_images.append(file.replace(".svg", "")) if file.endswith('.svg') else None

    flags_in_json: list[str] = []
    flag_datas_path: str = f"{base_data_path}/countries.json"
    with open(flag_datas_path, 'r') as f:
        flags_in_json = json.load(f)

    print (f"\nCountries to add in {flag_datas_path} : %s \n" % [flag for flag in flag_images if flag not in [flag["code"] for flag in flags_in_json]])

    print (f"Countries without image in {flag_images_path} : %s \n" % [flag["code"] for flag in flags_in_json if flag["code"] not in flag_images])