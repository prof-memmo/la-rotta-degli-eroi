import re

with open('js/mockData.js', 'r') as f:
    content = f.read()

# 1. Remove the blue title in ref_videogiochi
# The exact line is: <div style="font-size: 1.2rem; font-weight: 900; color: #2563eb; margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 8px; display: inline-block;">I VIDEOGIOCHI</div>
content = re.sub(
    r'<div style="font-size: 1\.2rem; font-weight: 900; color: #2563eb; margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 8px; display: inline-block;">I VIDEOGIOCHI</div>\n?',
    '',
    content
)

# 2. Remove ref_rimediazione_film_libri
# From `    { id: "ref_rimediazione_film_libri",` up to `</div>`\n    },`
# We can match it with re.DOTALL
content = re.sub(
    r'\s*\{\s*id:\s*"ref_rimediazione_film_libri".*?</div>`\n\s*\},',
    '',
    content,
    flags=re.DOTALL
)

# 3. Remove quiz_rimediazione
# From `    { id: "quiz_rimediazione",` up to `] },`
content = re.sub(
    r'\s*\{\s*id:\s*"quiz_rimediazione".*?\]\s*\},',
    '',
    content,
    flags=re.DOTALL
)

# 4. Fix unlockedBy in quiz_videogiochi to be unlocked by what unlocked quiz_rimediazione (nib_vendetta)
content = re.sub(
    r'(id:\s*"quiz_videogiochi".*?unlockedBy:\s*)"quiz_rimediazione"',
    r'\1"nib_vendetta"',
    content,
    flags=re.DOTALL
)

with open('js/mockData.js', 'w') as f:
    f.write(content)

print("Updates applied successfully!")
