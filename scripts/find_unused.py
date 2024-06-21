import json
import os
from typing import Dict, List

from _vars import (base_data_path, country_maps_images_path, flag_images_path,
                   maps_images_path, us_state_maps_images_path)

#/ Find unused flags in countries.json and unused flags in svg folder
if __name__ == "__main__":

    flag_images: List[str] = []
    for _, _, files in os.walk(flag_images_path):
        for file in files:
            flag_images.append(file.replace(".svg", "")) if file.endswith('.svg') else None

    json_dict = Dict[str, str]
    flags_in_json: List[json_dict] = []
    flag_datas_path: str = f"{base_data_path}/countries.json"
    with open(flag_datas_path, 'r') as f:
        flags_in_json = json.load(f)

    nb_flags_in_json: int = len(flags_in_json)

    countries_to_add: List[str] = [flag_img for flag_img in flag_images if flag_img not in [flag_json["id"] for flag_json in flags_in_json]]
    nb_countries_to_add: int = len(countries_to_add)
    print (f"\nCountries to add in {flag_datas_path} ({nb_countries_to_add} of {nb_flags_in_json}) : {countries_to_add} \n")

    countries_w_out_img: List[str] = [flag["id"] for flag in flags_in_json if flag["id"] not in flag_images]
    nb_countries_w_out_img: int = len(countries_w_out_img)
    print (f"Countries without image in {flag_images_path} ({nb_countries_w_out_img} of {nb_flags_in_json}) : {countries_w_out_img} \n")
    
    maps_images: List[str] = []
    for _, _, files in os.walk(country_maps_images_path):
        for file in files:
            id: str = file.replace(".svg", "")
            maps_images.append(id) if file.endswith('.svg') and not flags_in_json else None

    countries_w_out_map: List[str] = [flag["id"] for flag in flags_in_json if flag["id"] not in maps_images and flag.keys().__contains__("non_contry")]
    nb_countries_w_out_map: int = len(countries_w_out_map)
    print (f"Countries without map in {country_maps_images_path} ({nb_countries_w_out_map} of {nb_flags_in_json}) : {countries_w_out_map} \n")