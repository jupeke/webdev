from random import randint
from sys import orig_argv
import web
render = web.template.render('templates/')
urls = (
    '/', 'Home',
    '/success','Success',
    '/failure','Failure',
)
class Home:
    def GET(self):
        n1 = randint(0,10)
        n2 = randint(0,10)
        return render.home(n1,n2)   # the template name
    def POST(self):
        bad_answer = False
        i = web.input()
        orig_answer = i.answer
        try:
            answer = int(orig_answer)
        except ValueError:
            bad_answer = True
        n1 = int(i.number1)
        n2 = int(i.number2)
        answer_correct = n1*n2
        if bad_answer:
            fback = "Not a number! Your answer: '{}'".\
                format(orig_answer)
            raise web.seeother("/failure?feedback="+fback)
        elif n1 * n2 == answer:
            fback = "Correct! {} times {} = {}".format(n1,n2,answer)
            raise web.seeother("/success?feedback="+fback) 
        else:
            fback = "Wrong! {} times {} = {} but"\
                " your answer was {}.".\
                format(n1,n2,answer_correct,orig_answer)
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