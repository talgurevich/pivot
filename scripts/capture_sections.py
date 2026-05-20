from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:4790/"
BASE = "/Users/talgurevich/Documents/pivot/pivot-site/screenshots/"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    page.goto(URL, wait_until='networkidle')

    # full scroll to trigger reveals
    total = page.evaluate("document.body.scrollHeight")
    pos = 0
    while pos < total:
        page.evaluate(f"window.scrollTo(0,{pos})")
        page.wait_for_timeout(300)
        pos += 500
        total = page.evaluate("document.body.scrollHeight")
    page.wait_for_timeout(600)

    def find_text(substr):
        return page.evaluate(f"""() => {{
            const els = [...document.querySelectorAll('*')];
            const el = els.find(e => e.children.length===0 && e.textContent && e.textContent.includes({substr!r}));
            if(!el) return null;
            let n = el;
            for(let i=0;i<6;i++){{ if(n.parentElement) n=n.parentElement; }}
            const r = n.getBoundingClientRect();
            return {{top: r.top + window.scrollY}};
        }}""")

    # Section 1: timing cards
    for label, anchor in [("timing", "תזמוני"), ("cta_email", "manager@my-restaurant"), ("bignum", "4.8M")]:
        info = find_text(anchor)
        if info:
            y = max(0, info['top'] - 120)
            page.evaluate(f"window.scrollTo(0,{y})")
            page.wait_for_timeout(700)
            page.screenshot(path=f"{BASE}sec_{label}.png", full_page=False)
            print(f"saved sec_{label}.png at y={y}")
        else:
            print(f"NOT FOUND: {anchor}")

    # also capture email field value width check
    email = page.evaluate("""() => {
        const inp = [...document.querySelectorAll('input')].find(i => (i.type==='email')||/manager@|מייל|email/i.test(i.placeholder||''));
        if(!inp) return null;
        const r = inp.getBoundingClientRect();
        return {placeholder: inp.placeholder, value: inp.value, w: Math.round(r.width)};
    }""")
    print("EMAIL_INPUT:", email)

    browser.close()
