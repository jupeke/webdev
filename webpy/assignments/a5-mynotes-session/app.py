# cd C:\Users\kerkkaju\Documents\GitHub\webdev\webpy\assignments\a5-mynotes-session

from random import randint
import web
render = web.template.render('templates/')
web.config.debug = False # To make sessions work
urls = (
    '/', 'Home',
    '/confirm_delete', 'Confirm_delete',
    '/new','Newnote',
    '/edit', 'Edit',
    '/login','Login',
    '/logout','Logout',
    '/signup', 'Signup',
    '/forbidden','Forbidden',
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

myapp = web.application(urls, globals())

# Session:
store = web.session.DBStore(db, 'sessions')
session = web.session.Session(myapp, store, initializer={"logged_in": False})

# Configuration:
web.config.session_parameters['cookie_name'] = 'webpy_session_id'
web.config.session_parameters['cookie_domain'] = None
web.config.session_parameters['cookie_path'] = None
web.config.session_parameters['timeout'] = 3600  # in seconds
web.config.session_parameters['ignore_expiry'] = False
web.config.session_parameters['ignore_change_ip'] = True
web.config.session_parameters['secret_key'] = 'fLjUfxqXtfNoIlPiip'
web.config.session_parameters['expired_message'] = 'Session expired'

class Home:
    def GET(self):
        notes = db.select('notes')
        i = web.input(message="")
        message = i.message
        if session.get('logged_in', False):
            user = session.username
        else:
            user = "none"
        return render.home(user, notes, message)   # the template name
    
    def POST(self):
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
        
class Login:
    def GET(self):
        i = web.input(message="")
        message = i.message
        return render.login(message)
    def POST(self):
        i = web.input()
        if self.login_ok(i.uname, i.pword):
            session.logged_in = True
            session.username = i.uname
            raise web.seeother('/?message=Welcome {}!'.format(session.username))
        else:
            session.logged_in = False
            return render.login('Bad username or password. Please retry!')
        
    def login_ok(self, uname, pword):
        success = False
        myvar = dict(un=uname,pw=pword)
        matches = db.query(
            "SELECT * FROM users WHERE username=$un AND password=$pw", 
            vars=myvar)
        if len(matches) > 0:
            success = True
        return success

class Logout:
    def GET(self):
        n = session.username
        session.logged_in = False # Not really needed but logical
        session.kill()
        return render.logout("See you again, {}!".format(n))

class Signup:
    def GET(self):
        return render.signup()
    def POST(self):
        i = web.input()
        id=db.insert('users', name=i.name, username=i.uname, \
            password=i.pword, permission=i.permission)
        raise web.seeother('/login?message=New user "{}" created'.format(i.name))

class Forbidden:
    def GET(self):
        return render.forbidden()        

if __name__ == "__main__":
    myapp.run() 