import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        await page.goto('http://localhost:8000')
        await page.wait_for_timeout(500)
        
        # Click on "Guide Didattiche" (Tempio dell'Oracolo)
        await page.evaluate("EroiApp.switchView('view-guides')")
        await page.wait_for_timeout(500)
        
        # Click on "Il viaggio" in the sidebar
        await page.evaluate("document.evaluate(\"//div[contains(text(), 'Il viaggio')]\", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()")
        await page.wait_for_timeout(500)
        
        await page.screenshot(path='artifacts/screenshot_theme.png')
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
