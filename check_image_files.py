import re
import os

with open('js/mockData.js', 'r') as f:
    content = f.read()

images = re.findall(r'image:\s*"([^"]+)"', content)
images += re.findall(r"image:\s*'([^']+)'", content)

missing_files = []
for img in images:
    if not os.path.exists(img):
        missing_files.append(img)

missing_files = list(set(missing_files))

print("Missing image files in filesystem:")
for m in sorted(missing_files):
    print(m)
