import re

with open('js/mockData.js', 'r') as f:
    lines = f.readlines()

in_guides = False
current_item = []
missing = []

for line in lines:
    if 'study_guides: [' in line:
        in_guides = True
        continue
    if in_guides and '], // Fine study_guides' in line or 'missions: [' in line:
        in_guides = False
        break
        
    if in_guides:
        if '{' in line and 'id:' in line:
            current_item = [line]
        elif current_item is not None:
            current_item.append(line)
            if '},' in line or '} // Fine guida' in line or (line.strip() == '}'):
                item_str = "".join(current_item)
                if 'image:' not in item_str and 'imageUrl:' not in item_str:
                    id_match = re.search(r'id:\s*"([^"]+)"', item_str)
                    cat_match = re.search(r'category:\s*"([^"]+)"', item_str)
                    title_match = re.search(r'title:\s*"([^"]+)"', item_str)
                    
                    guide_id = id_match.group(1) if id_match else "unknown"
                    cat = cat_match.group(1) if cat_match else "unknown"
                    title = title_match.group(1) if title_match else "unknown"
                    
                    missing.append(f"{guide_id} | {cat} | {title}")
                current_item = None

print("Missing images:")
for m in missing:
    print(m)

