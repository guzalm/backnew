import psycopg2

# Connect to database
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    database="mynewdb",
    user="postgres",
    password="rayana2015",
)
