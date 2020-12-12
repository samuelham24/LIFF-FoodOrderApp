window.onload = () => {
    const useNodeJS = false;
    const IdLiffDefault = "1655339359-VGWqznYw";
 
    let IdLiff = "";
 
    if (useNodeJS) {
        fetch('/send-id')
            .then((reqResponse) => {
                return reqResponse.json();
            })
            .then((jsonResponse) => {
                IdLiff = jsonResponse.id;
                initializeLiffOrDie(IdLiff);
            })
            .catch((error) =>  {
                document.getElementById("contentLiffId").classList.add('hidden');
            });
    } else {
        IdLiff = IdLiffDefault;
        initializeLiffOrDie(IdLiff);
    }
};
 
function initializeLiffOrDie(IdLiff) {
    if (!IdLiff) {
        document.getElementById("contentLiffId").classList.add('hidden');
    } else {
        LiffInit(IdLiff);
    }
}
 
function LiffInit(IdLiff) {
    liff.init({
        liffId: IdLiff
        }).then(() => {
            AppLiffInit();
            getProfile();
        }).catch((err) => {
            document.getElementById("contentLiffId").classList.add('hidden');
            console.log('error', err);
        });
}

var getProfileName = {}; //Global object

function getProfile(){
    if (!liff.isInClient()) {
        document.getElementById("loginSectionId").style.display = "block";
        if (liff.isLoggedIn()) {
            document.getElementById('loginSuccesFieldId').textContent = 'Log in Berhasil!';
            getProfileData();
        } else {
            document.getElementById("lanjutButtonId").style.display = "none";
        }
    } else if(liff.isInClient()){
        getProfileData();
        document.getElementById("welcomeSectionId").style.display = "block";

    }
}

function getProfileData(){
    liff.getProfile().then((profile) => {
        getProfileName.getDisplayName = profile.displayName;
        document.getElementById('displaynamefield').textContent = profile.displayName;
        var profilePictureDiv = document.getElementById('profilepicturediv');
            if (profilePictureDiv.firstElementChild) {
                profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
            }
        var img = document.createElement('img');
        img.src = profile.pictureUrl;
        img.alt = "Profile Picture";
        img.width = 300;
        profilePictureDiv.appendChild(img);
        }).catch((error) => {
            window.alert("Error getting profile: " + error);
        });
}
 

function AppLiffInit() {
    isInClientInfo();
    buttonHandlersSet();
 
    if (liff.isLoggedIn()) {
        document.getElementById('loginButtonId').disabled = true;
    } else {
        document.getElementById('logoutButtonId').disabled = true;
    }
}

function isInClientInfo() {
    if (liff.isInClient()) {
        document.getElementById('loginButtonId').classList.toggle('hidden');
        document.getElementById('logoutButtonId').classList.toggle('hidden');
        document.getElementById('inClientNotifId').textContent = 'Aplikasi ini dibuka di browser LINE App.';
        document.getElementById("loginSectionId").classList.add("login-section-hidden");
    } else {
        document.getElementById('inClientNotifId').textContent = 'Aplikasi ini dibuka di browser eksternal.';
        document.getElementById("loginSectionId").classList.add("login-section-show");
    }
}

function buttonHandlersSet() {
    document.getElementById('windowOpenId').addEventListener('click', () => {
        liff.openWindow({
            url: 'https://liff-orderfoodapp.herokuapp.com//', 
            external: true
        });
    });
}

function buttonHandlersSet() {
    document.getElementById('windowOpenId').addEventListener('click', () => {
        liff.openWindow({
            url: 'https://liff-orderfoodapp.herokuapp.com//', 
            external: true
        });
    });
 
document.getElementById('windowCloseId').addEventListener('click', () => {
        if (!liff.isInClient()) {
            notInClientAlert();
        } else {
            liff.sendMessages([{
                    'type': 'text',
                    'text': 
                    `Terima kasih sudah mengunjungi Resto Indonesia!`,
                }]).then(() => {
                    window.alert('Terima kasih sudah mengunjungi Resto Indonesia!');
                }).catch((error) => {
                    window.alert('Error sending message: ' + error);
                });
            liff.closeWindow();
        }
    });

    document.getElementById('loginButtonId').addEventListener('click', () => {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });
 
    document.getElementById('logoutButtonId').addEventListener('click', () => {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });

    document.getElementById('messageSendId').addEventListener('click', () => {
        if (!liff.isInClient()) {
            notInClientAlert();
        } else {
            if(MenuEmpty.NotEmpty){
                    liff.sendMessages([{
                        'type': 'text',
                        'text': 
                        `Terima kasih sudah mengunjungi Resto Indonesia!`,
                    }]).then(function() {
                        window.alert('Terima kasih sudah mengunjungi Resto Indonesia!');
                    }).catch(function(error) {
                        window.alert('Error sending message: ' + error);
                    });
            }
        }
    });
}

function orderSendMessage() {
        if (!liff.isInClient()) {
            notInClientAlert();
        } else {
                if (MyMenu.makanan > 0 && MyMenu.minuman > 0){
                    liff.sendMessages([{
                        'type': 'text',
                        'text': 
                        `Terima kasih sudah mengunjungi Resto Indonesia!` + `\n\n` + `Pesanan saudara/i ${getProfileName.getDisplayName} yaitu :`+ `\n` + 
                        `- ${MyMenu.makanan} makanan`+ `\n` + 
                        `- ${MyMenu.minuman} minuman`+ `\n\n` + 
                        `Total pembayaran anda sebesar Rp ${MyMenu.total}.`,
                    }]).then(function() {
                        window.alert('Terima Kasih, daftar pesanan anda sudah kami kirim via chat.');
                    }).catch(function(error) {
                        window.alert('Error sending message: ' + error);
                    });
                }
                else if(MyMenu.makanan == 0 && MyMenu.minuman > 0){
                    liff.sendMessages([{
                        'type': 'text',
                        'text': 
                        `Terima kasih sudah mengunjungi Resto Indonesia!` + `\n\n` + `Pesanan saudara/i ${getProfileName.getDisplayName} yaitu :`+ `\n` + 
                        `- ${MyMenu.minuman} minuman`+ `\n\n` + 
                        `Total pembayaran anda sebesar Rp ${MyMenu.total}.`,
                    }]).then(function() {
                        window.alert('Terima Kasih, daftar pesanan anda sudah kami kirim via chat.');
                    }).catch(function(error) {
                        window.alert('Error sending message: ' + error);
                    });
                }
                else if(MyMenu.makanan > 0 && MyMenu.minuman == 0){
                    liff.sendMessages([{
                        'type': 'text',
                        'text': 
                        `Terima kasih sudah mengunjungi Resto Indonesia!` + `\n\n` + `Pesanan saudara/i ${getProfileName.getDisplayName} yaitu :`+ `\n` + 
                        `- ${MyMenu.makanan} makanan`+ `\n\n` + 
                        `Total pembayaran anda sebesar Rp ${MyMenu.total}.`,
                    }]).then(function() {
                        window.alert('Terima Kasih, daftar pesanan anda sudah kami kirim via chat.');
                    }).catch(function(error) {
                        window.alert('Error sending message: ' + error);
                    });
                }
        }
    };

function notInClientAlert() {
    alert('Maaf, tombol ini tidak tersedia pada external.');
}
 
function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }
}