import json

if __name__ == "__main__":
    
    base_src: str = "src/asset/data";
    
    countries: list[object] = []
    with open(f"{ base_src }/countries.json", "r") as f:
        json.load(f),

    us_states: list[object] = [];
    with open(f"{ base_src }/us-states.json", "r") as f:
        us_states += json.load(f)
    
    continents: list[object] = [];
    with open(f"{ base_src }/continents.json", "r") as f:
        continents += json.load(f)

    datas: list[list[object]] = [countries, us_states, continents];