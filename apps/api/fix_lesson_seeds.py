#!/usr/bin/env python3
"""
Fix lesson seed files by reordering VALUES to match column order.

The column order is:
  level, lesson_number, unit_number, order_in_unit,
  title_en, title_ru, description_en, description_ru,
  estimated_duration, xp_reward, is_published, exercises

But current VALUES order is:
  title_en, title_ru, description_en, description_ru,
  level, lesson_number, unit_number, order_in_unit,
  estimated_duration, xp_reward, is_published, exercises

We need to reorder: move positions 5-8 to positions 1-4.
"""

import re
import sys

def fix_lesson_file(input_file, output_file):
    """Fix a single lesson seed file."""
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match INSERT INTO lessons ... VALUES ( ... );
    # We'll process line by line to extract the values
    lines = content.split('\n')

    fixed_lines = []
    in_insert = False
    in_values = False
    values_buffer = []
    comment_buffer = []
    insert_header = []

    i = 0
    while i < len(lines):
        line = lines[i]

        # Check if this is a comment line before INSERT
        if line.strip().startswith('--') and not in_insert:
            comment_buffer.append(line)
            i += 1
            continue

        # Check if this starts an INSERT statement
        if 'INSERT INTO lessons' in line:
            in_insert = True
            insert_header = [line]
            i += 1
            continue

        # Collect INSERT header lines until VALUES
        if in_insert and not in_values:
            if 'VALUES' in line:
                in_values = True
                insert_header.append(line)
            else:
                insert_header.append(line)
            i += 1
            continue

        # Collect VALUES content
        if in_values:
            values_buffer.append(line)
            # Check if this line ends the VALUES (contains ');' or just ';')
            if line.strip().endswith(');') or (line.strip() == ';' and values_buffer):
                # Process this complete INSERT statement
                fixed_lines.extend(comment_buffer)
                fixed_lines.extend(insert_header)

                # Now parse and fix the values
                values_content = '\n'.join(values_buffer)

                # Extract the main values (before the JSONB)
                # The pattern is: VALUES ( val1, val2, ..., val8, val9, val10, val11, '{...}'... );

                # Try to extract using a simpler approach - find the values by counting lines
                value_lines = []
                for vline in values_buffer:
                    stripped = vline.strip()
                    if stripped and not stripped.startswith(')'):
                        value_lines.append(vline)

                # The structure should be:
                # Line 1: 'title_en',
                # Line 2: 'title_ru',
                # Line 3: 'description_en',
                # Line 4: 'description_ru',
                # Line 5: 'level',
                # Line 6: lesson_number,
                # Line 7: unit_number,
                # Line 8: order_in_unit,
                # Line 9: estimated_duration,
                # Line 10: xp_reward,
                # Line 11: is_published,
                # Lines 12+: JSONB content

                if len(value_lines) >= 11:
                    # Reorder: take lines 5-8 (level, lesson_number, unit, order) and move to front
                    reordered = []
                    reordered.extend(value_lines[4:8])  # level, lesson_number, unit_number, order_in_unit
                    reordered.extend(value_lines[0:4])  # title_en, title_ru, description_en, description_ru
                    reordered.extend(value_lines[8:])   # estimated_duration, xp_reward, is_published, exercises...

                    fixed_lines.extend(reordered)
                else:
                    # Fallback: just add as-is
                    fixed_lines.extend(values_buffer)

                # Reset state
                in_insert = False
                in_values = False
                values_buffer = []
                comment_buffer = []
                insert_header = []
            i += 1
            continue

        # Regular line (not part of INSERT)
        fixed_lines.append(line)
        i += 1

    # Write fixed content
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(fixed_lines))

    print(f"✓ Fixed {input_file} -> {output_file}")

def main():
    files_to_fix = [
        ('src/db/seeds/lessons.sql', 'src/db/seeds/lessons-fixed.sql'),
        ('src/db/seeds/lessons-b1.sql', 'src/db/seeds/lessons-b1-fixed.sql'),
        ('src/db/seeds/lessons-b2.sql', 'src/db/seeds/lessons-b2-fixed.sql'),
    ]

    for input_file, output_file in files_to_fix:
        try:
            fix_lesson_file(input_file, output_file)
        except Exception as e:
            print(f"✗ Error fixing {input_file}: {e}")
            import traceback
            traceback.print_exc()

    print("\nAll files processed!")

if __name__ == '__main__':
    main()
