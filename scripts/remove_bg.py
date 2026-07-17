from PIL import Image
import os

brand = r"C:\Users\Guruom\lebanon-trail-fccla\public\brand"

# --- Rose: remove white bg + bottom watermark ---
rose = Image.open(os.path.join(brand, "rose-raw.png")).convert("RGBA")
w, h = rose.size
crop_h = int(h * 0.92)
rose = rose.crop((0, 0, w, crop_h))
w, h = rose.size
px = rose.load()
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if r > 235 and g > 235 and b > 235:
            px[x, y] = (r, g, b, 0)
        elif r > 220 and g > 220 and b > 220 and abs(r - g) < 12 and abs(g - b) < 12:
            px[x, y] = (r, g, b, 0)
bbox = rose.getbbox()
if bbox:
    rose = rose.crop(bbox)
rose_path = os.path.join(brand, "red-rose.png")
rose.save(rose_path)
print("rose", rose.size, rose_path)

# --- Rosie: remove red background, keep sticker ---
rosie = Image.open(os.path.join(brand, "rosie-raw.png")).convert("RGBA")
w, h = rosie.size
px = rosie.load()
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if r > 150 and g < 90 and b < 90:
            px[x, y] = (r, g, b, 0)
        elif r > 180 and g < 120 and b < 120 and (r - g) > 60 and (r - b) > 60:
            px[x, y] = (r, g, b, 0)
bbox = rosie.getbbox()
if bbox:
    pad = 4
    l, t, ri, bo = bbox
    bbox = (max(0, l - pad), max(0, t - pad), min(w, ri + pad), min(h, bo + pad))
    rosie = rosie.crop(bbox)
rosie_path = os.path.join(brand, "rosie-llama.png")
rosie.save(rosie_path)
print("rosie", rosie.size, rosie_path)
