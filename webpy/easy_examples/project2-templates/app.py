import web
render = web.template.render('templates/')
urls = (
    '/', 'Home',
    '/hobbies/','Hobbies',
)
class Home:
    def GET(self):
        name = "John Smith"
        return render.home(name)   # home is the template name

class Hobbies:
    def GET(self):
        main_hobby = "programming"
        second_hobby = "hiking"
        return render.hobbies(main_hobby, second_hobby)    

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 