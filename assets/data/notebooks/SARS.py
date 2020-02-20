#we do our imports
import pandas as pd
import numpy as np
from bs4 import BeautifulSoup as bs
import requests
import datetime as dt
import os
def SARS():
	#set up our basic values and get our website
	url = 'https://www.who.int/csr/sars/country/en/'
	base_url = 'https://www.who.int'
	base_date = dt.date(2003, 3, 17)
	last_day = -1
	response = requests.get(url)
	soup = bs(response.text, 'html.parser')

	#set up our dataframes
	cases_df = pd.DataFrame({'Virus': [], 'Country': [], 'Latitude': [], 'Longitude': []})
	deaths_df = pd.DataFrame({'Virus': [], 'Country': [], 'Latitude': [], 'Longitude': []})

	#loop through and retrieve data
	for item in soup.find('ul','auto_archive'):
	    if item.find('a') != -1:
	        #set up more values
	        link = item.find('a')['href']
	        date = item.find('a').text
	        print(date)
	        timedelta = dt.datetime.strptime(date, '%d %B %Y').date()-base_date
	        if timedelta.days < 120:
	            days_passed = timedelta.days - last_day
	            column = 'Day ' + str(timedelta.days)
	            #add columns to dataframe
	            while days_passed > 1:
	                cases_df['Day ' + str(timedelta.days - days_passed + 1)] = cases_df['Day ' + str(last_day)]
	                deaths_df['Day ' + str(timedelta.days - days_passed + 1)] = deaths_df['Day ' + str(last_day)]
	                days_passed = days_passed - 1
	            cases_df[column] = ''
	            deaths_df[column] = ''
	            last_day = timedelta.days

	            #retrieve data
	            daily_response = requests.get(base_url + link)
	            daily_soup = bs(daily_response.text, 'html.parser')
	            table = daily_soup.find('table')
	            rows = table.findAll('tr')
	            #there are different formats the data is in so we do a different case for each of them
	            if (dt.datetime.strptime('10 April 2003', '%d %B %Y').date()-dt.datetime.strptime(date, '%d %B %Y').date()).days > 0:
	                for row in rows[1:]:
	                    data = row.findAll('td')
	                    #we modify values slightly to suit our coords data
	                    country = data[0].text.strip()
	                    country = ''.join(i for i in country if not (i.isdigit()))
	                    country = ''.join(i for i in country if i!='^')
	                    country = ''.join(i for i in country if i!='+')
	                    country = country.strip()
	                    if 'Hong Kong' in country:
	                        country = 'Hong Kong'
	                    elif 'Taiwan' in country:
	                        country = 'Taiwan'
	                    elif 'Viet Nam' in country:
	                        country = 'Vietnam'
	                    elif 'Macao' in country:
	                        country = 'Macau'
	                    elif 'Ireland' in country:
	                        country = 'Ireland'
	                    elif 'Korea' in country:
	                        country = 'South Korea'
	                    elif 'Russia' in country:
	                        country = 'Russia'
	                    elif 'Total' in country:
	                        country = ''
	                    cases = ''.join(i for i in data[1].text.strip() if i.isdigit())
	                    deaths = ''.join(i for i in data[2].text.strip() if i.isdigit())

	                    if (country!='') and (cases!='') and (deaths!=''):
	                    #add data to table, adding rows if necessary
	                        if country not in cases_df['Country'].tolist():
	                            new_country_cases = ['SARS', country,0,0]
	                            new_country_deaths = ['SARS', country,0,0]
	                            count = 0
	                            while count < timedelta.days:
	                                new_country_cases.append(int(0))
	                                new_country_deaths.append(int(0))
	                                count += 1
	                            new_country_cases.append(int(cases))
	                            new_country_deaths.append(int(deaths))
	                            cases_df.loc[len(cases_df)] = new_country_cases
	                            deaths_df.loc[len(deaths_df)] = new_country_deaths
	                        else:
	                            cases_df.loc[cases_df['Country'] == country, [column]] = int(cases)
	                            deaths_df.loc[deaths_df['Country'] == country, [column]] = int(deaths)
	            elif (dt.datetime.strptime('25 April 2003', '%d %B %Y').date()-dt.datetime.strptime(date, '%d %B %Y').date()).days > 0:
	                for row in rows[2:]:
	                    data = row.findAll('td')
	                    country = data[0].text.strip()
	                    country = ''.join(i for i in country if not (i.isdigit()))
	                    country = ''.join(i for i in country if i!='^')
	                    country = ''.join(i for i in country if i!='+')
	                    country = country.strip()
	                    if 'Hong Kong' in country:
	                        country = 'Hong Kong'
	                    elif 'Taiwan' in country:
	                        country = 'Taiwan'
	                    elif 'Viet Nam' in country:
	                        country = 'Vietnam'
	                    elif 'Macao' in country:
	                        country = 'Macau'
	                    elif 'Ireland' in country:
	                        country = 'Ireland'
	                    elif 'Korea' in country:
	                        country = 'South Korea'
	                    elif 'Russia' in country:
	                        country = 'Russia'
	                    elif 'Total' in country:
	                        country = ''
	                    cases = ''.join(i for i in data[1].text.strip() if i.isdigit())
	                    deaths = ''.join(i for i in data[3].text.strip() if i.isdigit())

	                    if (country!='') and (cases!='') and (deaths!=''):
	                        #add data to table, adding rows if necessary
	                        if country not in cases_df['Country'].tolist():
	                            new_country_cases = ['SARS', country,0,0]
	                            new_country_deaths = ['SARS', country,0,0]
	                            count = 0
	                            while count < timedelta.days:
	                                new_country_cases.append(int(0))
	                                new_country_deaths.append(int(0))
	                                count += 1
	                            new_country_cases.append(int(cases))
	                            new_country_deaths.append(int(deaths))
	                            cases_df.loc[len(cases_df)] = new_country_cases
	                            deaths_df.loc[len(deaths_df)] = new_country_deaths
	                        else:
	                            cases_df.loc[cases_df['Country'] == country, [column]] = int(cases)
	                            deaths_df.loc[deaths_df['Country'] == country, [column]] = int(deaths)
	            else:
	                for row in rows[1:]:
	                    data = row.findAll('td')
	                    if data != []:
	                        country = data[0].text.strip()
	                        country = ''.join(i for i in country if not (i.isdigit()))
	                        country = ''.join(i for i in country if i!='^')
	                        country = ''.join(i for i in country if i!='+')
	                        country = country.strip()
	                        if 'Hong Kong' in country:
	                            country = 'Hong Kong'
	                        elif 'Taiwan' in country:
	                            country = 'Taiwan'
	                        elif 'Viet Nam' in country:
	                            country = 'Vietnam'
	                        elif 'Macao' in country:
	                            country = 'Macau'
	                        elif 'Ireland' in country:
	                            country = 'Ireland'
	                        elif 'Korea' in country:
	                            country = 'South Korea'
	                        elif 'Russia' in country:
	                            country = 'Russia'
	                        elif 'Total' in country:
	                            country = ''
	                        cases = ''.join(i for i in data[1].text.strip() if i.isdigit())
	                        deaths = ''.join(i for i in data[3].text.strip() if i.isdigit())
	                    else:
	                        country = ''
	                        cases = ''
	                        deaths = ''

	                    if (country!='') and (cases!='') and (deaths!=''):
	                        #add data to table, adding rows if necessary
	                        if country not in cases_df['Country'].tolist():
	                            new_country_cases = ['SARS', country,0,0]
	                            new_country_deaths = ['SARS', country,0,0]
	                            count = 0
	                            while count < timedelta.days:
	                                new_country_cases.append(int(0))
	                                new_country_deaths.append(int(0))
	                                count += 1
	                            new_country_cases.append(int(cases))
	                            new_country_deaths.append(int(deaths))
	                            cases_df.loc[len(cases_df)] = new_country_cases
	                            deaths_df.loc[len(deaths_df)] = new_country_deaths
	                        else:
	                            cases_df.loc[cases_df['Country'] == country, [column]] = int(cases)
	                            deaths_df.loc[deaths_df['Country'] == country, [column]] = int(deaths)


	#some countries have recorded cases, but those cases are found to not be SARS. In this case,
	#these countries won't come up again in the cumulative data, leaving empty cells. We are not
	#interested in these for our analysis, so we drop these (only the ones that never come back)
	cases_df = cases_df[cases_df['Day 116'] != '']
	#for our other missing values, we will fill them in with 0's, as they return later
	cases_df.replace('', 0, inplace=True)



	#fortunately, deaths are never mistaken to be caused by something other than SARS, so we
	#don't have to worry about that here. We instead have the issue where 0 deaths will be
	#recorded even if there are cases, so we must remove any row that finishes with 0 deaths
	deaths_df = deaths_df[deaths_df['Day 116'] != '']
	deaths_df = deaths_df[deaths_df['Day 116'] != 0]


	#we read in our coords csv to add our lat and long coordinates
	path = os.path.join('..','rawdata','coords.csv')
	coords_df = pd.read_csv(path)

	cases_df['Latitude'] = cases_df.apply(lambda row: get_coords(row)[0], axis=1)
	cases_df['Longitude'] = cases_df.apply(lambda row: get_coords(row)[1], axis=1)
	deaths_df['Latitude'] = deaths_df.apply(lambda row: get_coords(row)[0], axis=1)
	deaths_df['Longitude'] = deaths_df.apply(lambda row: get_coords(row)[1], axis=1)


	path = os.path.join('..','cleanData','SARS_cases.csv')
	cases_df.to_csv(path)
	path = os.path.join('..','cleanData','SARS_deaths.csv')
	deaths_df.to_csv(path)

def get_coords(row):
    country = row[1]
    if country in coords_df['Country'].tolist():
        lat = float(coords_df[coords_df['Country'] == country]['Latitude'])
        long = float(coords_df[coords_df['Country'] == country]['Longitude'])
        return (lat,long)
    else:
        print(country)
        return (0,0)