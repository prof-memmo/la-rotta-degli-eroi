import re

with open('js/mockData.js', 'r') as f:
    content = f.read()

def repl(match):
    id_val = match.group(1)
    return f'id: "{id_val}",\n      image: "assets/guides/{id_val}.png",\n      horizontal: true,\n      category: "Schede Tematiche",'

new_content = re.sub(r'id:\s*"([^"]+)",\s*category:\s*"Schede Tematiche",', repl, content)

with open('js/mockData.js', 'w') as f:
    f.write(new_content)
