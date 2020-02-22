#!/usr/bin/env python
# coding: utf-8

# # 2019 Coronavirus Death Cases Time Series Data

# #### Import Dependencies
def corona_death():


    import pandas as pd
    import os
    from datetime import date
    from geopy.geocoders import Nominatim
    nom=Nominatim()

    # Import API key
    #from api_keys import api_key


    # #### Set the path to your file



    death_Cases = os.path.join("..","rawData","2019-ncov-Deaths.csv")


    # #### Read csv file


    df_deathCases = pd.read_csv(death_Cases)
    df_deathCases.head()


    # #### Check for number of columns and rows



    df_deathCases.shape


    # #### Identify columns with NaN and amount




    df_deathCases.isnull().any()


    # #### Replace NaN with 0




    df_deathCases.fillna(0, inplace = True)
    df_deathCases


    # #### Rename Country Column


    df_deathCases= df_deathCases.rename(columns={"Country/Region": "Country"})
    df_deathCases


    # #### Select only Country, Lat, Long and Dates Columns


    country_deathCases = df_deathCases.iloc[:,1:48]
    country_deathCases


    # #### Select only Dates



    df_deathCas = country_deathCases.iloc[:,4:48]
    df_deathCas



    df_deathCas.columns= pd.to_datetime(df_deathCas.columns).date
    type(df_deathCas.columns)
    df_deathCas.shape


    # #### Assign a variable to the Country information columns



    countryInfoColumns = pd.DataFrame(country_deathCases.iloc[:,0:3])
    countryInfoColumns.shape


    # #### Merge country infor columns with date columns



    merged_death_cases = pd.concat([countryInfoColumns, df_deathCas], axis=1)
    merged_death_cases


    # #### Assign a variable just by columns to group by dates



    merged_columns = merged_death_cases.columns
    merged_columns


    # #### Group Data by Date



    deathCasesDate = merged_death_cases.groupby([merged_columns], axis=1).sum()
    cols = deathCasesDate.columns
    cols [-3:].tolist()



    cols = cols[-3:].tolist() + cols[:-3].tolist()
    cols





    organized_deathCasesDate = deathCasesDate[cols]
    organized_deathCasesDate.head()


    # #### Assign a variable with the list of dates



    date_list = organized_deathCasesDate.columns[3:]


    # #### Set variable with the list for 1st date


    base_date = date_list[0]
    base_date


    # #### Iterate through the date list and to create a list with the new name of the columns


    date = []

    for d in date_list:
        day =(d-base_date).days
        date.append(f"Day {day}")
    print(date)


    # #### Rename Date Columns from Day 0 to Day 23



    organized_deathCasesDate.rename(columns=dict(zip(organized_deathCasesDate.columns[3:], date)),inplace=True)
    organized_deathCasesDate


    # #### Select only Columns with Country and Dates



    noCoordinatesData = organized_deathCasesDate.drop(columns=['Lat', 'Long'])
    noCoordinatesData


    # #### Group Data by Country



    countrydeathCases = noCoordinatesData.groupby(['Country']).sum().reset_index()
    countrydeathCases.shape


    # #### Select only Country Columns



    countrydeathCases.columns



    countryList = countrydeathCases['Country'].tolist()



    countries = pd.DataFrame({'Country':countryList})
    countries


    # #### Generate Countries Lat and Long



    countries["Country"]= countries["Country"].apply(nom.geocode)
    countries["Latitude"]= countries["Country"].apply(lambda x: x.latitude if x != None else None)
    countries["Longitude"]= countries["Country"].apply(lambda x: x.longitude if x != None else None)


    # #### Concanate Country, Lat, Long, and the Dates



    data0 = pd.DataFrame({'Country':countryList})
    data1 = countries.iloc[:,1:3]
    data2= countrydeathCases.iloc[:,1:24]


    # #### Clean and Final Data



    CoronavirusDeathCases= pd.concat([data0, data1, data2], axis=1)
    CoronavirusDeathCases


    # #### Export Pandas DataFrame to a CSV File


    CoronavirusDeathCases.at[12, 'Country'] = 'China'
    CoronavirusDeathCases.at[25, 'Country'] = 'United States'
    CoronavirusDeathCases.at[26, 'Country'] = 'United Kingdom'
    path = os.path.join("..","cleanData","FinalCoronavirusDeathCases.csv")
    CoronavirusDeathCases.to_csv(path)
