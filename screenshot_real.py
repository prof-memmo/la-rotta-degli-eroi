import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        await page.goto('http://localhost:8000')
        
        # We simulate the exact logic from app.js to login as admin
        await page.evaluate("""() => {
            // Mock Auth.getUser
            window.Auth = {
                getUser: () => ({ email: 'prof.memmo@gmail.com', role: 'admin', name: 'Prof Memmo', uid: 'admin123', setupComplete: true }),
                isLoggedIn: () => true
            };
            
            // Trigger EroiApp to update
            window.EroiApp.checkSession();
            
            // Navigate to admin dashboard
            window.EroiApp.navigateTo('view-admin-dashboard');
        }""")
        
        await page.wait_for_timeout(2000)
        
        # Take screenshot
        await page.screenshot(path="/Users/guglielmopiersanti/.gemini/antigravity-ide/brain/6f6b8d83-b2ae-4e3c-a7c2-fa70910773bc/screenshot_admin_real.png")
        
        # Get position of elements
        res = await page.evaluate("""() => {
            function getInfo(el) {
                if (!el) return null;
                const rect = el.getBoundingClientRect();
                const style = window.getComputedStyle(el);
                return {
                    id: el.id || el.tagName,
                    top: rect.top,
                    height: rect.height,
                    marginTop: style.marginTop,
                    paddingTop: style.paddingTop,
                    display: style.display,
                    justifyContent: style.justifyContent
                };
            }
            
            return {
                header: getInfo(document.querySelector('.app-header')),
                main: getInfo(document.querySelector('.main-content')),
                view: getInfo(document.getElementById('view-admin-dashboard')),
                glass: getInfo(document.querySelector('#view-admin-dashboard .glass-panel')),
                title: getInfo(document.querySelector('#view-admin-dashboard h2.section-title'))
            };
        }""")
        
        import json
        print(json.dumps(res, indent=2))
        
        await browser.close()

asyncio.run(main())
