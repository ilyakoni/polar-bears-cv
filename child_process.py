import json
import os
import pathlib

#retrieving PATH from json file
f = open('CONFIG.json')
data = json.load(f)
path = pathlib.Path(data['PATH_TO_IMAGES'])
print(path)


for i, name in enumerate(os.listdir(path)):
    os.rename(path / name, path / (f"new_name{i}" + '.png'))