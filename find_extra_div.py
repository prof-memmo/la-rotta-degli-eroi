from html.parser import HTMLParser

class TagStackParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.line_offset = 728
        self.error_line = -1

    def handle_starttag(self, tag, attrs):
        if tag in ['img', 'br', 'hr', 'input', 'link', 'meta', 'source']: return
        self.stack.append((tag, self.getpos()[0] + self.line_offset))

    def handle_endtag(self, tag):
        if tag in ['img', 'br', 'hr', 'input', 'link', 'meta', 'source']: return
        if not self.stack:
            return
        last_tag, line = self.stack.pop()
        if last_tag != tag and self.error_line == -1:
            self.error_line = self.getpos()[0] + self.line_offset
            print(f"Error at line {self.error_line}: expected </{last_tag}> but got </{tag}>. Stack was:")
            for s in self.stack:
                print(f"  {s[0]} opened at {s[1]}")
            print(f"  {last_tag} opened at {line} (expected to close this)")

with open('index.html', 'r') as f:
    lines = f.readlines()
content = "".join(lines[728:1056])
parser = TagStackParser()
parser.feed(content)
