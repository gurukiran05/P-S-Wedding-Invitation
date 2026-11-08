const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Mobile viewport
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2, // Retina
  });

  console.log('Navigating to template...');
  await page.goto('http://localhost:3000/templates/wedding-1', { waitUntil: 'load' });

  console.log('Waiting for React to mount and render...');
  await new Promise(r => setTimeout(r, 3000));

  // Hide the custom cursor if it's visible
  await page.evaluate(() => {
    const cursor = document.querySelector('.cursor-dot');
    if (cursor) cursor.style.display = 'none';
  });

  console.log('Clicking wax seal to open envelope...');
  await page.waitForSelector('#waxSeal');
  await page.click('#waxSeal');

  // Wait for the envelope opening animation to finish (at least 2000ms)
  await new Promise(r => setTimeout(r, 2500));

  console.log('Capturing main cover...');
  await page.screenshot({ path: 'src/assets/real-wedding-main.png' });

  console.log('Scrolling to details...');
  // Scroll down a bit to capture details/schedule
  await page.evaluate(() => window.scrollBy(0, 1000));
  // Wait a second for animations/scroll
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'src/assets/real-wedding-left.png' });

  console.log('Scrolling to RSVP...');
  // Scroll down more to capture RSVP
  await page.evaluate(() => window.scrollBy(0, 2000));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'src/assets/real-wedding-right.png' });

  await browser.close();
  console.log('Done!');
})();
