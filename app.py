from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import simplejson as json


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

if __name__ == '__main__':
    app.run()


class Contato(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String)
    empresa = db.Column(db.String)
    telefone = db.Column(db.String)
    email = db.Column(db.String)

    def __init__(self, nome, empresa, telefone, email):
        self.nome = nome
        self.empresa = empresa
        self.telefone = telefone
        self.email = email

    def as_dict(self):
        return {
            "id": str(self.id),
            "nome": str(self.nome),
            "empresa": str(self.empresa),
            "telefone": str(self.telefone),
            "email": str(self.email)
        }


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/contato", methods=["POST"])
def novoContato():
    contato = Contato(
        request.form["nome"],
        request.form["empresa"],
        request.form["telefone"],
        request.form["email"]
    )
    db.session.add(contato)
    db.session.commit()
    return 'HTTP/1.1', 201


@app.route("/contato", methods=["GET"])
def todosContatos():
    contato = Contato.query.all()
    contatos = []

    for i in contato:
        contatos.append(i.as_dict())

    return json.dumps(contatos)


@app.route("/contato/<string:params>", methods=["GET"])
def busca(params):
    contato = Contato.query.filter_by(nome = params).first()

    return jsonify(contato.as_dict())


@app.route("/contato/<int:id>", methods=["DELETE"])
def deletarContatos(id):
    contato = Contato.query.get(id)
    db.session.delete(contato)
    db.session.commit()

    return jsonify({'result': True})


@app.route("/contato/<int:id>", methods=["PUT"])
def editarContato(id):
    contato = Contato.query.get(id)
    
    return jsonify(contato.as_dict())


