import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto('http://localhost:8000')
        
        # Inject JavaScript to forcibly show view-admin-dashboard like an admin
        await page.evaluate("""() => {
            document.body.classList.add('logged-in');
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.getElementById('view-admin-dashboard').classList.add('active');
            document.getElementById('view-admin-dashboard').style.display = 'flex';
            document.getElementById('app-header').style.display = 'flex';
            document.getElementById('main-layout').style.marginTop = '70px';
        }""")
        
        # Wait a bit for CSS to settle
        await page.wait_for_timeout(1000)
        
        # Run evaluation to get bounding boxes and computed styles
        res = await page.evaluate("""() => {
            function getInfo(selector) {
                const el = document.querySelector(selector);
                if (!el) return null;
                const rect = el.getBoundingClientRect();
                const style = window.getComputedStyle(el);
                return {
                    tag: el.tagName,
                    id: el.id,
                    className: el.className,
                    rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
                    computed: {
                        marginTop: style.marginTop,
                        paddingTop: style.paddingTop,
                        display: style.display,
                        flexDirection: style.flexDirection,
                        justifyContent: style.justifyContent,
                        alignItems: style.alignItems
                    }
                };
            }
            
            return {
                header: getInfo('.app-header'),
                main: getInfo('.main-content'),
                view: getInfo('#view-admin-dashboard'),
                glassPanel: getInfo('#view-admin-dashboard > .glass-panel'),
                title: getInfo('#view-admin-dashboard > .glass-panel > h2.section-title')
            };
        }""")
        
        print("DOM Info:")
        import json
        print(json.dumps(res, indent=2))
        
        await browser.close()

asyncio.run(main())
