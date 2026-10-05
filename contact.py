import sys,glob,math
from PIL import Image
fs=sys.argv[2:]; out=sys.argv[1]; W=300
th=[]
for f in fs:
    im=Image.open(f).convert('RGB'); th.append(im.resize((W,int(W*im.height/im.width))))
cols=len(th); H=max(t.height for t in th)
S=Image.new('RGB',(cols*(W+10),H),'white')
for i,t in enumerate(th): S.paste(t,(i*(W+10),0))
S.save(out)
