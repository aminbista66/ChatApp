from pymongo.mongo_client import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv, find_dotenv
import os

# load_dotenv(find_dotenv())

class MongoDB:
    _connection_string = ""
    
    def __init__(self):
        self._connection_string =os.environ.get("MONGODB_CONNECTION_STRING")

    def connect(self, db_name):
        print(self)
        return MongoClient(self._connection_string)[db_name]