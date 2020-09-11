import numpy as np
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt
from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
rds_connection_string = "postgres:postgres@localhost:5432/happiness"
engine = create_engine(f'postgresql://{rds_connection_string}')
session = Session(engine)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
happiness = Base.classes.happiness

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    results = session.query(happiness.country, happiness.rank, happiness.score, happiness.economy, happiness.family, happiness.health, happiness.freedom, happiness.generosity, happiness.trust, happiness.year, happiness.lat, happiness.long).all()
    data_dict = {}
    data_list = []
    for  country, rank, score, economy, family, health, freedom, generosity, trust, year, lat, long in results:
        data_dict['Country'] = country
        data_dict['Rank'] = rank
        data_dict['Score']= score
        data_dict['Economy']= economy
        data_dict['Family']= family
        data_dict['Health']= health
        data_dict['Freedom']= freedom
        data_dict['Generosity']= generosity
        data_dict['Trust']= trust
        data_dict['Year']= year
        data_dict['Lat']= lat
        data_dict['Long']= long
        data_list.append(data_dict)
        data_dict = {}
    
    ###run this the first time only
    # with open('data.json', 'w') as f:
    #     json.dump(data_list, f)
    
    return("Please check the file system now")

@app.route("/website")
def website():
    return render_template("index.html")
    
@app.route("/api/v1.0/happiest_countries/<year>")
def most_happy(year):
    results = session.query(happiness.rank, happiness.country, happiness.score).filter(happiness.year == year).all()

    # Create a dictionary from the row data and append to a list of all_countries
    all_countries = []
    for rank, country, score in results:
        country_dict = {}
        country_dict["rank"] = rank
        country_dict["country"] = country
        country_dict["score"] = score
        all_countries.append(country_dict)

    return jsonify(all_countries)

@app.route("/api/v1.0/rank/<rank>")
def one_rank(rank):

   results = session.query(happiness.rank, happiness.country, happiness.score, happiness.year).filter(happiness.rank == rank).all()
   country_list = list(results)
   return jsonify(country_list)
   
@app.route("/api/v1.0/country/<country>")
def one_country(country):
   
   capitalized = country.capitalize()
   results = session.query(happiness.rank, happiness.country, happiness.score, happiness.year).filter(happiness.country == capitalized).all()
   #country_list = list(results) 
   return jsonify(results)
   #render_template("index.html", country=results)
   
if __name__ == '__main__':
    app.run(debug=True)


# CODE TO USE LATER
# trip_data = session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
#        filter(Measurement.date >= country).filter(Measurement.date <= end).filter(Measurement.station == 'USC00519281').all()

