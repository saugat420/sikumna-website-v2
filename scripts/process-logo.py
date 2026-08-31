from pathlib import Path
from math import hypot

from PIL import Image


SOURCE = Path("/Users/saugatbasnet/Downloads/Sikumna logo.png")
OUTPUT = Path("public/sikumna-logo.png")
DARK_OUTPUT = Path("public/images/brand/sikumna-logo-dark.png")

image = Image.open(SOURCE).convert("RGB")
pixels = image.load()
width, height = image.size

blue_points: list[tuple[int, int]] = []
for y in range(height):
    for x in range(width):
        red, green, blue = pixels[x, y]
        if blue > red * 1.2 and blue > green * 1.08 and blue > 75:
            blue_points.append((x, y))

min_x = min(x for x, _ in blue_points)
max_x = max(x for x, _ in blue_points)
min_y = min(y for _, y in blue_points)
max_y = max(y for _, y in blue_points)
center_x = (min_x + max_x) / 2
center_y = (min_y + max_y) / 2
radius = max(max_x - min_x, max_y - min_y) / 2 + 2

result = Image.new("RGBA", image.size, (0, 0, 0, 0))
dark_result = Image.new("RGBA", image.size, (0, 0, 0, 0))
result_pixels = result.load()
dark_pixels = dark_result.load()

for y in range(height):
    for x in range(width):
        red, green, blue = pixels[x, y]
        inside_mark = (x - center_x) ** 2 + (y - center_y) ** 2 <= radius**2
        if inside_mark:
            distance = hypot(x - center_x, y - center_y)
            is_black_ring = distance > radius * 0.78 and max(red, green, blue) < 45
            if is_black_ring:
                scale = (radius * 0.77) / distance
                sample_x = round(center_x + (x - center_x) * scale)
                sample_y = round(center_y + (y - center_y) * scale)
                sample_red, sample_green, sample_blue = pixels[sample_x, sample_y]
                result_pixels[x, y] = (sample_red, sample_green, sample_blue, 255)
                dark_pixels[x, y] = (sample_red, sample_green, sample_blue, 255)
            else:
                result_pixels[x, y] = (red, green, blue, 255)
                dark_pixels[x, y] = (red, green, blue, 255)
        else:
            alpha = max(red, green, blue)
            if alpha > 8:
                result_pixels[x, y] = (15, 23, 42, alpha)
                # The supplied mark is white-on-black. Outside the blue emblem,
                # use its luminance only as alpha to create a real white wordmark.
                dark_pixels[x, y] = (255, 255, 255, alpha)

bounds = result.getbbox()
if bounds:
    result = result.crop(bounds)
    dark_result = dark_result.crop(bounds)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
result.save(OUTPUT, optimize=True)
DARK_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
dark_result.save(DARK_OUTPUT, optimize=True)
print(f"Saved {OUTPUT} ({result.width}x{result.height}, {result.mode})")
print(f"Saved {DARK_OUTPUT} ({dark_result.width}x{dark_result.height}, {dark_result.mode})")
