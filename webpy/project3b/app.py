import web
render = web.template.render('templates/')
urls = (
    '/', 'Login',
)
class Login:
    def GET(self):
        login_ok = False
        content = ""
        return render.login(content,login_ok)   # home is the template name
    def POST(self):
        user_input = web.input()
        uname = user_input.uname
        pword = user_input.pword
        content = "Username = "+uname+" and password = "+pword
        if(check(uname,pword)):
            login_ok = True
            return render.login(content,login_ok)
        else:
            login_ok = False
            return render.login(content,login_ok)
             

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 

def check(uname, pword):
    if(uname == "jp" and pword == "salane"):
        return True
    else:
        return False