import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import ffmpegStatic from 'ffmpeg-static';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function record() {
  console.log("Starting vite server...");
  const vite = spawn('npm', ['run', 'dev'], { shell: true, stdio: 'ignore' });
  
  await delay(5000); // Wait for vite to spin up
  
  console.log("Launching puppeteer...");
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  const Config = {
    followNewTab: false,
    fps: 30,
    ffmpeg_Path: ffmpegStatic,
    videoFrame: { width: 1440, height: 900 },
    aspectRatio: '16:10',
  };
  
  // ==========================================
  // 1. RECORD SITE VIDEO
  // ==========================================
  console.log("Recording Site Video...");
  const siteRecorder = new PuppeteerScreenRecorder(page, Config);
  await siteRecorder.start('./public/assets/site_demo.mp4');
  
  // Assuming Vite uses 5173 by default
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await delay(2000); // wait for initial animations
  
  // Scroll to show everything smoothly
  await page.evaluate(async () => {
    await new Promise((resolve) => {
        let totalHeight = 0;
        let distance = 50;
        let timer = setInterval(() => {
            let scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if(totalHeight >= scrollHeight - window.innerHeight + 100){
                clearInterval(timer);
                resolve();
            }
        }, 150);
    });
  });
  
  await delay(2000);
  await siteRecorder.stop();
  console.log("Site video saved to public/assets/site_demo.mp4");
  
  // ==========================================
  // 2. RECORD TERMINAL SIMULATION VIDEO
  // ==========================================
  console.log("Recording Terminal Simulation Video...");
  // Make viewport smaller to focus on terminals
  await page.setViewport({ width: 1200, height: 600 });
  
  const terminalConfig = {
    ...Config,
    videoFrame: { width: 1200, height: 600 },
  };
  const terminalRecorder = new PuppeteerScreenRecorder(page, terminalConfig);
  
  await page.reload({ waitUntil: 'networkidle0' });
  await delay(500);
  
  // Scroll strictly to the terminals section
  await page.evaluate(() => {
    const el = document.getElementById('secops-terminals');
    if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'center' });
        // Optionally scale it up a bit or add an overlay for cool effect
    }
  });
  
  await terminalRecorder.start('./public/assets/terminal_demo.mp4');
  await delay(12000); // Wait 12 seconds to capture the terminal typing animations properly
  await terminalRecorder.stop();
  console.log("Terminal video saved to public/assets/terminal_demo.mp4");
  
  await browser.close();
  vite.kill();
  console.log("All done!");
  process.exit(0);
}

record().catch(err => {
    console.error(err);
    process.exit(1);
});
