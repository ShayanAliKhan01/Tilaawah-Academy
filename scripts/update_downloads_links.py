import os
import re

html_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "downloads.html"))

def main():
    print(f"Updating downloads links in: {html_path}")
    
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # We want to replace href="#" inside each of the 32 <div class="download-item swiss-card"> blocks.
    # Let's split by the card container to process them individually.
    card_marker = '<div class="download-item swiss-card">'
    parts = content.split(card_marker)
    
    if len(parts) != 33:
        print(f"Error: Expected 32 download cards, but found {len(parts) - 1} cards instead.")
        return
        
    new_parts = [parts[0]] # Header part
    
    # Process 30 Quran Paras
    for i in range(1, 31):
        part = parts[i]
        # Replace the first href="#" with href="assets/downloads/para_i.pdf"
        updated_part = part.replace('href="#"', f'href="assets/downloads/para_{i}.pdf"', 1)
        new_parts.append(updated_part)
        
    # Process Noorani Qaida (31st card)
    part_31 = parts[31]
    updated_part_31 = part_31.replace('href="#"', 'href="assets/downloads/noorani_qaida.pdf"', 1)
    new_parts.append(updated_part_31)
    
    # Process Tajweed Rules Guide (32nd card)
    part_32 = parts[32]
    updated_part_32 = part_32.replace('href="#"', 'href="assets/downloads/tajweed_rules.pdf"', 1)
    new_parts.append(updated_part_32)
    
    # Reassemble HTML
    new_content = card_marker.join(new_parts)
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print("Successfully updated downloads.html with correct PDF paths!")

if __name__ == "__main__":
    main()
