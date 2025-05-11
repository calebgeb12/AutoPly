export default function () {
    alert("going to start using simplify");


    const simplifyAutoFillBtn = [...document.querySelectorAll('*')].map(e => e.shadowRoot).filter(Boolean).flatMap(r => [...r.querySelectorAll('button, span')]).find(el => el.textContent.includes("Autofill this page"));
    if (simplifyAutoFillBtn) {
        simplifyAutoFillBtn.click();
    }
}