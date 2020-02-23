


import pandas as pd
import os
from datetime import date
from geopy.geocoders import Nominatim
nom=Nominatim()

# Import API key
#from api_keys import api_key


# #### Set the path to your file


def corono_case():

    confirmed_Cases = os.path.join("..","rawData","2019-nco-Confirmed.csv")


    # #### Read csv file



    df_confCases = pd.read_csv(confirmed_Cases)
    df_confCases.head()


    # #### Check for number of columns and rows



    df_confCases.shape


    # #### Inspecting Dates and Columns



    df_confCases.columns


    # #### Identify columns with NaN and amount



    df_confCases.isnull().any()


    # #### Replace NaN with 0



    df_confCases.fillna(0, inplace = True)


    # #### Rename Country Column



    df_confCases= df_confCases.rename(columns={"Country/Region": "Country"})
    df_confCases


    # #### Select only Country, Lat, Long and Dates Columns



    country_confirm_cases = df_confCases.iloc[:,1:48]
    country_confirm_cases


    # #### Select only Dates


    df_confCas = df_confCases.iloc[:,4:48]



    df_confCas.columns= pd.to_datetime(df_confCas.columns).date
    type(df_confCas.columns)
    df_confCas.shape


    # #### Assign a variable to the Country information columns



    countryInfoColumns = pd.DataFrame(country_confirm_cases.iloc[:,0:3])
    countryInfoColumns.shape


    # #### Merge country infor columns with date columns


    merged_conf_cases = pd.concat([countryInfoColumns, df_confCas], axis=1)
    merged_conf_cases


    # #### Assign a variable just by columns to group by dates



    merged_columns = merged_conf_cases.columns
    merged_columns


    # #### Group Data by Date



    confCasesDate = merged_conf_cases.groupby([merged_columns], axis=1).sum()
    cols = confCasesDate.columns
    cols [-3:].tolist()



    cols = cols[-3:].tolist() + cols[:-3].tolist()
    cols


    # #### Re-arrange Columns


    organized_confCasesDate = confCasesDate[cols]
    organized_confCasesDate.head()


    # #### Assign a variable with the list of dates


    date_list = organized_confCasesDate.columns[3:]


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



    organized_confCasesDate.rename(columns=dict(zip(organized_confCasesDate.columns[3:], date)),inplace=True)
    organized_confCasesDate


    # #### Select only Columns with Country and Dates


    noCoordinatesData = organized_confCasesDate.drop(columns=['Lat', 'Long'])


    # #### Group Data by Country



    countryconfCases = noCoordinatesData.groupby(['Country']).sum().reset_index()
    countryconfCases


    # #### Select only Country Columns


    countryconfCases.columns



    countryList = countryconfCases['Country'].tolist()



    countries = pd.DataFrame({'Country':countryList})
    countries


    # #### Generate Countries Lat and Long



    countries["Country"]= countries["Country"].apply(nom.geocode)
    countries["Latitude"]= countries["Country"].apply(lambda x: x.latitude if x != None else None)
    countries["Longitude"]= countries["Country"].apply(lambda x: x.longitude if x != None else None)


    # #### Concanate Country, Lat, Long, and the Dates


    data0 = pd.DataFrame({'Country':countryList})
    data1 = countries.iloc[:,1:3]
    data2= countryconfCases.iloc[:,1:27]


    # #### Clean and Final Data



    CoronavirusConfCases= pd.concat([data0, data1, data2], axis=1)
    CoronavirusConfCases


    # #### Export Pandas DataFrame to a CSV File



    CoronavirusConfCases.at[12, 'Country'] = 'China'
    CoronavirusConfCases.at[25, 'Country'] = 'United States'
    CoronavirusConfCases.at[26, 'Country'] = 'United Kingdom'
    CoronavirusConfCases['Virus'] = "Coronavirus"
    
    path = os.path.join("..","cleanData","FinalCoronavirusConfCases.csv")
    CoronavirusConfCases.to_csv(path)
