
import flask
from app.app import app
import datetime


@app.route("/")
def index():

    currentYear = datetime.datetime.now().year

    return flask.render_template("index.html", currentYear=currentYear)


@app.route("/about")
def about():

    currentYear = datetime.datetime.now().year

    return flask.render_template("about.html", currentYear=currentYear, active_page='about')


@app.route("/projects")
def projects():

    currentYear = datetime.datetime.now().year

    return flask.render_template("projects.html", currentYear=currentYear, active_page='projects')

@app.route("/contact")
def contact():

    currentYear = datetime.datetime.now().year

    return flask.render_template("contact.html", currentYear=currentYear, active_page='contact')
