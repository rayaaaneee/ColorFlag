import json
from _vars import base_data_path

def sort_and_write_json(file_path: str):
    with open(file_path, "r") as f:
        data = json.load(f)

    data.sort(key=lambda x: x["name"])

    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)


if __name__ == "__main__":

    print("\nSorting countries.json...\n")
    sort_and_write_json(f"{ base_data_path }/countries.json")

    print("\nSorting us-states.json...\n")
    sort_and_write_json(f"{ base_data_path }/us-states.json")

    print("\nSorting continents.json...\n")
    sort_and_write_json(f"{ base_data_path }/continents.json")
    
    print("\nDatas successfully sorted!\n")