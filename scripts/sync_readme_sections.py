#!/usr/bin/env python3
"""
sync_readme_sections.py

Copies marked sections from a source README into a destination README.

Usage:
    python3 sync_readme_sections.py <source_readme> <dest_readme> --sections CONSTANTS FUNCTIONS

Each section is delimited in both files by HTML comments:
    <!-- SECTION_START --> ... <!-- SECTION_END -->

The script replaces the content between the destination's markers with the
content from the source's markers (markers themselves are preserved).
"""

import sys
import re
import argparse


def extract_section(text: str, name: str) -> str | None:
    """Extract content between <!-- NAME_START --> and <!-- NAME_END --> markers."""
    start_marker = f"<!-- {name}_START -->"
    end_marker = f"<!-- {name}_END -->"
    start = text.find(start_marker)
    end = text.find(end_marker)
    if start == -1 or end == -1:
        return None
    # Return content between markers (exclusive)
    return text[start + len(start_marker):end]


def inject_section(text: str, name: str, content: str) -> str:
    """Replace content between markers in destination text."""
    start_marker = f"<!-- {name}_START -->"
    end_marker = f"<!-- {name}_END -->"
    start = text.find(start_marker)
    end = text.find(end_marker)
    if start == -1 or end == -1:
        print(f"  WARNING: markers for {name} not found in destination, skipping")
        return text
    return text[:start + len(start_marker)] + content + text[end:]


def main() -> int:
    parser = argparse.ArgumentParser(description="Sync README sections from Nero to Everett")
    parser.add_argument("source", help="Source README file (Nero's)")
    parser.add_argument("dest", help="Destination README file (Everett's)")
    parser.add_argument("--sections", nargs="+", default=["CONSTANTS", "FUNCTIONS"],
                        help="Section names to sync (default: CONSTANTS FUNCTIONS)")
    args = parser.parse_args()

    with open(args.source, "r", encoding="utf-8") as f:
        source = f.read()
    with open(args.dest, "r", encoding="utf-8") as f:
        dest = f.read()

    changed = 0
    for section in args.sections:
        content = extract_section(source, section)
        if content is None:
            print(f"  WARNING: section {section} not found in source {args.source}")
            continue
        new_dest = inject_section(dest, section, content)
        if new_dest != dest:
            print(f"  ✓ Synced section: {section}")
            dest = new_dest
            changed += 1
        else:
            print(f"  = No change: {section}")

    if changed > 0:
        with open(args.dest, "w", encoding="utf-8") as f:
            f.write(dest)
        print(f"Wrote {args.dest}")
    else:
        print("No changes made.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
