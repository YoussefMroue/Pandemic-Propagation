#we import necessary modules
import pandas as pd
import numpy as np
from bs4 import BeautifulSoup as bs
import requests
import os

def coords():
	#we get our url to scrape coords
	url = 'https://developers.google.com/public-data/docs/canonical/countries_csv'
	response = requests.get(url)
	soup = bs(response.text, 'html.parser')

	#and we scrape
	coords_df = pd.DataFrame({'Country': [], 'Latitude': [], 'Longitude': []})
	table = soup.find('table')
	rows = table.findAll('tr')
	for row in rows[1:]:
	    data = row.findAll('td')
	    country = data[3].text
	    lat = data[1].text
	    long = data[2].text
	    new_data = [country,lat,long]
	    coords_df.loc[len(coords_df)] = new_data


	#now we export to csv
	path = os.path.join('..','rawdata','coords.csv')
	coords_df.to_csv(path)