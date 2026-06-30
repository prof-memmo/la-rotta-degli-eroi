with open('index.html', 'r') as f:
    lines = f.readlines()

# find the extra closing divs around a-tab-missioni
for i, line in enumerate(lines):
    if '<!-- TAB MISSIONI -->' in line:
        idx_missioni = i
        break

print(f"TAB MISSIONI found at {idx_missioni}")

# The extra divs are at idx_missioni - 4, -3, -2
to_delete = []
for i in range(idx_missioni - 5, idx_missioni):
    if '</div>' in lines[i]:
        to_delete.append(i)

print(f"Deleting lines: {to_delete}")

new_lines = [line for i, line in enumerate(lines) if i not in to_delete]

with open('index.html', 'w') as f:
    f.writelines(new_lines)

