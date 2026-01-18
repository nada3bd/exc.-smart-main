from PIL import Image
import json, os

# عدّل اسم اللوجو إذا امتداده مختلف
LOGO_PATH = os.path.join("assets", "logo.png")

img = Image.open(LOGO_PATH).convert("RGBA")

def save_png(size, out_name):
    out = img.resize((size, size), Image.LANCZOS)
    out.save(out_name, format="PNG", optimize=True)

# PNG icons
save_png(16, "favicon-16x16.png")
save_png(32, "favicon-32x32.png")
save_png(180, "apple-touch-icon.png")
save_png(192, "android-chrome-192x192.png")
save_png(512, "android-chrome-512x512.png")

# ICO (يحتوي عدة أحجام داخل ملف واحد)
img_16 = img.resize((16, 16), Image.LANCZOS)
img_32 = img.resize((32, 32), Image.LANCZOS)
img_48 = img.resize((48, 48), Image.LANCZOS)
img_64 = img.resize((64, 64), Image.LANCZOS)
img_256 = img.resize((256, 256), Image.LANCZOS)

img_256.save("favicon.ico", format="ICO", sizes=[(16,16),(32,32),(48,48),(64,64),(256,256)])

# webmanifest
manifest = {
  "name": "Site",
  "short_name": "Site",
  "icons": [
    {"src": "android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"}
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}
with open("site.webmanifest", "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print("Done: favicon files generated in project root.")