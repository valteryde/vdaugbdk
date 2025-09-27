import flask
from app.app import app
import datetime
import json
from ..helper import path as apath


def case(path=None):

    with open(apath("cases", "{}.json".format(path)), 'r') as f:
        project = json.load(f)

    return flask.render_template("site/case.html", 
        project=project, 
        year=datetime.datetime.now().year
    )

@app.route("/case/apidfds")
def case_apidfds():
    return case("apidfds")


@app.route('/about')
def case_about():
    return case("about")