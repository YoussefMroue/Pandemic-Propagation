from flask import Flask, render_template
import pymongo
import os
import pandas as pd

cases_path = os.path.join('assets','data','cleanData','SARS_cases.csv')
deaths_path = os.path.join('assets','data','cleanData','SARS_deaths.csv')
cases_df = pd.read_csv(cases_path, index_col=0)
deaths_df = pd.read_csv(deaths_path, index_col=0)

cases_dict = cases_df.to_dict('records')
deaths_dict = deaths_df.to_dict('records')


app = Flask(__name__)
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.virus_db
db.cases.drop()
db.deaths.drop()

db.cases.insert_many(cases_dict)
db.deaths.insert_many(deaths_dict)


