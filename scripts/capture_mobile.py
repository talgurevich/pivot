from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4790/"
OUT = "/Users/talgurevich/Documents/pivot/pivot-site/screenshots/mobile_390.png"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto(URL, wait_until='networkidle')

    # Scroll through whole page to trigger scroll-reveal animations
    total_height = page.evaluate("document.body.scrollHeight")
    step = 600
    pos = 0
    while pos < total_height:
        page.evaluate(f"window.scrollTo(0, {pos})")
        page.wait_for_timeout(350)
        pos += step
        total_height = page.evaluate("document.body.scrollHeight")
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(800)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)

    # Check for horizontal overflow
    metrics = page.evaluate("""() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
        innerWidth: window.innerWidth
    })""")
    print("METRICS:", metrics)
    has_hscroll = metrics['scrollWidth'] > metrics['clientWidth'] + 1
    print("HORIZONTAL_SCROLL:", has_hscroll)

    # Find elements wider than viewport
    offenders = page.evaluate("""() => {
        const vw = window.innerWidth;
        const out = [];
        document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > vw + 1 || r.left < -1) {
                out.push({tag: el.tagName, cls: (el.className||'').toString().slice(0,60),
                          left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width)});
            }
        });
        return out.slice(0, 15);
    }""")
    print("OVERFLOW_ELEMENTS:", offenders)

    page.screenshot(path=OUT, full_page=True)
    print("SAVED:", OUT)
    browser.close()
