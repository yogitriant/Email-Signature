import os
from PIL import Image, ImageDraw, ImageFont

configs = [
    { 'dir': 'BINA NUSANTARA', 'text': 'www.binus.edu', 'mr': 98 },
    { 'dir': 'BINUS University', 'text': 'www.binus.ac.id', 'mr': 90 },
    { 'dir': 'BINUS School', 'text': 'www.binus.sch.id', 'mr': 85 }
]

sizes = ['600', '450', '320']

try:
    font = ImageFont.truetype('arialbd.ttf', 64)
except:
    try:
        font = ImageFont.truetype('C:\\Windows\\Fonts\\arialbd.ttf', 64)
    except:
        font = ImageFont.load_default()

for c in configs:
    for sz in sizes:
        fname = f"{c['dir'].split(' ')[0][0]}{c['dir'].split(' ')[-1][0]}_{sz} supergraphic.png"
        if c['dir'] == 'BINA NUSANTARA': fname = f"BN_{sz} supergraphic.png"
        elif c['dir'] == 'BINUS University': fname = f"BU_{sz} supergraphic.png"
        elif c['dir'] == 'BINUS School': fname = f"BS_{sz} supergraphic.png"
        
        path = os.path.join('Asset Image', c['dir'], fname)
        if not os.path.exists(path): continue
        
        img = Image.open(path).convert('RGBA')
        draw = ImageDraw.Draw(img)
        
        ratio = img.width / 200
        right_margin = c['mr'] * ratio
        
        bbox = draw.textbbox((0, 0), c['text'], font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = img.width - right_margin - text_width
        y = (img.height - text_height) / 2 - 10
        
        draw.text((x, y), c['text'], fill=(255, 255, 255, 255), font=font)
        
        out_path = os.path.join('Asset Image', c['dir'], fname.replace('.png', '_with_text.png'))
        img.save(out_path)
