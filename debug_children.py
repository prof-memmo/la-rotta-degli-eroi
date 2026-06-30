import asyncio
from playwright.async_api import async_playwright
import json

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto('http://localhost:8000')
        
        await page.evaluate("""() => {
            document.body.classList.add('logged-in');
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.getElementById('view-admin-dashboard').classList.add('active');
            document.getElementById('view-admin-dashboard').style.display = 'flex';
            document.getElementById('app-header').style.display = 'flex';
            document.getElementById('main-layout').style.marginTop = '70px';
        }""")
        await page.wait_for_timeout(1000)
        
        res = await page.evaluate("""() => {
            const main = document.querySelector('.main-content');
            const children = Array.from(main.children);
            return children.map(c => {
                const rect = c.getBoundingClientRect();
                const style = window.getComputedStyle(c);
                return {
                    id: c.id,
                    className: c.className,
                    display: style.display,
                    height: rect.height,
                    top: rect.top
                };
            }).filter(c => c.height > 0);
        }""")
        
        print("Visible children of .main-content:")
        print(json.dumps(res, indent=2))
        await browser.close()

asyncio.run(main())
