import os

if __name__ == "__main__":
    for _, _, subfiles in os.walk("public/images/maps/country", topdown=False):
        print(subfiles)