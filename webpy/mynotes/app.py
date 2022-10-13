from random import randint
import web
render = web.template.render('templates/')
urls = (
    '/', 'Home',
    '/confirm_delete', 'Confirm_delete',
    '/new','Newnote',
    '/edit', 'Edit',
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
        if todo == "save_new":
            raise web.seeother('/') 
        elif todo == "delete":
            note_id = i.note_id
            raise web.seeother('/confirm_delete?note_id='+note_id)
        elif todo == "update":
            note_id = i.note_id
            raise web.seeother('/edit?note_id='+note_id)
        elif todo == "show":    # Default
            raise web.seeother('/') 
            
class Newnote:
    def GET(self):
        return render.note_new()
    def POST(self):
        i = web.input()
        n=db.insert('notes', content=i.content)
        raise web.seeother('/')

class Edit:
    def GET(self):
        i = web.input()
        note_id = i.note_id
        myvar = dict(id=note_id)    # To prevent SQL injection attacks.
        notes = db.select('notes', vars=myvar, where="id=$id")
        return render.note_edit(notes[0])
    def POST(self):
        i = web.input()
        note_id = i.note_id
        cont = i.content
        myvar = dict(id=note_id)    
        n=db.update('notes', vars=myvar, where="id=$id", content=cont)
        raise web.seeother('/')

class Confirm_delete:
    def GET(self):
        i = web.input()
        note_id = i.note_id
        myvar = dict(id=note_id)
        notes = db.select('notes', vars=myvar, where="id=$id")
        return render.confirm_delete(notes[0])
    def POST(self):
        i = web.input()
        note_id = i.note_id
        myvar = dict(id=note_id)
        db.delete('notes', vars=myvar, where="id=$id")
        raise web.seeother('/')

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 