
from app.views import *
from app.app import app
import flask_monitoringdashboard as dashboard

dashboard.bind(app)

@app.errorhandler(404)
def page_not_found(e):
    return flask.render_template("site/errors/404.html"), 404

@app.errorhandler(500)
def internal_server_error(e):
    return flask.render_template("site/errors/500.html"), 500

if __name__ == "__main__":
    app.run(debug=True)

