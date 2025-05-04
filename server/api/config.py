from urllib.parse import quote_plus
import os
from dotenv import load_dotenv
# Load environment variables
load_dotenv()
class Config:
    db_user = os.getenv("DB_USERNAME")
    db_password = quote_plus(os.getenv("DB_PASSWORD"))
    db_name = os.getenv("DB_NAME")
    SECRET_KEY = os.getenv("SECRET_KEY")
    

    SQLALCHEMY_DATABASE_URI = f'mysql+mysqlconnector://{db_user}:{db_password}@localhost/{db_name}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
    # PRIVATE_KEY_PATH = os.path.join(BASE_DIR, os.getenv("PRIVATE_KEY_PATH"))
    # PUBLIC_KEY_PATH = os.path.join(BASE_DIR, os.getenv("PUBLIC_KEY_PATH"))
