import json
from PIL import Image, ImageDraw, ImageFilter
W,H=1920,1080
def smooth(pts, n=30):
    P=[pts[0]]+pts+[pts[-1]]; poly=[]; d=f"M{pts[0][0]:.0f} {pts[0][1]:.0f}"
    for i in range(1,len(P)-2):
        p0,p1,p2,p3=P[i-1],P[i],P[i+1],P[i+2]
        c1=(p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6); c2=(p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6)
        d+=f" C{c1[0]:.0f} {c1[1]:.0f} {c2[0]:.0f} {c2[1]:.0f} {p2[0]:.0f} {p2[1]:.0f}"
        for k in range(n):
            t=k/n;a=(1-t)**3;b=3*(1-t)**2*t;c=3*(1-t)*t*t;e=t**3
            poly.append((a*p1[0]+b*c1[0]+c*c2[0]+e*p2[0],a*p1[1]+b*c1[1]+c*c2[1]+e*p2[1]))
    poly.append(pts[-1]); x0,x1=pts[0][0],pts[-1][0]
    d+=f" L{x1:.0f} {H} L{x0:.0f} {H} Z"
    return d,poly+[(x1,H),(x0,H)]
L=[('far','#c1d284',[(-20,520),(260,470),(560,500),(820,455),(1120,480),(1420,430),(1700,470),(1940,450)]),
   ('water','#0480bc',None),
   ('left','#8dba08',[(-20,560),(220,580),(520,640),(820,700),(1000,742),(1080,800),(1100,1000)]),
   ('right','#79a40a',[(700,1000),(900,770),(1100,720),(1380,640),(1640,590),(1940,575)]),
   ('near','#5f8a0c',[(-20,930),(400,900),(900,945),(1400,905),(1940,935)])]
S=2; im=Image.new('RGB',(W*S,H*S)); dr=ImageDraw.Draw(im)
top=(0xa6,0xd6,0xf0); low=(0xf3,0xe7,0xc8)
for y in range(H*S):
    t=min(1,y/(H*S*.45)); dr.line([(0,y),(W*S,y)],fill=tuple(int(top[i]+(low[i]-top[i])*t*t) for i in range(3)))
g=Image.new('L',(W*S,H*S),0); ImageDraw.Draw(g).ellipse([1240*S,330*S,1440*S,530*S],fill=255)
im.paste((255,246,222),mask=g.filter(ImageFilter.GaussianBlur(70*S))); im.paste((255,252,240),mask=g.filter(ImageFilter.GaussianBlur(4*S)))
out={}
TRIM={'left':(0,-2),'right':(1,None)}
def line_d(pts):
    P=[pts[0]]+pts+[pts[-1]]; d=f"M{pts[0][0]:.0f} {pts[0][1]:.0f}"
    for i in range(1,len(P)-2):
        p0,p1,p2,p3=P[i-1],P[i],P[i+1],P[i+2]
        c1=(p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6); c2=(p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6)
        d+=f" C{c1[0]:.0f} {c1[1]:.0f} {c2[0]:.0f} {c2[1]:.0f} {p2[0]:.0f} {p2[1]:.0f}"
    return d
for name,col,pts in L:
    if pts is None: d=f"M0 690 L{W} 690 L{W} {H} L0 {H} Z"; poly=[(0,690),(W,690),(W,H),(0,H)]
    else: d,poly=smooth(pts)
    dr.polygon([(x*S,y*S) for x,y in poly],fill=col); out[name]={'fill':col,'d':d}
    if pts: a,b=TRIM.get(name,(0,None)); out[name]['line']=line_d(pts[a:b])
im=im.resize((W,H),Image.LANCZOS); im.save('threshold-frame.jpg',quality=93)
json.dump({'w':W,'h':H,'sun':[1340,430,100],'layers':out},open('../src/threshold.json','w'))
