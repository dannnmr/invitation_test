const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/components/sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace background in section tags
  content = content.replace(/(<section[^>]*backgroundColor:\s*['"])#ede5dd(['"])/g, '$1#fdfbf7$2');
  
  // Replace remaining exact hex codes for backgrounds
  content = content.replace(/backgroundColor:\s*['"]#ede5dd['"]/gi, "backgroundColor: '#fdfbf7'");
  
  if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated', file);
  }
});
