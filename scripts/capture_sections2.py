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

    def shot(name, expr):
        y = page.evaluate(expr)
        if y is None:
            print(f"NOT FOUND: {name}")
            return
        y = max(0, y - 100)
        page.evaluate(f"window.scrollTo(0,{y})")
        page.wait_for_timeout(700)
        page.screenshot(path=f"{BASE}{name}.png", full_page=False)
        print(f"saved {name}.png at y={y}")

    # timing section: find element whose own text == heading containing תזמוני
    shot("sec_timing", """() => {
        const els=[...document.querySelectorAll('h1,h2,h3,h4,span,div,p')];
        const el=els.find(e=>/תזמוני/.test(e.textContent||'') && e.textContent.length<60);
        if(!el) return null;
        return el.getBoundingClientRect().top + window.scrollY;
    }""")

    # CTA email: scroll to the email input
    shot("sec_email", """() => {
        const inp=[...document.querySelectorAll('input')].find(i=>(i.placeholder||'').includes('manager@'));
        if(!inp) return null;
        return inp.getBoundingClientRect().top + window.scrollY;
    }""")

    # big number 4.8M
    shot("sec_bignum", """() => {
        const els=[...document.querySelectorAll('*')];
        const el=els.find(e=>e.children.length===0 && /4\\.8M/.test(e.textContent||''));
        if(!el) return null;
        return el.getBoundingClientRect().top + window.scrollY;
    }""")

    # measure timing cards layout
    layout = page.evaluate("""() => {
        const heads=[...document.querySelectorAll('*')];
        const card=heads.filter(e=>/קוקה קולה|טמפו|אחים כהן/.test(e.textContent||'') && e.textContent.length<40);
        const rects=card.map(e=>{const r=e.getBoundingClientRect();return {t:e.textContent.trim().slice(0,20),top:Math.round(r.top),left:Math.round(r.left),w:Math.round(r.width)};});
        return rects;
    }""")
    print("TIMING_CARD_TEXTS:", layout)

    browser.close()
