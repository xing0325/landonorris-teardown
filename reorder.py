"""
Reorder the 25 demo blocks in the HTML by category, then relabel 01..25.
Also update the category TOC anchors / numbers to match new ordering, and add
category section dividers between groups.
"""
import re, sys, pathlib

SRC = pathlib.Path(r"C:\Users\david\OneDrive\桌面\lando-norris-reverse-engineering.html")

# Desired order: (demo_id, category_key, category_letter, category_name)
ORDER = [
    ("demo1",     "entrance", "A", "入场 & 转场"),
    ("demo11",    "entrance", "A", "入场 & 转场"),
    ("demo3",     "scroll",   "B", "滚动驱动"),
    ("demo4",     "scroll",   "B", "滚动驱动"),
    ("demo5",     "scroll",   "B", "滚动驱动"),
    ("demo15",    "scroll",   "B", "滚动驱动"),
    ("demo19svg", "scroll",   "B", "滚动驱动"),
    ("demo24",    "scroll",   "B", "滚动驱动"),
    ("demo2",     "nav",      "C", "导航 & 主题"),
    ("demo21",    "nav",      "C", "导航 & 主题"),
    ("demo6",     "micro",    "D", "微动效"),
    ("demo18",    "micro",    "D", "微动效"),
    ("demo22",    "micro",    "D", "微动效"),
    ("demo12",    "data",     "E", "数据驱动"),
    ("demo19",    "data",     "E", "数据驱动"),
    ("demo8",     "gesture",  "F", "手势 & 光标"),
    ("demo9",     "gesture",  "F", "手势 & 光标"),
    ("demo17",    "gesture",  "F", "手势 & 光标"),
    ("demo7",     "visual",   "G", "视觉系统"),
    ("demo13",    "visual",   "G", "视觉系统"),
    ("demo14",    "visual",   "G", "视觉系统"),
    ("demo16",    "visual",   "G", "视觉系统"),
    ("demo20",    "visual",   "G", "视觉系统"),
    ("demo10",    "media",    "H", "媒体"),
    ("demo23",    "media",    "H", "媒体"),
]

text = SRC.read_text(encoding="utf-8")

# Find each demo block: <div class="demo" id="XXX"> ... </div> at indent 4 spaces.
# We split using `<!-- DEMO ` comments which anchor every demo block.
# Pattern: find the start of each demo block by `    <div class="demo" id="XXX">`.

# Use regex to find each demo block boundaries.
demo_pattern = re.compile(
    r'(?P<pre>(?:    <!--[^>]*-->\s*\n)?)    <div class="demo" id="(?P<id>[^"]+)">.*?\n    </div>(?=\n)',
    re.DOTALL
)

blocks = {}
matches = list(demo_pattern.finditer(text))
print(f"Found {len(matches)} demo blocks")

if len(matches) != 25:
    print("FAIL: expected 25 demo blocks, got", len(matches))
    sys.exit(1)

for m in matches:
    blocks[m.group("id")] = m.group(0)

# Check we have all the IDs we need
missing = [oid for oid, *_ in ORDER if oid not in blocks]
if missing:
    print("MISSING ids:", missing)
    sys.exit(1)

# Build the new demos section (in order, with new labels 01..25 and a category
# divider before each category's first demo).

def renumber_label(html, new_num):
    return re.sub(
        r'<div class="num">\d+ / 25</div>',
        f'<div class="num">{new_num:02d} / 25</div>',
        html,
        count=1
    )

new_chunks = []
prev_cat = None
for i, (demo_id, cat_key, cat_letter, cat_name) in enumerate(ORDER, start=1):
    if cat_key != prev_cat:
        new_chunks.append(
            f'    <div class="cat-divider" data-cat="{cat_key}" id="cat-{cat_key}">\n'
            f'      <div class="cat-divider-key">{cat_letter}</div>\n'
            f'      <div class="cat-divider-name">{cat_name}</div>\n'
            f'      <div class="cat-divider-tail"></div>\n'
            f'    </div>\n'
        )
        prev_cat = cat_key
    html = renumber_label(blocks[demo_id], i)
    new_chunks.append(html)

new_section = "\n".join(new_chunks)

# Replace the original demo blocks in the file. We replace from the start of the
# FIRST demo match to the end of the LAST one.
start = matches[0].start()
# We also need to absorb the leading "    <!-- DEMO " comments that precede each
# demo. matches[0] already starts at the first comment via the optional `pre`
# group.
end = matches[-1].end()
before = text[:start]
after = text[end:]
new_text = before + new_section + after

# Update text references that point to demos by old number.
# Old: "Demo 25 用纯 CSS" (lime curtain was renumbered to 25, now it's 02).
# We need to map demo IDs to new numbers and rewrite "Demo XX" references.
id_to_new = {oid: i for i, (oid, *_ ) in enumerate(ORDER, start=1)}

# References:
#   - "Demo 25" (lime curtain) currently. The id is demo11 -> new 02.
#   - "Demo 09" (cursor) - id demo9 -> new 17.
#   - "Demo 10" (video) - id demo10 -> new 24.
new_text = new_text.replace("Demo 25</strong>", f"Demo {id_to_new['demo11']:02d}</strong>")
new_text = new_text.replace("Demo 09</strong>", f"Demo {id_to_new['demo9']:02d}</strong>")
new_text = new_text.replace("Demo 10</strong>", f"Demo {id_to_new['demo10']:02d}</strong>")

# Rebuild the TOC. Replace the .cat-toc block.
toc_rows = []
groups = {}
for i, (oid, ck, cl, cn) in enumerate(ORDER, start=1):
    groups.setdefault(ck, {"letter": cl, "name": cn, "items": []})
    groups[ck]["items"].append((i, oid))

def cat_row(ck, group):
    nums_html = "".join(
        f'<a href="#{oid}" data-go="{oid}">{i:02d}</a>'
        for (i, oid) in group["items"]
    )
    return (
        f'      <div class="cat-row" data-cat="{ck}">'
        f'<div class="cat-name"><span class="cat-key">{group["letter"]}</span>{group["name"]}</div>'
        f'<div class="cat-nums">{nums_html}</div></div>\n'
    )

toc_inner = '\n'.join(
    cat_row(ck, groups[ck]).rstrip("\n")
    for ck in ["entrance","scroll","nav","micro","data","gesture","visual","media"]
)
new_toc = (
    '    <div class="cat-toc reveal">\n'
    '      <div class="cat-toc-head">分类导航 · 点编号跳到对应 demo</div>\n'
    + toc_inner + "\n"
    '    </div>'
)

# Replace existing .cat-toc block
new_text = re.sub(
    r'    <div class="cat-toc reveal">.*?</div>\n    </div>',
    lambda _: new_toc,
    new_text,
    count=1,
    flags=re.DOTALL
)

SRC.write_text(new_text, encoding="utf-8")
print("DONE")
print("Total length:", len(new_text))
