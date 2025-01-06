function closePage() {
    alert('The website will now close.');//
    window.close();

    setTimeout(() => {
        document.body.innerHTML = '<h1 style="text-align: center; color: white; margin-top: 20%;">ဝဘ်ဆိုဒ်ကို Student Team ဘက်မှယာယီပိတ်ပင်ထားပါသည်။</h1>';
    }, 100);
}

document.addEventListener('keydown', (event) => {
    event.preventDefault();
});

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});