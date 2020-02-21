from flask import Flask, request, render_template, jsonify
import os
import pandas as pd
import numpy as np
import pymongo
import json
from bson import json_util
from bson.objectid import ObjectId

# import coords
# import Corona_Virus_2019_Confirmed_Cases
# import Corona_Virus_2019_Death_Cases
# import H1N1
# import SARS
# import merge

# coords.coords()
# Corona_Virus_2019_Confirmed_Cases.corono_case()
# Corona_Virus_2019_Death_Cases.corona_death()
# H1N1.h1n1()
# SARS.SARS()
# merge.merge()

confirmed_df = pd.read_csv(os.path.join('assets','data','finalData','cases.csv'))
deaths_df = pd.read_csv(os.path.join('assets','data','finalData','deaths.csv'))
confirmed_dict = confirmed_df.to_dict('records')
deaths_dict = deaths_df.to_dict('records')
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

def is_nan(x):
    return (x is np.nan or x != x)

@app.route("/")
def home():
	return render_template("index.html")


@app.route("/api/cases")
def cases():
	confirmed_results = db.confirmed.find({},{"_id":0})
	confirmed_list = list(confirmed_results)
	for result in confirmed_list:
		for k, v in result.items():
			if is_nan(v):
				result[k] = "null"
	return jsonify(confirmed_list)

@app.route("/api/deaths")
def deaths():
	deaths_results = db.deaths.find()
	deaths_list = list(deaths_results)
	for result in deaths_list:
		for k, v in result.items():
			if is_nan(v):
				result[k] = "null"
	return jsonify(deaths_list)


if __name__ == "__main__":
    app.run(debug=True)
