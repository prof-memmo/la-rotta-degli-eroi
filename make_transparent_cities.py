import os
from PIL import Image

cities = ["uruk", "troia", "micene", "tebe", "itaca", "sparta", "atene", "cartagine", "roma", "camelot", "worms", "aquisgrana"]
folder = "assets/images/tempio"

for city in cities:
    src_path = os.path.join(folder, f"{city}_landscape_ercole.png")
    dst_path = os.path.join(folder, f"{city}_landscape.png")
    
    if not os.path.exists(src_path):
        print(f"File non trovato: {src_path}")
        continue
        
    try:
        img = Image.open(src_path).convert("RGBA")
        datas = img.getdata()
        
        # Le immagini generate spesso hanno uno sfondo bianco o beige a pois
        # Troviamo il colore dell'angolo in alto a sinistra
        bg_color = datas[0]
        
        # Tolleranza più ampia se ci sono variazioni leggere o jpeg artifacts
        # Ma le immagini ERCOLE style di solito hanno un background abbastanza uniforme
        threshold = 30
        
        new_data = []
        for item in datas:
            # Se il pixel è vicino a bg_color o al bianco puro
            if (abs(item[0] - bg_color[0]) < threshold and 
                abs(item[1] - bg_color[1]) < threshold and 
                abs(item[2] - bg_color[2]) < threshold) or (item[0] > 240 and item[1] > 240 and item[2] > 240):
                new_data.append((255, 255, 255, 0)) # Trasparente
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(dst_path, "PNG")
        print(f"Trasparenza creata per {city} -> {dst_path}")
    except Exception as e:
        print(f"Errore su {city}: {e}")

