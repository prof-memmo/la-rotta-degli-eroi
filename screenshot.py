import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        await page.goto('http://localhost:8000')
        
        await page.evaluate("""() => {
            document.body.classList.add('logged-in');
            document.querySelectorAll('.view').forEach(v => {
                v.classList.remove('active');
                v.style.display = '';
            });
            const v = document.getElementById('view-admin-dashboard');
            v.classList.add('active');
            v.style.display = 'flex';
            document.getElementById('app-header').style.display = 'flex';
            document.getElementById('main-layout').style.marginTop = '';
        }""")
        await page.wait_for_timeout(1000)
        
        await page.screenshot(path="artifacts/screenshot_admin.png")
        await browser.close()

asyncio.run(main())
