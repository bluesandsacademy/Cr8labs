#!/usr/bin/env python3
"""List every bracketed placeholder still in rendered copy (app/ and components/), for the pre-launch fill-or-cut pass."""
import os, re, sys
pat = re.compile(r"\[[^\]\n]{1,220}\]")
rows = []
for base in ("app", "components"):
    for root, _, files in os.walk(base):
        for f in files:
            if not f.endswith((".tsx", ".ts")) or ".test." in f:
                continue
            p = os.path.join(root, f)
            for n, line in enumerate(open(p, encoding="utf-8"), 1):
                for m in pat.finditer(line):
                    if re.match(r"\[[A-Z₦$0-9]", m.group(0)):
                        rows.append((p, n, m.group(0)))
for p, n, s in sorted(rows):
    print(f"{p}:{n}: {s}")
print(f"# {len(rows)} placeholders", file=sys.stderr)
