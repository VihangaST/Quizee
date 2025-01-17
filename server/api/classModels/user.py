from extensions import db
class Users(db.Model):
    __tablename__ = 'login_user'

    PhoneNumber = db.Column(db.String(10), primary_key=True)
    Points = db.Column(db.Integer,nullable=False, default=0)
    

def _repr_(self):
        return f'<LoginUser {self.PhoneNumber}>'