import json

def sort_and_write_json(file_path: str):
    with open(file_path, "r") as f:
        data = json.load(f)

    data.sort(key=lambda x: x["name"])

    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)

if __name__ == "__main__":

    base_src: str = "src/asset/data"

    sort_and_write_json(f"{ base_src }/countries.json")

    sort_and_write_json(f"{ base_src }/us-states.json")

    sort_and_write_json(f"{ base_src }/continents.json")