from random import randint
import web
render = web.template.render('templates/')
urls = (
    '/', 'Home',
)
class Home:
    def GET(self):
        n1 = randint(0,10)
        n2 = randint(0,10)
        return render.home(n1,n2)   # the template name


if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 