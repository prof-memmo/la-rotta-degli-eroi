from html.parser import HTMLParser

class TagStackParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.line_offset = 728
        self.glass_panel_opened = 730

    def handle_starttag(self, tag, attrs):
        if tag in ['img', 'br', 'hr', 'input', 'link', 'meta', 'source']: return
        self.stack.append((tag, self.getpos()[0] + self.line_offset))

    def handle_endtag(self, tag):
        if tag in ['img', 'br', 'hr', 'input', 'link', 'meta', 'source']: return
        if not self.stack: return
        last_tag, line = self.stack.pop()
        if line == self.glass_panel_opened:
            print(f"glass-panel from {self.glass_panel_opened} was closed at {self.getpos()[0] + self.line_offset}")

with open('index.html', 'r') as f:
    lines = f.readlines()
content = "".join(lines[728:1056])
parser = TagStackParser()
parser.feed(content)
