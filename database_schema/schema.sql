drop table if exists happiness;

CREATE TABLE happiness (
country	VARCHAR(50),
rank INT,
score FLOAT,
economy FLOAT,
family FLOAT,
health FLOAT,
freedom	FLOAT,
generosity FLOAT,
trust FLOAT,
year INT,
lat	FLOAT,
long FLOAT,
PRIMARY KEY(country, year)
	);