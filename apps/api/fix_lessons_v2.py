#!/usr/bin/env python3
"""
Fix lesson seed files by properly parsing and reordering VALUES.
"""

import re

def extract_values_from_insert(insert_block):
    """Extract individual values from an INSERT...VALUES block."""
    # Find the VALUES section
    values_match = re.search(r'VALUES\s*\((.*)\);', insert_block, re.DOTALL)
    if not values_match:
        raise ValueError("Could not find VALUES section")

    values_section = values_match.group(1)

    # We need to extract the first 11 simple values, then the JSONB (which starts with '{')
    # Values 1-4: Four quoted strings (title_en, title_ru, description_en, description_ru)
    # Values 5: Quoted string (level: 'A1', 'A2', etc.)
    # Values 6-8: Three integers (lesson_number, unit_number, order_in_unit)
    # Values 9-10: Two integers (estimated_duration, xp_reward)
    # Value 11: Boolean (is_published)
    # Value 12: JSONB object (exercises)

    # Use regex to find quoted strings and numbers
    pattern = r"""
        ('[^']*(?:''[^']*)*')|  # Match single-quoted strings (with escaped quotes)
        (\d+)|                   # Match integers
        (true|false)|            # Match booleans
        (\{)                     # Match start of JSONB
    """

    values = []
    jsonb_start = None

    for match in re.finditer(pattern, values_section, re.VERBOSE):
        if match.group(4):  # Start of JSONB
            # Find where JSONB starts in the original text
            jsonb_start = match.start()
            break
        elif match.group(1):  # Quoted string
            values.append(match.group(1))
        elif match.group(2):  # Integer
            values.append(match.group(2))
        elif match.group(3):  # Boolean
            values.append(match.group(3))

    # Extract the JSONB part (from '{' to end, before ');')
    if jsonb_start is not None:
        jsonb_content = values_section[jsonb_start:].rstrip()
        # Remove trailing comma if present before );
        if jsonb_content.endswith(','):
            jsonb_content = jsonb_content[:-1]
        values.append(jsonb_content)

    return values

def reorder_values(values):
    """Reorder values to match correct column order."""
    if len(values) != 12:
        raise ValueError(f"Expected 12 values, got {len(values)}")

    # Current order: title_en, title_ru, desc_en, desc_ru, level, lesson#, unit#, order#, duration, xp, published, exercises
    # Indices:       0         1         2        3        4      5        6      7       8         9   10         11

    # Correct order: level, lesson#, unit#, order#, title_en, title_ru, desc_en, desc_ru, duration, xp, published, exercises
    # New indices:   4      5        6      7       0         1         2        3        8         9   10         11

    reordered = [
        values[4],   # level
        values[5],   # lesson_number
        values[6],   # unit_number
        values[7],   # order_in_unit
        values[0],   # title_en
        values[1],   # title_ru
        values[2],   # description_en
        values[3],   # description_ru
        values[8],   # estimated_duration
        values[9],   # xp_reward
        values[10],  # is_published
        values[11],  # exercises (JSONB)
    ]

    return reordered

def format_insert_statement(comment, reordered_values):
    """Format the INSERT statement with reordered values."""
    result = []

    if comment:
        result.append(comment)

    result.append("INSERT INTO lessons (")
    result.append("  level, lesson_number, unit_number, order_in_unit,")
    result.append("  title_en, title_ru, description_en, description_ru,")
    result.append("  estimated_duration, xp_reward, is_published, exercises")
    result.append(") VALUES (")

    # Add the simple values (0-10)
    for i in range(11):
        result.append(f"  {reordered_values[i]},")

    # Add the JSONB (indented properly if it's multiline)
    jsonb = reordered_values[11]
    if '\n' in jsonb:
        # Multiline JSONB
        jsonb_lines = jsonb.split('\n')
        result.append("  " + jsonb_lines[0])
        for line in jsonb_lines[1:]:
            result.append("  " + line)
    else:
        result.append("  " + jsonb)

    result.append(");")
    result.append("")  # Blank line after each lesson

    return '\n'.join(result)

def fix_lesson_file(input_file, output_file):
    """Fix a lesson seed file."""
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into individual INSERT blocks
    # Pattern: comment lines + INSERT statement
    blocks = re.split(r'(-- Lesson \d+:.*?\n)', content)

    output = []
    output.append("-- Fixed lesson seed data\n")

    for i in range(1, len(blocks), 2):
        if i >= len(blocks):
            break

        comment = blocks[i].strip()
        if i + 1 < len(blocks):
            insert_text = blocks[i + 1]

            try:
                # Extract and reorder values
                values = extract_values_from_insert(insert_text)
                reordered = reorder_values(values)

                # Format the INSERT statement
                formatted = format_insert_statement(comment, reordered)
                output.append(formatted)
            except Exception as e:
                print(f"Warning: Error processing block starting with '{comment}': {e}")
                # Keep original if we can't parse it
                output.append(comment)
                output.append(insert_text)

    # Write output
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(output))

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
