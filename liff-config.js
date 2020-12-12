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
                document.getElementById("liffAppContent").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};
 
function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent").classList.add('hidden');
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
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
            console.log('error', err);
        });
}

var getProfileName = {}; //Global object

function getProfile(){
    if (liff.isLoggedIn()) {
        document.getElementById('loginSuccesFieldId').textContent = 'Login Berhasil';
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
    } else {
        document.getElementById('loginSuccesFieldId').textContent = 'Anda Belum Login';
        document.getElementById('liffLogoutButton').disabled = true;
    }
}
 

function initializeApp() {
    displayLiffData();
    displayIsInClientInfo();
    registerButtonHandlers();
 
    // check if the user is logged in/out, and disable inappropriate button
    if (liff.isLoggedIn()) {
        document.getElementById('liffLoginButton').disabled = true;
    } else {
        document.getElementById('liffLogoutButton').disabled = true;
    }
}
 
function displayLiffData() {
    document.getElementById('isInClient').textContent = liff.isInClient();
    document.getElementById('isLoggedIn').textContent = liff.isLoggedIn();
}

function displayIsInClientInfo() {
    if (liff.isInClient()) {
        document.getElementById('liffLoginButton').classList.toggle('hidden');
        document.getElementById('liffLogoutButton').classList.toggle('hidden');
        document.getElementById('isInClientMessage').textContent = 'Aplikasi ini dibuka di browser bawaan LINE.';
        document.getElementById("loginSectionId").classList.add("login-section-hidden");
    } else {
        document.getElementById('isInClientMessage').textContent = 'Aplikasi ini dibuka di browser eksternal.';
        document.getElementById("loginSectionId").classList.add("login-section-show");
    }
}

function registerButtonHandlers() {
    document.getElementById('openWindowButton').addEventListener('click', function() {
        liff.openWindow({
            url: 'https://liff-orderfoodapp.herokuapp.com//', // Isi dengan Endpoint URL aplikasi web Anda
            external: true
        });
    });
}

function registerButtonHandlers() {
    document.getElementById('openWindowButton').addEventListener('click', function() {
        liff.openWindow({
            url: 'https://liff-orderfoodapp.herokuapp.com//', // Isi dengan Endpoint URL aplikasi web Anda
            external: true
        });
    });
 
document.getElementById('closeWindowButton').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
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

    document.getElementById('liffLoginButton').addEventListener('click', function() {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });
 
    document.getElementById('liffLogoutButton').addEventListener('click', function() {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });

    document.getElementById('sendMessageButton').addEventListener('click', function () {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
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
            sendAlertIfNotInClient();
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

function sendAlertIfNotInClient() {
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