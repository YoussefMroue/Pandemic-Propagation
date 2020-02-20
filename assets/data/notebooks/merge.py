import os
import pandas as pd

def merge():

	covid19_cases = pd.read_csv(os.path.join('..','cleanData','FinalCoronavirusConfCases.csv'), index_col=0)
	covid19_deaths = pd.read_csv(os.path.join('..','cleanData','FinalCoronavirusDeathCases.csv'), index_col=0)
	SARS_cases = pd.read_csv(os.path.join('..','cleanData','SARS_cases.csv'), index_col=0)
	SARS_deaths = pd.read_csv(os.path.join('..','cleanData','SARS_deaths.csv'), index_col=0)
	H1N1_cases = pd.read_csv(os.path.join('..','cleanData','H1N1_cases.csv'), index_col=0)
	H1N1_deaths = pd.read_csv(os.path.join('..','cleanData','H1N1_deaths.csv'), index_col=0)

	cases_df = pd.concat([covid19_cases, SARS_cases, H1N1_cases], sort=False)
	deaths_df = pd.concat([covid19_deaths, SARS_deaths, H1N1_deaths], sort=False)

	cases_df.to_csv(os.path.join('..','finalData','cases.csv'))
	deaths_df.to_csv(os.path.join('..','finalData','deaths.csv'))