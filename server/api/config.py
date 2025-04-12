from urllib.parse import quote_plus
import os
from dotenv import load_dotenv
# Load environment variables
load_dotenv()
class Config:
    # password = quote_plus('VSt@99')
    
    # SQLALCHEMY_DATABASE_URI = f'mysql+mysqlconnector://root:{password}@localhost/quizee'
    # SQLALCHEMY_TRACK_MODIFICATIONS = False
    # BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    # PRIVATE_KEY_PATH = os.path.join(BASE_DIR, 'authentication', 'private_key.pem')
    # PUBLIC_KEY_PATH = os.path.join(BASE_DIR, 'authentication', 'public_key.pem')
    db_user = os.getenv("DB_USERNAME")
    db_password = quote_plus(os.getenv("DB_PASSWORD"))
    db_name = os.getenv("DB_NAME")

    SQLALCHEMY_DATABASE_URI = f'mysql+mysqlconnector://{db_user}:{db_password}@localhost/{db_name}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    PRIVATE_KEY_PATH = os.path.join(BASE_DIR, os.getenv("PRIVATE_KEY_PATH"))
    PUBLIC_KEY_PATH = os.path.join(BASE_DIR, os.getenv("PUBLIC_KEY_PATH"))