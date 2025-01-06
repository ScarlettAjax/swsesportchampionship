let url = "https://script.google.com/macros/s/AKfycbwOMz5HuauZaIUOKyz7NAhRHQtXkX7NLT3WiZiUR7SyTSjs6mAAIvnNipS2cTj7j9rf/exec";
let file = document.querySelector("input");
let img = document.getElementById("sqlogo");
file.addEventListener('change',()=>{
    let fr = new FileReader();
    fr.addEventListener('loadend',()=>{
        let res = fr.result;
        img.src=res;
        let spt = res.split("base64,")[1];
        let obj = {
            base64:spt,
            type:file.files[0].type,
            name:file.files[0].name
        }
        fetch(url, {
            method:"POST",
            body:JSON.stringify(obj)
        })
        .then(r=>this.text())
        .then(data=>console.log(data))
    })
    fr.readAsDataURL(file.files[0])
})

function submitForm() {
    const form = document.getElementById('gameForm');
    const formData = new FormData(form);
    const imageInput = document.getElementById('upload');
    const file = imageInput.files[0];
    const botToken = '7994670725:AAHE-gipnAu8ejPeElrT57MhYWWzt9CFIDk';
    const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;

    let message = '';

    formData.forEach((value, key) => {
        message += `${key}: ${value}\n`;
    });

    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    const telegramData = new FormData();
    telegramData.append('chat_id', '-1002251465876');
    telegramData.append('caption', message);
    telegramData.append('photo', file, file.name);

    const spinner = document.getElementById('loadingSpinner');
    spinner.style.display = 'block';

    fetch(url, {
        method: 'POST',
        body: telegramData
    })
    .then(response => response.json())
    .then(data => {
        spinner.style.display = 'none';

        if (data.ok) {
            showDialog('We received your squad data successfully!');
        } else {
            showDialog('Something went wrong! Please try again and check your internet connection.');
        }
    })
    .catch(error => {
        spinner.style.display = 'none';
        console.error('Error:', error);
        showDialog('Something went wrong! Please try again and check your internet connection.');
    });
}

function showDialog(message) {
    const dialog = document.getElementById('dialogBox');
    const dialogMessage = document.getElementById('dialogMessage');
    dialogMessage.textContent = message;
    dialog.style.display = 'block';

    setTimeout(() => {
        dialog.style.display = 'none';
    }, 3000);
}

function closePage() {
    alert('The website will now close.');
    window.close();

    setTimeout(() => {
        document.body.innerHTML = '<h1 style="text-align: center; color: red; margin-top: 20%;">လူကြီးမင်း၏ Device တွင် VPN အသုံးပြုမှတွေ့ရှိထားပါသောကြောင့် ဝဘ်ဆိုဒ်သို့ဝင်ရောက်ခွင့်မရနိုင်ပါ။ VPN ပိတ်ပြီးမှပြန်လည်ဝင်ရောက်နိုင်ပါမည်။</h1>';
    }, 100);
}

async function checkVPN() {
    try {
        const ipResponse = await fetch('https://api64.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIp = ipData.ip;

        const response = await fetch(`https://vpnapi.io/api/${userIp}?key=1ddb25936eb14d7eb0daad38435ec523`);
        const data = await response.json();

        if (data.security && data.security.vpn) {
            document.getElementById('vpn-dialog').style.display = 'flex';
        }
    } catch (error) {
        console.error('Error checking VPN:', error);
    }
}

window.onload = checkVPN;

document.addEventListener('keydown', (event) => {
    event.preventDefault();
});

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});