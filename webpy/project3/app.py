import web
render = web.template.render('templates/')
urls = (
    '/', 'Login',
    '/success','Success',
    '/failure','Failure',
)
class Login:
    def GET(self):
        return render.login()   # home is the template name
    def POST(self):
        user_input = web.input()
        uname = user_input.uname
        pword = user_input.pword
        content = "Username = "+uname+" and password = "+pword
        if(check(uname,pword)):

            # Redirect to the success page. Note that you
            # can add "?.." here even if not defined in the urls!
            raise web.seeother("/success?content="+content)   
        else:
            raise web.seeother("/failure?content="+content)   

class Failure:
    def GET(self):
        i = web.input(content=None)
        return render.failure(i.content)
class Success:
    def GET(self):
        i = web.input(content=None)
        return render.success(i.content)

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 

def check(uname, pword):
    if(uname == "jp" and pword == "salane"):
        return True
    else:
        return False