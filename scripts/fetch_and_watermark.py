import os
import requests
import fitz  # PyMuPDF

# Configuration
DOWNLOADS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "downloads"))
os.makedirs(DOWNLOADS_DIR, exist_ok=True)

# List of files to fetch and process
# Format: (download_url, output_filename)
FILES_TO_PROCESS = []

# 1. 30 Paras (Juz) of Quran
for i in range(1, 31):
    para_str = f"{i:02d}"
    url = f"https://archive.org/download/quran_para_no._1_to_30_aks/para_no._{para_str}_aks.pdf"
    filename = f"para_{i}.pdf"
    FILES_TO_PROCESS.append((url, filename))

# 2. Noorani Qaida
qaida_url = "https://archive.org/download/NooraniQaida_201701/Noorani%20Qaida.pdf"
FILES_TO_PROCESS.append((qaida_url, "noorani_qaida.pdf"))

# 3. Tajweed Rules Guide
tajweed_url = "https://archive.org/download/en_Tajweed_Rules_of_the_Quran_Part_01/en_Tajweed_Rules_of_the_Quran_Part_01.pdf"
FILES_TO_PROCESS.append((tajweed_url, "tajweed_rules.pdf"))

def add_watermark(input_path, output_path):
    """
    Opens a PDF, adds a light, semi-transparent 'Tilaawah Academy' watermark
    to the corner of each page, and saves it.
    """
    try:
        doc = fitz.open(input_path)
        for page in doc:
            rect = page.rect
            # Position at bottom-right corner, inset by some margins
            # Watermark text
            text = "Tilaawah Academy"
            
            # Using soft gray/gold color (R=212, G=175, B=55 for soft gold, normalized: 0.83, 0.68, 0.21)
            # Or very light gray so it's super unobtrusive (0.75, 0.75, 0.75)
            color = (0.75, 0.75, 0.75)
            
            # Font size
            fontsize = 9
            
            # Place in bottom-right
            # Calculate length of text approximately to align right
            text_width = fitz.get_text_length(text, fontname="helv", fontsize=fontsize)
            x = rect.width - text_width - 25
            y = rect.height - 15
            
            # Add watermark text
            page.insert_text(
                fitz.Point(x, y), 
                text, 
                fontsize=fontsize, 
                color=color, 
                fontname="helv",
                fill_opacity=0.45  # semi-transparent
            )
            
            # Place also a subtle watermark in the bottom-left corner
            page.insert_text(
                fitz.Point(25, y), 
                "tilaawah.com", 
                fontsize=fontsize - 1, 
                color=color, 
                fontname="helv",
                fill_opacity=0.45
            )
            
        doc.save(output_path)
        doc.close()
        print(f"Successfully watermarked and saved to: {output_path}")
        return True
    except Exception as e:
        print(f"Error watermarking {input_path}: {e}")
        return False

def download_file(url, temp_path):
    """
    Downloads a file with status indication
    """
    print(f"Downloading: {url}")
    try:
        response = requests.get(url, stream=True, timeout=30)
        if response.status_code == 200:
            with open(temp_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
            print(f"Downloaded successfully.")
            return True
        else:
            print(f"Failed to download. Status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

def main():
    print(f"Starting PDF fetch and watermark process...")
    print(f"Target Directory: {DOWNLOADS_DIR}")
    
    temp_dir = os.path.join(DOWNLOADS_DIR, "temp")
    os.makedirs(temp_dir, exist_ok=True)
    
    success_count = 0
    
    for url, filename in FILES_TO_PROCESS:
        temp_path = os.path.join(temp_dir, filename)
        final_path = os.path.join(DOWNLOADS_DIR, filename)
        
        # Check if file is already processed to prevent duplicate heavy work
        if os.path.exists(final_path):
            print(f"File already exists, skipping: {filename}")
            success_count += 1
            continue
            
        # Download
        if download_file(url, temp_path):
            # Watermark and Save
            if add_watermark(temp_path, final_path):
                success_count += 1
            # Clean up temp file
            if os.path.exists(temp_path):
                os.remove(temp_path)
        else:
            print(f"Skipping watermarking for {filename} due to download failure.")
            
    # Clean up temp directory
    try:
        os.rmdir(temp_dir)
    except Exception:
        pass
        
    print(f"\nProcess finished! Successfully processed {success_count}/{len(FILES_TO_PROCESS)} files.")

if __name__ == "__main__":
    main()
