import os
from PIL import Image

def remove_background(img_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        datas = img.getdata()

        new_data = []
        # Background in placeholders is (240, 230, 210) and dots are (200, 190, 170).
        # AI generated ones have similar beige.
        # We'll make anything that has high red/green (beige) and low contrast transparent.
        # A simpler way is to just grab the color of the top-left pixel and remove similar colors!
        
        bg_color = datas[0]
        threshold = 40

        for item in datas:
            # Check distance from bg_color
            if abs(item[0] - bg_color[0]) < threshold and abs(item[1] - bg_color[1]) < threshold and abs(item[2] - bg_color[2]) < threshold:
                new_data.append((255, 255, 255, 0)) # transparent
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(img_path, "PNG")
        print(f"Processed {img_path}")
    except Exception as e:
        print(f"Error processing {img_path}: {e}")

folder = "assets/images/tempio"
for filename in os.listdir(folder):
    if filename.startswith("theme_") and filename.endswith(".png"):
        remove_background(os.path.join(folder, filename))

