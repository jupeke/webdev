from random import randint
import web
render = web.template.render('templates/')
urls = (
    '/', 'Home',
)

# Connect to db:
db = web.database(
    dbn='mysql',
    host='127.0.0.1',
    port=8080,
    user='root',
    pw='',
    db='db_mynotes',
)

class Home:
    def GET(self):
        notes = db.select('notes')
        return render.home(notes)   # the template name

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 