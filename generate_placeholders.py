import os
from PIL import Image, ImageDraw, ImageFont

themes = [
    "theme_guerra", "theme_pace", "theme_destino", "theme_amicizia",
    "theme_vendetta", "theme_amore", "theme_tradimento", "theme_fedelta",
    "theme_patria", "theme_conoscenza"
]

width, height = 1024, 1024
bg_color = (240, 230, 210) # Beige

for theme in themes:
    img = Image.new("RGB", (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    # Add some dots
    for x in range(0, width, 40):
        for y in range(0, height, 40):
            draw.point((x, y), fill=(200, 190, 170))
    # Add text
    text = theme.replace("theme_", "").upper()
    # Basic font
    draw.text((width//2 - 100, height//2), text, fill=(50, 50, 50), font_size=80)
    img.save(f"assets/images/tempio/{theme}.png")
    print(f"Generated {theme}.png")

