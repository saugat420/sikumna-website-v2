from pathlib import Path

from PIL import Image


SOURCE = Path("/Users/saugatbasnet/Downloads/Sikumna logo.png")
OUTPUT = Path("public/sikumna-logo.png")

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
result_pixels = result.load()

for y in range(height):
    for x in range(width):
        red, green, blue = pixels[x, y]
        inside_mark = (x - center_x) ** 2 + (y - center_y) ** 2 <= radius**2
        if inside_mark:
            result_pixels[x, y] = (red, green, blue, 255)
        else:
            alpha = max(red, green, blue)
            if alpha > 8:
                result_pixels[x, y] = (15, 23, 42, alpha)

bounds = result.getbbox()
if bounds:
    result = result.crop(bounds)

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
result.save(OUTPUT, optimize=True)
print(f"Saved {OUTPUT} ({result.width}x{result.height}, {result.mode})")
