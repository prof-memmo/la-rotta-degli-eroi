import sys
from html.parser import HTMLParser

class BalanceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
        self.line_offset = 728 # 0-indexed offset

    def handle_starttag(self, tag, attrs):
        if tag in ['img', 'br', 'hr', 'input', 'link', 'meta', 'source']: return
        self.stack.append((tag, self.getpos()[0] + self.line_offset))

    def handle_endtag(self, tag):
        if tag in ['img', 'br', 'hr', 'input', 'link', 'meta', 'source']: return
        if not self.stack:
            self.errors.append(f"Unexpected end tag {tag} at line {self.getpos()[0] + self.line_offset}")
            return
        last_tag, line = self.stack.pop()
        if last_tag != tag:
            self.errors.append(f"Mismatched tag: expected </{last_tag}> from line {line}, got </{tag}> at line {self.getpos()[0] + self.line_offset}")

with open('index.html', 'r') as f:
    lines = f.readlines()

content = "".join(lines[728:1056])
parser = BalanceParser()
parser.feed(content)

if parser.errors:
    print("Errors:")
    for e in parser.errors:
        print(e)
else:
    print("Perfectly balanced!")
