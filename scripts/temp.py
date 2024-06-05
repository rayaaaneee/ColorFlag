import os
import re
import glob

directories = glob.glob("public/images/maps/country/*")

if __name__ == "__main__":
    for directory in directories:
        for path, subfolders, subfiles in os.walk(directory, topdown=False):
            for file in subfiles:
                
                file_path = os.path.join(path, file)

                if file_path.endswith('.svg'):

                    state_code = path.split('/')[-1]

                    file = open(file_path)

                    file_content = file.read()

                    modified_content = re.sub(r'fill=".*?"', '', file_content)

                    file.write(modified_content)

                    os.rename(file_path, os.path.join(path, f'{state_code}.svg'))

                    file.close()