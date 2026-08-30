from pathlib import Path

from PIL import Image


SOURCE = Path("/Users/saugatbasnet/Downloads/Codex sikumna main website.png")
DESTINATION = Path("public/reference-assets")

CROPS = {
    "hero.png": (394, 64, 809, 316),
    "program-ai.png": (61, 506, 254, 651),
    "program-english.png": (267, 506, 460, 651),
    "event-ai.png": (693, 518, 796, 630),
    "event-english.png": (693, 680, 796, 790),
    "course-freelancing.png": (61, 881, 201, 988),
    "course-seo.png": (213, 881, 353, 988),
    "course-ecommerce.png": (365, 881, 505, 988),
    "course-branding.png": (517, 881, 657, 988),
    "course-social.png": (669, 881, 805, 988),
    "expert-saurav.png": (84, 1138, 170, 1227),
    "expert-anita.png": (236, 1138, 323, 1227),
    "expert-rajan.png": (389, 1138, 476, 1227),
    "expert-prakriti.png": (541, 1138, 628, 1227),
    "expert-bikash.png": (693, 1138, 780, 1227),
    "target.png": (94, 1517, 220, 1602),
}

image = Image.open(SOURCE).convert("RGB")
DESTINATION.mkdir(parents=True, exist_ok=True)

for filename, bounds in CROPS.items():
    output = DESTINATION / filename
    image.crop(bounds).save(output, optimize=True)
    print(output)
