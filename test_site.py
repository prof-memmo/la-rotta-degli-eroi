from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("file:///Users/guglielmopiersanti/.gemini/antigravity-ide/scratch/eroi-in-viaggio/index.html")
        time.sleep(5)
        # Dump all div IDs and classes to see what is visible
        elements = page.query_selector_all("div")
        print("DIVS:")
        for el in elements:
            print(f"ID: {el.get_attribute('id')}, CLASS: {el.get_attribute('class')}")
        
        print("\n\nBODY HTML:")
        print(page.inner_html("body")[:1000])
        browser.close()

if __name__ == "__main__":
    run()
