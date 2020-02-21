from flask import Flask, request
import json
import os
import pandas as pd
from bson import json_util
from bson.objectid import ObjectId


import coords
import Corona_Virus_2019_Confirmed_Cases
import Corona_Virus_2019_Death_Cases
import H1N1
import SARS
import merge

coords.coords()
Corona_Virus_2019_Confirmed_Cases.corono_case()
Corona_Virus_2019_Death_Cases.corona_death()
H1N1.h1n1()
SARS.SARS()
merge.merge()

confirmed_df = pd.read_csv(os.path.join('..','finalData','cases.csv'))
deaths_df = pd.read_csv(os.path.join('..','finalData','deaths.csv'))
confirmed_dict = confirmed_df.to_dict('records')
deaths_dict = deaths_df.to_dict('records')
# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
# Create an instance of our Flask app.
app = Flask(__name__)
# Create variable for our connection string
conn = 'mongodb://localhost:27017'
# Pass connection string to the pymongo instance.
client = pymongo.MongoClient(conn)
# Connect to a database. 
# If the database doesn't already exist, our code will create it automatically as soon as we insert a record.
db = client.viruses
# Drops collection if available to remove duplicates
db.confirmed.drop()
db.death.drop()
# Creates a collection in the database and inserts three documents
db.confirmed.insert_many(confirmed_dict)
db.death.insert_many(deaths_dict)
confirmed_results = db.confirmed.find()
deaths_results = db.deaths.find()
confirmed_list = list(confirmed_results)
deaths_list = list(deaths_results)
confirmed_json = json.dumps(confirmed_list, default=json_util.default)
deaths_json = json.dumps(deaths_list, default=json_util.default)
#

path = os.path.join('..','..','js','cases.json')
with open(path,'w') as file:
	json.dump(confirmed_json, file)
path = os.path.join('..','..','js','deaths.json')
with open(path,'w') as file:
	json.dump(deaths_json, file)