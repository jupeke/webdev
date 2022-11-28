# cd C:\Users\kerkkaju\Documents\GitHub\webdev\webpy\mynotes_v2
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
    '/details','Details',
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
session = web.session.Session(
    myapp, store, initializer={"logged_in": False, "is_admin": False})

# 'Constants' for Permission values in the db.
ADMIN_USER = 10
BASIC_USER = 1

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
        if session.logged_in: 
            user = session.username
        else:
            user = "none"
        return render.home(user, session.is_admin, notes, message)  
    
    def POST(self):
        raise web.seeother('/') 
            
class Newnote:
    def GET(self):
        if session.logged_in:
            return render.note_new()
        else:
            raise web.seeother('/forbidden')
    def POST(self):
        if session.logged_in:
            i = web.input()
            n=db.insert('notes', content=i.content)
            raise web.seeother('/')
        else:
            raise web.seeother('/forbidden')

class Edit:
    def GET(self):
        if session.logged_in:
            i = web.input()
            note_id = i.note_id
            myvar = dict(id=note_id)    # To prevent SQL injection attacks.
            notes = db.select('notes', vars=myvar, where="id=$id")
            return render.note_edit(notes[0])
        else:
            raise web.seeother('/forbidden')
    def POST(self):
        if session.logged_in:
            i = web.input()
            note_id = i.note_id
            cont = i.content
            myvar = dict(id=note_id)    
            n=db.update('notes', vars=myvar, where="id=$id", content=cont)
            raise web.seeother('/')
        else:
            raise web.seeother('/forbidden')

class Confirm_delete:
    def GET(self):
        if session.logged_in:
            i = web.input()
            note_id = i.note_id
            myvar = dict(id=note_id)
            notes = db.select('notes', vars=myvar, where="id=$id")
            return render.confirm_delete(notes[0])
        else:
            raise web.seeother('/forbidden')
    def POST(self):
        if session.logged_in:   # False also if session killed.
            i = web.input()
            note_id = i.note_id
            myvar = dict(id=note_id)
            db.delete('notes', vars=myvar, where="id=$id")
            raise web.seeother('/')
        else:
            raise web.seeother('/forbidden')
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
            if matches[0].permission == ADMIN_USER:
                session.is_admin = True
            session.user_id = matches[0].id
        return success

class Logout:
    def GET(self):
        n = session.username
        session.logged_in = False # Not really needed
        session.kill()
        return render.logout("See you again, {}!".format(n))

class Signup:
    def GET(self):
        return render.signup(session.is_admin)
    def POST(self):
        i = web.input()
        id=db.insert('users', name=i.name, username=i.uname, \
            password=i.pword, permission=i.permission)
        raise web.seeother('/login?message=New user "{}" created'.format(i.name))

class Details:
    def GET(self):
        if session.logged_in:
            i = web.input()
            user_id = i.user_id
            myvar = dict(id=user_id)    # To prevent SQL injection attacks.
            users = db.select('users', vars=myvar, where="id=$id")
            return render.note_edit(session.in_admin, users[0])
        else:
            raise web.seeother('/forbidden')
    def POST(self):
        if session.logged_in:
            i = web.input()
            user_id = i.user_id
            myvar = dict(id=user_id) 
            myname = i.name
            uname = i.username
            pword = i.password  
            n=db.update('users', vars=myvar, where="id=$id", \
                name=myname, username=uname, password=pword)
            raise web.seeother('/?message=Person details changed successfully!')
        else:
            raise web.seeother('/forbidden')

class Forbidden:
    def GET(self):
        return render.forbidden()        

if __name__ == "__main__":
    myapp.run() 

class User:
    def __init__(self, id, username):
        self.id = id
        self.username = username