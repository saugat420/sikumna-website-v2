#!/usr/bin/env python3
"""Slice the two generated 3x3 Sikumna icon sheets into named PNG assets."""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
GENERATED = ROOT / "public" / "generated"
OUTPUT = GENERATED / "icons"

SHEETS = {
    "icon-sheet-learning-v2.png": [
        "live-interactive",
        "expert-led",
        "practical-relevant",
        "learning-community",
        "ai-marketing-launchpad",
        "english-fluency",
        "ai-masterclass",
        "english-workshop",
        "target-cta",
    ],
    "icon-sheet-growth-v2.png": [
        "freelancing",
        "seo",
        "ecommerce",
        "personal-branding",
        "social-media",
        "explore",
        "enroll",
        "learn-live",
        "grow",
    ],
}

MENTORS = [
    "saurav-shrestha",
    "anita-karki",
    "rajan-adhikari",
    "prakriti-tamang",
    "bikash-kc",
]


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for sheet_name, names in SHEETS.items():
        with Image.open(GENERATED / sheet_name) as sheet:
            width, height = sheet.size
            if width % 3 or height % 3:
                raise ValueError(f"{sheet_name} must divide evenly into a 3x3 grid")
            cell_width, cell_height = width // 3, height // 3
            for index, name in enumerate(names):
                row, column = divmod(index, 3)
                bounds = (
                    column * cell_width,
                    row * cell_height,
                    (column + 1) * cell_width,
                    (row + 1) * cell_height,
                )
                sheet.crop(bounds).save(OUTPUT / f"{name}.png", optimize=True)

    mentor_output = GENERATED / "mentors"
    mentor_output.mkdir(parents=True, exist_ok=True)
    with Image.open(GENERATED / "mentor-sheet-nepal.png") as sheet:
        width, height = sheet.size
        cell_width, cell_height = width // 3, height // 2
        for index, name in enumerate(MENTORS):
            row, column = divmod(index, 3)
            bounds = (
                column * cell_width,
                row * cell_height,
                (column + 1) * cell_width,
                (row + 1) * cell_height,
            )
            sheet.crop(bounds).save(mentor_output / f"{name}.png", optimize=True)


if __name__ == "__main__":
    main()
