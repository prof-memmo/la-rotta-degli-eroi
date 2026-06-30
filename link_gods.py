import re

with open('js/mockData.js', 'r') as f:
    content = f.read()

god_images = {
    'god_muse': 'muses_portrait.png',
    'god_odino': 'odino_portrait.png',
    'god_thor': 'thor_portrait.png',
    'god_frigg': 'frigg_portrait.png',
    'god_freya': 'freya_portrait.png',
    'god_loki': 'loki_portrait.png',
    'god_tyr': 'tyr_portrait.png'
}

for god_id, img_file in god_images.items():
    # Find the line with the god_id and no image
    # Example: id: "god_muse",\n      category: "Divinità",\n      title: "Le Muse",\n      summary: "..."
    # We will replace `id: "god_muse",` with `id: "god_muse",\n      image: "assets/images/tempio/img_file",`
    content = re.sub(
        rf'id:\s*"{god_id}",(?!.*image:)',
        f'id: "{god_id}",\n      image: "assets/images/tempio/{img_file}",',
        content,
        flags=re.MULTILINE
    )

with open('js/mockData.js', 'w') as f:
    f.write(content)
