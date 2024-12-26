from extensions import db
class Options(db.Model):
    __tablename__ = 'options'

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    options = db.Column(db.String(150))
    


def _repr_(self):
        return f'<Questions {self.QuestionId}>'