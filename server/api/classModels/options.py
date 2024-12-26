from extensions import db
class Options(db.Model):
    # class
    __tablename__ = 'options'

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    question_id = db.Column(db.Integer)
    option = db.Column(db.String(150))
    


def _repr_(self):
        return f'<Questions {self.QuestionId}>'