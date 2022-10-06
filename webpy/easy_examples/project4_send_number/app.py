from random import randint
import web
render = web.template.render('templates/')
urls = (
    '/', 'Home',
    '/target','Target',
)
class Home:
    def GET(self):
        return render.home   # the template name
    def POST(self):
        not_number = False
        i = web.input()
        input = i.number
        try:
            number = int(input)
        except ValueError:
            bad_number = True
        
        # Create feedback:
        if not_number:
            fback = "'{}' is NOT a number!".format(input)
        else:
            fback = "Your number is {} ".format(number)
             
        raise web.seeother("/target?feedback="+fback)  

class Target:
    def GET(self):
        i = web.input(feedback=None)
        return render.target(i.feedback)

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 