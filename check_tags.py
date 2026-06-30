from html.parser import HTMLParser

class BalanceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag in ['img', 'br', 'hr', 'input', 'link', 'meta']: return
        self.stack.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        if tag in ['img', 'br', 'hr', 'input', 'link', 'meta']: return
        if not self.stack:
            self.errors.append(f"Unexpected end tag {tag} at {self.getpos()}")
            return
        last_tag, pos = self.stack.pop()
        if last_tag != tag:
            self.errors.append(f"Mismatched tag: expected </{last_tag}> from {pos}, got </{tag}> at {self.getpos()}")

parser = BalanceParser()
with open('index.html', 'r') as f:
    parser.feed(f.read())

if parser.errors:
    print("Errors found:")
    for e in parser.errors:
        print(e)
else:
    print("All tags matched perfectly!")
