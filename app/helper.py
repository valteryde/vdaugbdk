
import pathlib
import os

BASE_DIR = pathlib.Path(__file__).parent.resolve().absolute()

def path(*args):
    return os.path.join(BASE_DIR, *args)
