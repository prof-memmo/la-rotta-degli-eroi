import re

file_path = 'index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I need to extract the tabs that I wrongly inserted into admin dashboard.
# They are: a-tab-missioni, a-tab-shop, a-tab-aiutanti, a-tab-guide, a-tab-registro
# These were inserted right after `<div id="a-tab-utenti" class="tab-content">...</div>`
# Let's extract them.

tabs_to_extract = ['missioni', 'shop', 'aiutanti', 'guide', 'registro']
extracted_tabs = []

for tab in tabs_to_extract:
    pattern = r'(<!-- TAB ' + tab.upper() + r' -->\s*<div id="a-tab-' + tab + r'".*?)(?=<!-- TAB |</section>)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        tab_html = match.group(1)
        # Remove from content
        content = content.replace(tab_html, '')
        
        # Rename a-tab to t-tab and a-btn to t-btn if necessary
        # Note: the ids inside were like `admin-mission-title`, we might need to change them back to `teacher-mission-title`?
        # Actually in fix_admin_tabs.py I just replaced `t-tab` with `a-tab`. So I can revert that.
        tab_html = tab_html.replace('a-tab-', 't-tab-')
        extracted_tabs.append(tab_html)

# Now, insert them into view-teacher-dashboard
# I'll put them right after `<div id="t-tab-nodi" class="tab-content">...</div>`
# Wait, let's find a good place. How about right before `<!-- TAB TORNEI -->`?
insert_point = '<!-- TAB TORNEI -->'
if insert_point in content:
    content = content.replace(insert_point, '\n'.join(extracted_tabs) + '\n' + insert_point)
else:
    print("Could not find insert point!")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Tabs moved successfully.")
