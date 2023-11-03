from dotenv import load_dotenv
load_dotenv()
import psycopg2
import os
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_PORT = os.getenv("DATABASE_PORT")
DATABASE_NAME = os.getenv("DATABASE_NAME")
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
conn = psycopg2.connect(
            host=os.environ['DATABASE_HOST'],
            database=os.environ['DATABASE_NAME'],
            user=os.environ['DATABASE_USER'],
            password=os.environ['DATABASE_PASSWORD'])

cur = conn.cursor() 
cur.execute("CREATE TABLE if not exists Signup(userid VARCHAR(50) PRIMARY KEY, firstname VARCHAR(50),lastname VARCHAR(50),email VARCHAR(50),mobilenumber BIGINT NOT NULL,gender VARCHAR(10),marital_status VARCHAR(10),age INT,occupation VARCHAR(25),country VARCHAR(20),state VARCHAR(25),city VARCHAR(15),zipcode INT);")
cur.execute("CREATE TABLE if not exists Login(UserID  VARCHAR(50) PRIMARY KEY ,Password VARCHAR(25),FirstTime BOOLEAN);")
conn.commit()