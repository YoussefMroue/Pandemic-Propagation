
import os
import pandas as pd
import numpy as np
import operator
import datetime as dt



def h1n1():

    h1file = os.path.join('..','rawData',"H1N1-Data.csv")
    rawh1 = pd.read_csv(h1file,header= 0,encoding= 'ISO-8859-1')

    cases_df = pd.DataFrame({'Virus': [], 'Country': [], 'Latitude': [], 'Longitude': []})
    deaths_df = pd.DataFrame({'Virus': [], 'Country': [], 'Latitude': [], 'Longitude': []})
    base_date = dt.date(2009, 5, 23)
    last_day = -1



    rawh1case = rawh1
    rawh1case = rawh1case.reindex(index = rawh1case.index[::-1])
    rawh1case = rawh1case.reset_index(drop = True)
    rawh1case



    for index, row in rawh1case.iterrows():
        country = row['Country']
        cases = row['Cases']
        deaths = row['Deaths']
        update_time = row['Update Time']
        
        timedelta = (dt.datetime.strptime(update_time, '%m/%d/%Y %H:%M').date()-base_date).days
        column = 'Day ' + str(timedelta)
        days_passed = timedelta - last_day
        if days_passed > 0:
            while days_passed > 1:
                cases_df['Day ' + str(timedelta - days_passed + 1)] = cases_df['Day ' + str(last_day)]
                deaths_df['Day ' + str(timedelta - days_passed + 1)] = deaths_df['Day ' + str(last_day)]
                days_passed = days_passed - 1
            cases_df[column] = ''
            deaths_df[column] = ''
        #we must do a large amount of renaming in order to match the rest of our data
        if '    ' in country:
            country = ''
        if 'Grand Total' in country:
            country = ''
        if 'United States' in country:
            country = 'United States'
        if 'Korea' in country:
            country = 'South Korea'
        if 'Iran' in country:
            country = 'Iran'
        if 'Viet Nam' in country:
            country = 'Vietnam'
        if 'Gaza Strip' in country:
            country = 'Gaza Strip'
        if 'Jersey' in country:
            country = 'Jersey'
        if 'Guadaloupe' in country:
            country = 'Guadeloupe'
        if 'Isle of Man' in country:
            country = 'Isle of Man'
        if 'Netherlands Antilles' in country:
            country = 'Netherlands Antilles'
        if 'Saint Martin' in country:
            country = 'Netherlands Antilles'
        if 'Brunei' in country:
            country = 'Brunei'
        if 'Bosnia' in country:
            country = 'Bosnia and Herzegovina'
        if "Cote d'Ivoire" in country:
            country = "Côte d'Ivoire"
        if 'Cap Verde' in country:
            country = 'Cape Verde'
        if 'Guernsey' in country:
            country = 'Guernsey'
        if 'Aruba' in country:
            country = 'Aruba'
        if 'Myanmar' in country:
            country = 'Myanmar [Burma]'
        if 'Macedonia' in country:
            country = 'Macedonia [FYROM]'
        if 'Virgin' in country:
            #we use the U.S. Virgin Islands as geographically they are in the center
            country = 'U.S. Virgin Islands'
        if 'Cook' in country:
            country = 'Cook Islands'
        if 'FOC' in country:
            country = country[:-5]
        if 'UKOT' in country:
            country = country[:-6]
        country = ''.join(i for i in country if i!='*')
        country = country.strip()
        
        
        last_day = timedelta
        if (country!='') and (cases!='') and (deaths!=''):
            #add data to table, adding rows if necessary
                if country not in cases_df['Country'].tolist():
                    new_country_cases = ['H1N1', country,0,0]
                    new_country_deaths = ['H1N1', country,0,0]
                    count = 0
                    while count < timedelta:
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


    cases_df = cases_df[cases_df['Day 44'] != '']




    #fortunately, deaths are never mistaken to be caused by something other than H1N1, so we
    #don't have to worry about that here. We instead have the issue where 0 deaths will be
    #recorded even if there are cases, so we must remove any row that finishes with 0 deaths
    deaths_df = deaths_df[deaths_df['Day 44'] != '']
    deaths_df = deaths_df[deaths_df['Day 44'] != 0]





    #we read in our coords csv to add our lat and long coordinates
    path = os.path.join('..','rawdata','coords.csv')
    coords_df = pd.read_csv(path)




    def get_coords(row):
        country = row[1]
        if country in coords_df['Country'].tolist():
            lat = float(coords_df[coords_df['Country'] == country]['Latitude'])
            long = float(coords_df[coords_df['Country'] == country]['Longitude'])
            return (lat,long)
        else:
            print(country)
            return (0,0)




    cases_df['Latitude'] = cases_df.apply(lambda row: get_coords(row)[0], axis=1)
    cases_df['Longitude'] = cases_df.apply(lambda row: get_coords(row)[1], axis=1)
    deaths_df['Latitude'] = deaths_df.apply(lambda row: get_coords(row)[0], axis=1)
    deaths_df['Longitude'] = deaths_df.apply(lambda row: get_coords(row)[1], axis=1)




    path = os.path.join('..','cleanData','H1N1_cases.csv')
    cases_df.to_csv(path)
    path = os.path.join('..','cleanData','H1N1_deaths.csv')
    deaths_df.to_csv(path)





