from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4790/"
BASE = "/Users/talgurevich/Documents/pivot/pivot-site/screenshots/"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto(URL, wait_until='networkidle')
    total = page.evaluate("document.body.scrollHeight")
    pos = 0
    while pos < total:
        page.evaluate(f"window.scrollTo(0,{pos})")
        page.wait_for_timeout(300)
        pos += 500
        total = page.evaluate("document.body.scrollHeight")
    page.wait_for_timeout(600)

    # timing cards region: top ~4999, scroll to show all 3
    page.evaluate("window.scrollTo(0, 4870)")
    page.wait_for_timeout(700)
    page.screenshot(path=f"{BASE}f_timing.png", full_page=False)

    # bignum region
    page.evaluate("window.scrollTo(0, 3907)")
    page.wait_for_timeout(700)
    page.screenshot(path=f"{BASE}f_bignum.png", full_page=False)

    # email cta: fill it to verify the long address fits
    inp_handle = page.query_selector("input[placeholder*='manager@']")
    if inp_handle:
        inp_handle.scroll_into_view_if_needed()
        page.wait_for_timeout(400)
        # screenshot placeholder state
        page.screenshot(path=f"{BASE}f_email_placeholder.png", full_page=False)
        # fill with the full address and screenshot
        inp_handle.fill("manager@my-restaurant.co.il")
        page.wait_for_timeout(300)
        page.screenshot(path=f"{BASE}f_email_filled.png", full_page=False)
        # measure if text overflows the input
        info = page.evaluate("""() => {
            const i=[...document.querySelectorAll('input')].find(x=>(x.placeholder||'').includes('manager@'));
            return {scrollWidth:i.scrollWidth, clientWidth:i.clientWidth, overflow: i.scrollWidth > i.clientWidth+1};
        }""")
        print("EMAIL_FIT:", info)
    print("done")
    browser.close()
