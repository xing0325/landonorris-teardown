"""Reorder 65 demo blocks. D micro is fattest at 40."""
import re, sys, pathlib

SRC = pathlib.Path(r"C:\Users\david\OneDrive\桌面\lando-norris-reverse-engineering.html")

ORDER = [
    # A · entrance
    ("demo1",     "entrance", "A", "入场 & 转场"),
    ("demo11",    "entrance", "A", "入场 & 转场"),
    # B · scroll
    ("demo3",     "scroll",   "B", "滚动驱动"),
    ("demo4",     "scroll",   "B", "滚动驱动"),
    ("demo5",     "scroll",   "B", "滚动驱动"),
    ("demo15",    "scroll",   "B", "滚动驱动"),
    ("demo19svg", "scroll",   "B", "滚动驱动"),
    ("demo24",    "scroll",   "B", "滚动驱动"),
    ("demo28",    "scroll",   "B", "滚动驱动"),
    # C · nav
    ("demo2",     "nav",      "C", "导航 & 主题"),
    ("demo21",    "nav",      "C", "导航 & 主题"),
    # D · micro — 40 total, 4 subgroups
    # D.buttons (10)
    ("demo22",    "micro",    "D", "微动效"),
    ("demo26",    "micro",    "D", "微动效"),
    ("demo30",    "micro",    "D", "微动效"),
    ("demo31",    "micro",    "D", "微动效"),
    ("demo32",    "micro",    "D", "微动效"),
    ("demo33",    "micro",    "D", "微动效"),
    ("demo34",    "micro",    "D", "微动效"),
    ("demo35",    "micro",    "D", "微动效"),
    ("demo36",    "micro",    "D", "微动效"),
    ("demo37",    "micro",    "D", "微动效"),
    # D.links (10)
    ("demo18",    "micro",    "D", "微动效"),
    ("demo6",     "micro",    "D", "微动效"),
    ("demo38",    "micro",    "D", "微动效"),
    ("demo39",    "micro",    "D", "微动效"),
    ("demo40",    "micro",    "D", "微动效"),
    ("demo41",    "micro",    "D", "微动效"),
    ("demo42",    "micro",    "D", "微动效"),
    ("demo43",    "micro",    "D", "微动效"),
    ("demo44",    "micro",    "D", "微动效"),
    ("demo45",    "micro",    "D", "微动效"),
    # D.forms (10)
    ("demo46",    "micro",    "D", "微动效"),
    ("demo47",    "micro",    "D", "微动效"),
    ("demo48",    "micro",    "D", "微动效"),
    ("demo49",    "micro",    "D", "微动效"),
    ("demo50",    "micro",    "D", "微动效"),
    ("demo51",    "micro",    "D", "微动效"),
    ("demo52",    "micro",    "D", "微动效"),
    ("demo53",    "micro",    "D", "微动效"),
    ("demo54",    "micro",    "D", "微动效"),
    ("demo55",    "micro",    "D", "微动效"),
    # D.feedback (10)
    ("demo56",    "micro",    "D", "微动效"),
    ("demo57",    "micro",    "D", "微动效"),
    ("demo58",    "micro",    "D", "微动效"),
    ("demo59",    "micro",    "D", "微动效"),
    ("demo60",    "micro",    "D", "微动效"),
    ("demo61",    "micro",    "D", "微动效"),
    ("demo62",    "micro",    "D", "微动效"),
    ("demo63",    "micro",    "D", "微动效"),
    ("demo64",    "micro",    "D", "微动效"),
    ("demo65",    "micro",    "D", "微动效"),
    # E · data
    ("demo12",    "data",     "E", "数据驱动"),
    ("demo19",    "data",     "E", "数据驱动"),
    ("demo27",    "data",     "E", "数据驱动"),
    # F · gesture
    ("demo8",     "gesture",  "F", "手势 & 光标"),
    ("demo9",     "gesture",  "F", "手势 & 光标"),
    ("demo17",    "gesture",  "F", "手势 & 光标"),
    # G · visual
    ("demo7",     "visual",   "G", "视觉系统"),
    ("demo13",    "visual",   "G", "视觉系统"),
    ("demo14",    "visual",   "G", "视觉系统"),
    ("demo16",    "visual",   "G", "视觉系统"),
    ("demo20",    "visual",   "G", "视觉系统"),
    ("demo29",    "visual",   "G", "视觉系统"),
    # H · media
    ("demo10",    "media",    "H", "媒体"),
    ("demo23",    "media",    "H", "媒体"),
]

TOTAL = len(ORDER)
print(f"Expected {TOTAL} demos")

text = SRC.read_text(encoding="utf-8")

demo_pattern = re.compile(
    r'(?P<pre>(?:    <!--[^>]*-->\s*\n)?)    <div class="demo" id="(?P<id>[^"]+)">.*?\n    </div>(?=\n)',
    re.DOTALL
)

blocks = {}
matches = list(demo_pattern.finditer(text))
print(f"Found {len(matches)} demo blocks")

if len(matches) != TOTAL:
    print(f"FAIL: expected {TOTAL}, got {len(matches)}")
    sys.exit(1)

for m in matches:
    blocks[m.group("id")] = m.group(0)

missing = [oid for oid, *_ in ORDER if oid not in blocks]
if missing:
    print("MISSING:", missing); sys.exit(1)

def renumber_label(html, new_num):
    return re.sub(
        r'<div class="num">\d+ / \d+</div>',
        f'<div class="num">{new_num:02d} / {TOTAL:02d}</div>',
        html, count=1
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
    new_chunks.append(renumber_label(blocks[demo_id], i))

new_section = "\n".join(new_chunks)
start = matches[0].start()
end = matches[-1].end()
new_text = text[:start] + new_section + text[end:]

id_to_new = {oid: i for i, (oid, *_) in enumerate(ORDER, start=1)}

# Patch references
new_text = re.sub(r'Demo \d+</strong> 用纯 CSS', f'Demo {id_to_new["demo11"]:02d}</strong> 用纯 CSS', new_text)

def patch_ordered(text, ids):
    nums = [id_to_new[i] for i in ids]
    it = iter(nums)
    def repl(_): return f"Demo {next(it):02d}</strong>"
    return re.sub(r'Demo \d+</strong>(?= 演示了这套)', repl, text, count=len(ids))

new_text = patch_ordered(new_text, ["demo9", "demo10"])

SRC.write_text(new_text, encoding="utf-8")
print("DONE · length:", len(new_text))
