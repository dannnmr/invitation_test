const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/components/sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace background in section tags
  content = content.replace(/(<section[^>]*backgroundColor:\s*['"])[^'"]+(['"])/g, '$1#ede5dd$2');
  
  // Replace remaining exact hex codes for backgrounds
  content = content.replace(/backgroundColor:\s*['"]#(fdfbf7|eef2f5|0a0a0a|000|181818|1a1a1a)['"]/gi, "backgroundColor: '#ede5dd'");
  
  // Specific replacements for text color that was #fff on #000 backgrounds
  if (file === 'ParentsSection.tsx') {
      content = content.replace(/color:\s*['"]#fff['"]/g, "color: '#111'");
      content = content.replace(/color:\s*['"]var\(--color-cream\)['"]/g, "color: '#111'");
  }
  if (file === 'CountdownSection.tsx') {
      content = content.replace(/color:\s*['"]#fff['"]/g, "color: '#111'");
      content = content.replace(/color:\s*['"]#e5e5e5['"]/g, "color: '#111'");
      content = content.replace(/color:\s*['"]var\(--color-cream\)['"]/g, "color: '#111'");
      content = content.replace(/backgroundColor:\s*['"]#1c1c1c['"]/g, "backgroundColor: '#fff'"); // FlipDigit bg
      content = content.replace(/backgroundColor:\s*['"]#222['"]/g, "backgroundColor: '#f5f5f5'"); // FlipDigit bg
      content = content.replace(/backgroundColor:\s*['"]#181818['"]/g, "backgroundColor: '#eee'"); // FlipDigit bg
  }
  if (file === 'SaveTheDateSection.tsx') {
      content = content.replace(/color:\s*['"]var\(--color-cream\)['"]/g, "color: '#111'");
      content = content.replace(/color:\s*['"]#fff['"]/g, "color: '#111'");
  }
  if (file === 'ItinerarySection.tsx') {
      content = content.replace(/color:\s*['"]#fff['"]/g, "color: '#111'");
      content = content.replace(/color:\s*['"]var\(--color-cream\)['"]/g, "color: '#111'");
  }
  if (file === 'RSVPSection.tsx') {
      content = content.replace(/color:\s*['"]#fff['"]/g, "color: '#111'");
      content = content.replace(/color:\s*['"]var\(--color-cream\)['"]/g, "color: '#111'");
  }
  
  if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated', file);
  }
});
