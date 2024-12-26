from extensions import db
class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    question = db.Column(db.String(150))
    correct_ans = db.Column(db.Integer)
    description = db.Column(db.String(300))


def _repr_(self):
        return f'<Questions {self.QuestionId}>'