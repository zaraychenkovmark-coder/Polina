import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function copyDir(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const files = readdirSync(src);
  files.forEach(file => {
    const srcPath = join(src, file);
    const destPath = join(dest, file);
    
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  });
}

// Копируем img в public/img
if (existsSync('img')) {
  copyDir('img', 'public/img');
  console.log('✓ Copied img/ to public/img/');
} else {
  console.log('⚠ img/ directory not found');
}

// Копируем trap в public/trap
if (existsSync('trap')) {
  copyDir('trap', 'public/trap');
  console.log('✓ Copied trap/ to public/trap/');
} else {
  console.log('⚠ trap/ directory not found');
}

console.log('\n✓ All assets copied successfully!');

