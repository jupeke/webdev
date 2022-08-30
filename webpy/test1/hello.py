import web

urls = (
    '/', 'Hello'
)
class Hello:
    def GET(self):
        return "Hello, world!"

if __name__ == "__main__":
    hello = web.application(urls, globals())
    hello.run() 