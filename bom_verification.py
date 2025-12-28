
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Listen for all console events and print their text
        page.on("console", lambda msg: print(f"CONSOLE: {msg.text()}"))

        print("Navigating to http://localhost:8000/index.html#bom")
        try:
            await page.goto('http://localhost:8000/index.html#bom', wait_until='networkidle')
            print("Page loaded.")

            print("Waiting for BOM table to be populated...")
            await page.wait_for_selector('#bom-table-body tr', timeout=10000)
            print("BOM table found. Capturing screenshots.")

            # Capture screenshots
            await page.set_viewport_size({"width": 1280, "height": 800})
            await page.screenshot(path='bom_desktop_final.png')
            print("Desktop screenshot captured.")

            await page.set_viewport_size({"width": 375, "height": 667})
            await page.screenshot(path='bom_mobile_final.png')
            print("Mobile screenshot captured.")

        except Exception as e:
            print(f"\nAn error occurred: {e}")
        finally:
            await context.close()
            await browser.close()
            print("\nVerification script finished.")

if __name__ == '__main__':
    asyncio.run(main())
