window.onload = function() {
    const useNodeJS = false;
    const defaultLiffId = "1655339359-VGWqznYw";
 
    let myLiffId = "";
 
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("contentLiffId").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};
 
function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("contentLiffId").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}
 
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            // start to use LIFF's api
            initializeApp();
            getProfile();
        })
        .catch((err) => {
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
    liff.getProfile().then(function (profile) {
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
        }).catch(function (error) {
            window.alert("Error getting profile: " + error);
        });
}
 

function initializeApp() {
    liffDataStatus();
    isInClientInfo();
    buttonHandlersSet();
 
    if (liff.isLoggedIn()) {
        document.getElementById('loginButtonId').disabled = true;
    } else {
        document.getElementById('logoutButtonId').disabled = true;
    }
}
 
function liffDataStatus() {
    document.getElementById('inClientStatus').textContent = liff.isInClient();
    document.getElementById('loggedInStatus').textContent = liff.isLoggedIn();
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
    document.getElementById('windowOpenId').addEventListener('click', function() {
        liff.openWindow({
            url: 'https://liff-orderfoodapp.herokuapp.com//', 
            external: true
        });
    });
}

function buttonHandlersSet() {
    document.getElementById('windowOpenId').addEventListener('click', function() {
        liff.openWindow({
            url: 'https://liff-orderfoodapp.herokuapp.com//', 
            external: true
        });
    });
 
document.getElementById('windowCloseId').addEventListener('click', function() {
        if (!liff.isInClient()) {
            notInClientAlert();
        } else {
            liff.sendMessages([{
                    'type': 'text',
                    'text': 
                    `Terima kasih sudah mengunjungi Resto Indonesia!`,
                }]).then(function() {
                    window.alert('Terima kasih sudah mengunjungi Resto Indonesia!');
                }).catch(function(error) {
                    window.alert('Error sending message: ' + error);
                });
            liff.closeWindow();
        }
    });

    document.getElementById('loginButtonId').addEventListener('click', function() {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });
 
    document.getElementById('logoutButtonId').addEventListener('click', function() {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });

    document.getElementById('messageSendId').addEventListener('click', function () {
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