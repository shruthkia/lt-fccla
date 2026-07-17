from PIL import Image
import os

brand = r"C:\Users\Guruom\lebanon-trail-fccla\public\brand"
path = os.path.join(brand, "rosie-raw.png")
img = Image.open(path).convert("RGBA")
w, h = img.size
px = img.load()

# Flood-fill from edges: any reddish / background-like pixel contiguous from borders
from collections import deque

def is_bg(r, g, b, a):
    if a < 10:
        return True
    # red / pink / magenta-ish background tones
    if r >= 140 and g <= 130 and b <= 130 and (r - min(g, b)) >= 40:
        return True
    if r >= 190 and g <= 160 and b <= 160 and (r - g) >= 25 and (r - b) >= 25:
        return True
    return False

visited = [[False] * w for _ in range(h)]
q = deque()

for x in range(w):
    q.append((x, 0))
    q.append((x, h - 1))
for y in range(h):
    q.append((0, y))
    q.append((w - 1, y))

while q:
    x, y = q.popleft()
    if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
        continue
    visited[y][x] = True
    r, g, b, a = px[x, y]
    if not is_bg(r, g, b, a):
        continue
    px[x, y] = (r, g, b, 0)
    q.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

# Also clear any remaining non-connected soft red blobs that are clearly bg
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a == 0:
            continue
        # leftover soft red clouds: high red, moderate others, not white outline
        if r > 200 and g < 100 and b < 100:
            px[x, y] = (r, g, b, 0)
        elif r > 170 and 40 < g < 110 and 40 < b < 110 and (r - g) > 70:
            # avoid eating pink ear interiors (small regions inside white) — only if near edge
            if x < 8 or y < 8 or x > w - 9 or y > h - 9:
                px[x, y] = (r, g, b, 0)

bbox = img.getbbox()
if bbox:
    pad = 2
    l, t, ri, bo = bbox
    img = img.crop((max(0, l - pad), max(0, t - pad), min(w, ri + pad), min(h, bo + pad)))

out = os.path.join(brand, "rosie-llama.png")
img.save(out)
print("rosie cleaned", img.size, out)
