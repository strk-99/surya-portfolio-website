from PIL import Image, ImageChops
import sys

def process_image(input_path, output_path):
    try:
        img = Image.open(input_path)
        
        # 1. Handle Transparency -> White
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            alpha = img.convert('RGBA').split()[-1]
            bg = Image.new("RGB", img.size, (255, 255, 255))
            bg.paste(img.convert('RGB'), mask=alpha)
            img = bg
        else:
            img = img.convert("RGB")

        # 2. Trim White Borders (Autocrop)
        bg = Image.new(img.mode, img.size, img.getpixel((0,0)))
        diff = ImageChops.difference(img, bg)
        diff = ImageChops.add(diff, diff, 2.0, -100)
        bbox = diff.getbbox()
        if bbox:
            img = img.crop(bbox)
            print(f"Trimmed borders to: {bbox}")
        
        # 3. Resize - Preserve Aspect Ratio
        # Target width 400px (standard for portrait on web), let height adapt
        target_width = 400
        w_percent = (target_width / float(img.size[0]))
        h_size = int((float(img.size[1]) * float(w_percent)))
        
        img = img.resize((target_width, h_size), Image.Resampling.LANCZOS)
            
        img.save(output_path, quality=95)
        print(f"Successfully processed image to {output_path} (Size: {target_width}x{h_size})")
        
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python process_profile.py <input> <output>")
    else:
        process_image(sys.argv[1], sys.argv[2])
