import sharp from "sharp";
import { mkdirSync } from "node:fs";
const pages=["home","work","services","about","contact-direct","work-vanta","work-nexa","work-form27","work-ember","work-atelier","work-sova"];
mkdirSync("artifacts/integration/review",{recursive:true});
for(const width of [375,390,430,768,1024,1440]){
  const cardWidth=500;const imageHeight=Math.round(950*cardWidth/width);const rowHeight=imageHeight+38;const overlays=[];
  for(let i=0;i<pages.length;i++){
    const meta=await sharp(`artifacts/integration/responsive/${pages[i]}-${width}.png`).metadata();const height=Math.min(950,meta.height);
    const buffer=await sharp(`artifacts/integration/responsive/${pages[i]}-${width}.png`).extract({left:0,top:0,width,height}).resize(cardWidth,imageHeight,{fit:"contain",background:"#f8f8f5"}).png().toBuffer();
    const left=(i%2)*(cardWidth+20);const top=Math.floor(i/2)*rowHeight;
    const label=Buffer.from(`<svg width="500" height="30"><rect width="500" height="30" fill="#191c20"/><text x="10" y="20" font-family="Arial" font-size="13" fill="white">${pages[i]} / ${width}px</text></svg>`);
    overlays.push({input:label,left,top},{input:buffer,left,top:top+30});
  }
  await sharp({create:{width:1020,height:rowHeight*Math.ceil(pages.length/2),channels:4,background:"#dedfd9"}}).composite(overlays).png().toFile(`artifacts/integration/review/pages-${width}.png`);
}
console.log("Six visual-review boards generated from the eleven page types.");
