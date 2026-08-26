#!/usr/bin/env python3
"""List every bracketed placeholder still in rendered copy (app/ and components/), for the pre-launch fill-or-cut pass.

A placeholder starts with a capital letter, a currency sign, or a number that is followed by a
space or the closing bracket ([2026], [20,000], [8 to 18]). Tailwind values like [40px] or [16/10]
are code, not copy, and are skipped.
"""
import os, re, sys, datetime

PAT = re.compile(r"(?<![\w.\])\)])\[[^\]\n]{1,220}\]")  # not an index, a type, a call result, or a chained bracket
IS_COPY = re.compile(r"^\[(?:[A-Z₦$]|\d[\d,]*(?:\]|\s))")
IS_ARRAY = re.compile(r"^\[\d+(?:, \d+)+\]$")  # a numeric array literal, not copy

def find():
    rows = []
    for base in ("app", "components"):
        for root, _, files in os.walk(base):
            for f in files:
                if not f.endswith((".tsx", ".ts")) or ".test." in f:
                    continue
                p = os.path.join(root, f)
                for n, line in enumerate(open(p, encoding="utf-8"), 1):
                    for m in PAT.finditer(line):
                        if IS_COPY.match(m.group(0)) and not IS_ARRAY.match(m.group(0)):
                            rows.append((p, n, m.group(0)))
    return sorted(rows)

def write_doc(rows, path="docs/pre-launch-brackets.md"):
    by_file = {}
    for p, n, s in rows:
        by_file.setdefault(p, []).append((n, s))
    out = [
        "# Pre-launch: fill or cut every bracket",
        "",
        "The copy deck's checklist: \"Fill or cut every bracket. Empty brackets on a live site are worse than a shorter page, and both funders will click through.\" Every bracketed placeholder still in rendered copy, by file and line, generated "
        + datetime.date.today().isoformat()
        + ". Regenerate with `python3 scripts/list-brackets.py --write`.",
        "",
    ]
    for p in sorted(by_file):
        out.append(f"## `{p}`")
        out += [f"- line {n}: `{s}`" for n, s in by_file[p]]
        out.append("")
    out.append(f"Total: {len(rows)} placeholders in {len(by_file)} files.")
    open(path, "w", encoding="utf-8").write("\n".join(out) + "\n")

if __name__ == "__main__":
    rows = find()
    if "--write" in sys.argv:
        write_doc(rows)
    else:
        for p, n, s in rows:
            print(f"{p}:{n}: {s}")
    print(f"# {len(rows)} placeholders in {len({p for p, _, _ in rows})} files", file=sys.stderr)
