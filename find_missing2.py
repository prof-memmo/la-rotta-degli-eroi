import re

with open('js/mockData.js', 'r') as f:
    content = f.read()

match = re.search(r'study_guides:\s*\[(.*?)\]\s*,\s*missions:', content, re.DOTALL)
if match:
    guides_str = match.group(1)
    guides = guides_str.split('{ id:')
    missing = []
    for g in guides[1:]:
        if 'image:' not in g and 'imageUrl:' not in g:
            id_match = re.search(r'^[\s]*"([^"]+)"', g)
            if not id_match:
                id_match = re.search(r"^[\s]*'([^']+)'", g)
            if not id_match:
                id_match = re.search(r"^[\s]*([a-zA-Z0-9_]+)", g)
                
            cat_match = re.search(r'category:\s*"([^"]+)"', g)
            title_match = re.search(r'title:\s*"([^"]+)"', g)
            
            guide_id = id_match.group(1) if id_match else "unknown"
            cat = cat_match.group(1) if cat_match else "unknown"
            title = title_match.group(1) if title_match else "unknown"
            
            missing.append(f"{guide_id} | {cat} | {title}")
            
    print("Missing images:")
    for m in missing:
        print(m)
else:
    print("Could not find study_guides array")
