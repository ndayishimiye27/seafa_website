import sys,json,shutil
from pathlib import Path
sys.path.insert(0,str(Path('tmp/pdf-tools').resolve()))
import pymupdf as fitz
src=Path(sys.argv[1]) if len(sys.argv) > 1 else Path('public/book/newsletter-seafa.pdf')
doc=fitz.open(src)
out=Path('public/book');out.mkdir(exist_ok=True)
if src.resolve() != (out/'newsletter-seafa.pdf').resolve():
 shutil.copyfile(src,out/'newsletter-seafa.pdf')
pages=[]
for i,p in enumerate(doc):
 blocks=[b for b in p.get_text('blocks') if b[6]==0]
 blocks.sort(key=lambda b:(int(b[0]//(p.rect.width/3)),b[1]))
 paragraphs=[b[4].strip() for b in blocks if b[4].strip()!=str(i+1)]
 pix=p.get_pixmap(matrix=fitz.Matrix(2,2));pix.save(str(out/f'page-{i+1}.jpg'))
 pages.append({'number':i+1,'paragraphs':paragraphs,'width':pix.width,'height':pix.height})
Path('src/data/interview-book.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2),encoding='utf-8')
print('Rendered',len(pages),'pages')
