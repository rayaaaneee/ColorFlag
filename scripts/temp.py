import os
import glob

directories = glob.glob("public/images/maps/country/*")

if __name__ == "__main__":
    """ for path, subfolders, subfiles in os.walk("public/images/maps/country/*", topdown=False):
        print(path, subfolders, subfiles) """
    for directory in directories:
        for _, _, subfiles in os.walk(directory, topdown=False):
            # move vector.svg to ../
            for subfile in subfiles:
                if subfile.endswith(".svg"):
                    print(subfile)
                    os.rename(f"{directory}/{subfile}", f"public/images/maps/{subfile}")
                    break