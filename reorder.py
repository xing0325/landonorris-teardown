"""
Reorder the 30 demo blocks in the HTML by category, then relabel 01..30.
Also rebuilds the category TOC anchors and inserts category dividers.
"""
import re, sys, pathlib

SRC = pathlib.Path(r"C:\Users\david\OneDrive\桌面\lando-norris-reverse-engineering.html")

# Desired order: (demo_id, category_key, category_letter, category_name)
ORDER = [
    # A · 入场 & 转场
    ("demo1",     "entrance", "A", "入场 & 转场"),
    ("demo11",    "entrance", "A", "入场 & 转场"),
    # B · 滚动驱动
    ("demo3",     "scroll",   "B", "滚动驱动"),
    ("demo4",     "scroll",   "B", "滚动驱动"),
    ("demo5",     "scroll",   "B", "滚动驱动"),
    ("demo15",    "scroll",   "B", "滚动驱动"),
    ("demo19svg", "scroll",   "B", "滚动驱动"),
    ("demo24",    "scroll",   "B", "滚动驱动"),
    ("demo28",    "scroll",   "B", "滚动驱动"),  # new · CSS dual marquee
    # C · 导航 & 主题
    ("demo2",     "nav",      "C", "导航 & 主题"),
    ("demo21",    "nav",      "C", "导航 & 主题"),
    # D · 微动效
    ("demo6",     "micro",    "D", "微动效"),
    ("demo18",    "micro",    "D", "微动效"),
    ("demo22",    "micro",    "D", "微动效"),
    ("demo26",    "micro",    "D", "微动效"),  # new · magnetic button
    ("demo30",    "micro",    "D", "微动效"),  # new · hold-to-transition
    # E · 数据驱动
    ("demo12",    "data",     "E", "数据驱动"),
    ("demo19",    "data",     "E", "数据驱动"),
    ("demo27",    "data",     "E", "数据驱动"),  # new · scroll counter
    # F · 手势 & 光标
    ("demo8",     "gesture",  "F", "手势 & 光标"),
    ("demo9",     "gesture",  "F", "手势 & 光标"),
    ("demo17",    "gesture",  "F", "手势 & 光标"),
    # G · 视觉系统
    ("demo7",     "visual",   "G", "视觉系统"),
    ("demo13",    "visual",   "G", "视觉系统"),
    ("demo14",    "visual",   "G", "视觉系统"),
    ("demo16",    "visual",   "G", "视觉系统"),
    ("demo20",    "visual",   "G", "视觉系统"),
    ("demo29",    "visual",   "G", "视觉系统"),  # new · scroll font width
    # H · 媒体
    ("demo10",    "media",    "H", "媒体"),
    ("demo23",    "media",    "H", "媒体"),
]

TOTAL = len(ORDER)  # 30

text = SRC.read_text(encoding="utf-8")

demo_pattern = re.compile(
    r'(?P<pre>(?:    <!--[^>]*-->\s*\n)?)    <div class="demo" id="(?P<id>[^"]+)">.*?\n    </div>(?=\n)',
    re.DOTALL
)

blocks = {}
matches = list(demo_pattern.finditer(text))
print(f"Found {len(matches)} demo blocks; expected {TOTAL}")

if len(matches) != TOTAL:
    print("FAIL: count mismatch")
    sys.exit(1)

for m in matches:
    blocks[m.group("id")] = m.group(0)

missing = [oid for oid, *_ in ORDER if oid not in blocks]
if missing:
    print("MISSING ids:", missing)
    sys.exit(1)

# Also remove old cat-dividers so we can re-insert fresh ones.
# The script's range covers matches[0].start() to matches[-1].end(), so cat-dividers
# between demos will be wiped naturally.

def renumber_label(html, new_num):
    return re.sub(
        r'<div class="num">\d+ / \d+</div>',
        f'<div class="num">{new_num:02d} / {TOTAL:02d}</div>',
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
start = matches[0].start()
end = matches[-1].end()
before = text[:start]
after = text[end:]
new_text = before + new_section + after

# Update references that point to specific demo numbers by their id.
id_to_new = {oid: i for i, (oid, *_ ) in enumerate(ORDER, start=1)}

# Existing references in the global-systems write-up.
# We need to rewrite "Demo XX" labels referring to specific demo ids.
# Look for current numbers used in those references and rewrite based on id.
ref_targets = {
    "demo11": "Demo {n:02d}",   # lime curtain
    "demo9":  "Demo {n:02d}",   # cursor reveal
    "demo10": "Demo {n:02d}",   # hover video
}
# Replace any "Demo NN</strong>" where the previous number was assigned to one of these ids.
# Easier: scan for "Demo (\d+)</strong>" and replace with new number based on a mapping.
# But the mapping was based on previous numbering. To be robust, do explicit:
new_text = re.sub(r'Demo \d+</strong> 用纯 CSS', f'Demo {id_to_new["demo11"]:02d}</strong> 用纯 CSS', new_text)
new_text = re.sub(r'Demo \d+</strong> 演示了这套。</p>', lambda mm: mm.group(0), new_text)  # noop; we patch specific ones below

# patch global system refs for demo 9 (cursor) and demo 10 (video).
# Both texts already say "Demo 09" / "Demo 10"; previously the script changed them
# to new numbers — find current values and rewrite with new id_to_new.
for oid in ["demo9", "demo10"]:
    new_num = id_to_new[oid]
    # find within "→ 上面 <strong>Demo NN</strong> 演示了这套" context — only 1 each
    # we can match any "Demo \d+</strong>" remaining and overwrite to NN.
    # but we already patched lime; remaining 2 are cursor + video — pick them by ORDER context.

# Simpler: just rewrite all three remaining "Demo NN</strong>" lines with their
# respective new numbers by their distinct context strings.
new_text = re.sub(
    r'Demo \d+</strong> 演示了这套(?=。</p>[\s\S]*?「最大价值」|。</p>[\s\S]*?不让)',
    lambda mm: mm.group(0),
    new_text,
)

# Brute force: assume order of mention in the file = order [demo9, demo10].
def patch_ordered(text, ids):
    nums = [id_to_new[i] for i in ids]
    def gen():
        for n in nums:
            yield f"Demo {n:02d}</strong>"
    g = gen()
    def repl(_): return next(g)
    return re.sub(r'Demo \d+</strong>(?= 演示了这套)', repl, text, count=len(ids))

new_text = patch_ordered(new_text, ["demo9", "demo10"])

SRC.write_text(new_text, encoding="utf-8")
print("DONE · total length:", len(new_text))
