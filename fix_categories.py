import re

with open('js/mockData.js', 'r') as f:
    content = f.read()

# 1. quiz_rimediazione
content = re.sub(
    r'(\{\s*id:\s*"quiz_rimediazione",\s*category:\s*)"La Rimediazione"',
    r'\1"Primo Viaggio"',
    content
)

# 2. quiz_videogiochi
content = re.sub(
    r'(\{\s*id:\s*"quiz_videogiochi",\s*category:\s*)"I Videogiochi"',
    r'\1"Primo Viaggio"',
    content
)

# 3. ref_rimediazione_film_libri
content = re.sub(
    r'(id:\s*"ref_rimediazione_film_libri",\s*category:\s*)"La Rimediazione"',
    r'\1"L\'inizio del viaggio"',
    content
)

# 4. ref_videogiochi
content = re.sub(
    r'(id:\s*"ref_videogiochi",\s*category:\s*)"I Videogiochi"',
    r'\1"L\'inizio del viaggio"',
    content
)

with open('js/mockData.js', 'w') as f:
    f.write(content)

print("Categories updated successfully!")
