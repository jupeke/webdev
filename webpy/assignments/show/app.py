# cd C:\Users\kerkkaju\Documents\GitHub\webdev\webpy\assignments\show
from random import randint
import web
render = web.template.render('templates/')
urls = (
    '/', 'Home',
    '/new','Newnote',
    '/edit','Edit'
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
        i = web.input(todo="show")
        todo = i.todo
        # etc ...
            
class Newnote:
    def GET(self):
        return render.note_new()
    def POST(self):
        i = web.input()
        mycontent = i.content
        n = db.insert('notes',content=mycontent)
        raise web.seeother('/')

class Edit:
    def GET(self):
        i = web.input()
        note_id = i.note_id
        myvar = dict(id=note_id)
        notes = db.select('notes',vars=myvar,where="id=$id")
        return render.note_edit(notes[0])
    def POST(self):
        i = web.input()
        note_id = i.note_id
        cont = i.content
        myvar = dict(id=note_id)
        notes = db.update('notes',vars=myvar,where="id=$id",content=cont)
        raise web.seeother('/')

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 