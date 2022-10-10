from random import randint
import web
render = web.template.render('templates/')
urls = (
    '/', 'Home',
    '/confirm_delete', 'Confirm_delete',
)

# Connect to db:
db = web.database(
    dbn='mysql',
    host='127.0.0.1',
    port=3306,
    user='root',
    pw='',
    db='db_mynotes',
)

class Home:
    def GET(self):
        notes = db.select('notes')
        return render.home(notes)   # the template name
    
    def POST(self):
        i = web.input()
        n = db.insert('notes', content=i.note)
        raise web.seeother('/')

class Confirm_delete:
    def GET(self):
        i = web.input()
        note_id = i.note_id
        note = db.select('notes', where="id=$note_id")
        return render.confirm_delete(note)



if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 