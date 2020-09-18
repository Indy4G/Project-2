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
rds_connection_string = "postgres:Indy4G#12@localhost:5432/happiness"
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

@app.route("/data")
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
    
    return jsonify(data_list)

@app.route("/")
def website():
    return render_template("index.html")
   
if __name__ == '__main__':
    app.run(debug=True)
