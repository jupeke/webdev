from random import randint
import web
render = web.template.render('templates/')
urls = (
    '/', 'Home',
    '/success','Success',
    '/failure','Failure',
)
class Login:
    def GET(self):
        n1 = randint(10)
        n2 = randint(10)
        return render.home()   # the template name
    def POST(self):
        i = web.input()
        answer = i.answer
        n1 = i.number1
        n2 = i.number2
        if n1 * n2 == answer:
            fback = "Correct! "+n1+" times "+n2+" = "+answer
            raise web.seeother("/success?feedback="+fback) 
        else:
            fback = "Wrong! "+n1+" times "+n2+" = "+n1*n2+" but"\
                " you answered '"+answer+"'."
            raise web.seeother("/failure?feedback="+fback)   

class Failure:
    def GET(self):
        i = web.input(feedback=None)
        return render.failure(i.feedback)
class Success:
    def GET(self):
        i = web.input(feedback=None)
        return render.success(i.feedback)

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 