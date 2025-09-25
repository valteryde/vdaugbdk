import flask
from app.app import app
import datetime
import json


@app.route("/apidfds")
@app.route("/apidfds/<path:path>")
def case(path=None):

    with open('server/app/cases/apidfds.json', 'r') as f:
        project = json.load(f)

    return flask.render_template("case/apidfds.html", 
        project=project, 
        year=datetime.datetime.now().year
    )
