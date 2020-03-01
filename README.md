# Pandemic-Propagation
By Youssef Mroue, Vaishall Pradeepkumar, Eliana Suarez, and Xiaodi Lin

##### Introduction
  For this project we chose to analyze the spread of the newly rampant **Coronavirus**. To do this properly we also decided to compare it to similar pandemics in the past. We chose **H1N1** (Swine Flu in 2009) and **SARS** (Severe Acute Respiratory Syndrome in 2003)

Data sources Used:

[John Hopkins University Corona Virus Data](https://github.com/CSSEGISandData/COVID-19/)  
[H1N1 Data by World Health Organization](https://www.kaggle.com/de5d5fe61fcaa6ad7a66/pandemic-2009-h1n1-swine-flu-influenza-a-dataset)  
[SARS Data by World Health Organization](https://www.who.int/csr/sars/country/table/en/)

##### Navigation
assets folder will be the rawdata csv files, datacleaning and python scripts.  
app.py launches the flask app linked to the mongodb written in python.  
/templates folder contains index.html  
static folder contains all web development files such as the images, javascript scripts and css styling.

##### Webpage
  As you open the webpage it starts off with a choropleth map in the middle with a number of cases and a number of deaths counter depending on the selection/combination of viruses chosen from the 3 buttons at the top of the page. To the left and right of the map you will find a line graph of both the number of confirmed cases and deaths versus time respectively.  

  After choosing a virus the bottom half of the webpage develops with a comparison bar chart to the left. A globe showing the sequence of infecting countries with a quick number displayed and a bubble chart to the right showing the distribution by continent if one virus is selected or distribution by virus if more than one virus is selected. Found above the bubble chart is a toggle to switch between both Confirmed Cases and Deaths.  

  Both the map and the bubble chart values depend on the time slider found in the middle of the page under the map. Moving left to right to increase or decrease the number of days since the viruses breakout. All viruses were normalized by day 0 being the start date in order to compare the viruses spread and number of deaths since day 0.  
  
##### Division of Work
Youssef: H1N1 Cleaning, Flask, Bubble JS  
Vaishall: SARS Cleaning, Flask, Choropleth, Globe, Control.js and bar chart  
Eliana: Corona Cleaning, HTML and styling, both Line charts  
Xiaodi: Flask, styling, presentation  


#####
Tools Used:  
Python (pandas, Beautiful Soup, Flask, Pymongo), MongoDB, HTML, CSS, Javascript (Plotly, D3, Leaflet, TopoJSON, Highcharts)
