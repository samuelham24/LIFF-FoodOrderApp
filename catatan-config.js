var MyMenu = {}; //Global object
var MenuEmpty = {};

function loadCatatan() {
    if (localStorage.menuList && localStorage.menuId) {
        menuList = JSON.parse(localStorage.getItem('menuList'));
        var menuApp = "";
        if (menuList.length > 0) {
            MenuEmpty.NotEmpty = true;
            for (i in menuList) {
                menuApp += '<tr>';
                menuApp +=
                    '<td><p>' + menuList[i].nama + ' </p></td>' +
                    '<td><p>' + menuList[i].jumlah + ' </p></td>' +
                    '<td><p>' + 'Rp ' + menuList[i].harga + ' </p></td>' +
                    '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="hapusData(\'' + menuList[i].menuId + '\')">Hapus</a></td>';
                menuApp += '</tr>';
            }

            MyMenu.makanan = 0;
            MyMenu.minuman = 0;

            for (j = 0; j < menuList.length; j++){
                var harga = parseInt(menuList[j].harga);
                if( harga === 15000 || harga === 10000 ){
                    MyMenu.makanan = MyMenu.makanan + parseInt(menuList[j].jumlah)
                }

                else{
                    MyMenu.minuman = MyMenu.minuman + parseInt(menuList[j].jumlah)
                }
            }

            if(MyMenu.makanan > 0 && MyMenu.minuman > 0){
                menuApp += '<tr>';
                    menuApp +=
                        '<td colspan="2"><p>' + 'Total Pesanan :' + ' </p></td>' +
                        '<td colspan="2"><p>' + MyMenu.makanan  + ' Makanan ' + 'dan ' +  MyMenu.minuman  + ' Minuman' + '</p></td>';
                    menuApp += '</tr>';
            }
            else if(MyMenu.makanan == 0 && MyMenu.minuman > 0){
                menuApp += '<tr>';
                    menuApp +=
                        '<td colspan="2"><p>' + 'Total Pesanan :' + ' </p></td>' +
                        '<td colspan="2"><p>' +  MyMenu.minuman  + ' Minuman' + '</p></td>';
                    menuApp += '</tr>';
            }
            else if(MyMenu.makanan > 0 && MyMenu.minuman == 0){
                menuApp += '<tr>';
                    menuApp +=
                        '<td colspan="2"><p>' + 'Total Pesanan :' + ' </p></td>' +
                        '<td colspan="2"><p>' + MyMenu.makanan  + ' Makanan' + '</p></td>';
                    menuApp += '</tr>';
            }

            MyMenu.total = 0;
            for (k = 0; k < menuList.length; k++){
                MyMenu.total = MyMenu.total + parseInt(menuList[k].harga)*parseInt(menuList[k].jumlah);
            }
            menuApp += '<tr>';
                menuApp +=
                    '<td colspan="2"><p>' + 'Total Harga :' + ' </p></td>' +
                    '<td><p>' + 'Rp ' + MyMenu.total + ' </p></td>'+
                    '<td><button onclick="orderSendMessage()"  class="btn btn-success btn-small ">Pesan</button></td>';
                menuApp += '</tr>';
        }
        else {
            menuApp += '<tr>';
                menuApp +=
                    '<td colspan="4"><p>' + 'Belum ada menu yang dipesan' + ' </p></td>'
                menuApp += '</tr>';

            MenuEmpty.Empty = true;
        }
 
        $('#list-catatan').html(menuApp);
    }
}

function simpanDataNasgor() {
 
    nama = $('#menuNasgorId').val();
    jumlah = $('#jumlahNasgorId').val();
    harga = $('#hargaNasgorId').val();

    if($('#jumlahNasgorId').val() == 0){
        alert("Maaf, minimal pemesanan 1 porsi");
    }

    else{
        if (localStorage.menuList && localStorage.menuId) {
        menuList = JSON.parse(localStorage.getItem('menuList'));
        menuId = parseInt(localStorage.getItem('menuId'));
        }
        else {
            menuList = [];
            menuId = 0;
        }
 
    menuId++;
    menuList.push({ 'menuId': menuId, 'nama': nama, 'jumlah': jumlah, 'harga': harga });
    window.localStorage.setItem('menuList', JSON.stringify(menuList));
    window.localStorage.setItem('menuId', menuId);
    document.getElementById("menuNasgorForm").reset();
    loadCatatan();
 
    return false;
    }
}

function simpanDataMie() {
 
    nama = $('#menuMieId').val();
    jumlah = $('#jumlahMieId').val();
    harga = $('#hargaMieId').val();

    if($('#jumlahMieId').val() == 0){
        alert("Maaf, minimal pemesanan 1 porsi");
    }

    else{
        if (localStorage.menuList && localStorage.menuId) {
        menuList = JSON.parse(localStorage.getItem('menuList'));
        menuId = parseInt(localStorage.getItem('menuId'));
    }
    else {
        menuList = [];
        menuId = 0;
    }
 
    menuId++;
    menuList.push({ 'menuId': menuId, 'nama': nama, 'jumlah': jumlah, 'harga': harga });
    window.localStorage.setItem('menuList', JSON.stringify(menuList));
    window.localStorage.setItem('menuId', menuId);
    document.getElementById("menuMieForm").reset();
    loadCatatan();
 
    return false;
    }
}

function simpanDataJeruk() {
 
    nama = $('#menuJerukId').val();
    jumlah = $('#jumlahJerukId').val();
    harga = $('#hargaJerukId').val();

    if($('#jumlahJerukId').val() == 0){
        alert("Maaf, minimal pemesanan 1 porsi");
    }

    else{
        if (localStorage.menuList && localStorage.menuId) {
        menuList = JSON.parse(localStorage.getItem('menuList'));
        menuId = parseInt(localStorage.getItem('menuId'));
    }
    else {
        menuList = [];
        menuId = 0;
    }
 
    menuId++;
    menuList.push({ 'menuId': menuId, 'nama': nama, 'jumlah': jumlah, 'harga': harga });
    window.localStorage.setItem('menuList', JSON.stringify(menuList));
    window.localStorage.setItem('menuId', menuId);
    document.getElementById("menuJerukForm").reset();
    loadCatatan();
 
    return false;
    }
}

function simpanDataJambu() {
 
    nama = $('#menuJambuId').val();
    jumlah = $('#jumlahJambuId').val();
    harga = $('#hargaJambuId').val();

    if($('#jumlahJambuId').val() == 0){
        alert("Maaf, minimal pemesanan 1 porsi");
    }

    else{
        if (localStorage.menuList && localStorage.menuId) {
        menuList = JSON.parse(localStorage.getItem('menuList'));
        menuId = parseInt(localStorage.getItem('menuId'));
    }
    else {
        menuList = [];
        menuId = 0;
    }
 
    menuId++;
    menuList.push({ 'menuId': menuId, 'nama': nama, 'jumlah': jumlah, 'harga': harga });
    window.localStorage.setItem('menuList', JSON.stringify(menuList));
    window.localStorage.setItem('menuId', menuId);
    document.getElementById("menuJambuForm").reset();
    loadCatatan();
 
    return false;
    }
}
 
function hapusData(id) {
    if (localStorage.menuList && localStorage.menuId) {
        menuList = JSON.parse(localStorage.getItem('menuList'));
 
        idx_data = 0;
        for (i in menuList) {
            if (menuList[i].menuId == id) {
                menuList.splice(idx_data, 1);
            }
            idx_data++;
        }
        window.localStorage.setItem('menuList', JSON.stringify(menuList));
        loadCatatan();
    }
}

function pesanSekarang(){
    loadCatatan();
    $("#menu-container").fadeIn();
    $("#welcomeSectionId").fadeOut();
}

var nasgor = 0;
var mie = 0;
var jeruk = 0;
var jambu = 0;

  //nasgor
  function clickIncreaseNasgor() {
        nasgor++;
        document.getElementById('jumlahNasgorId').value = nasgor;
    }
  function clickDecreaseNasgor() {
      if(nasgor === 0 ){
        nasgor = 0;
      }
      else{
          nasgor--;
          document.getElementById('jumlahNasgorId').value = nasgor;
      }
    }

  //mie
  function clickIncreaseMie() {
        mie++;
        document.getElementById('jumlahMieId').value = mie;
    }
  function clickDecreaseMie() {
    if(mie === 0 ){
        mie = 0;
      }
      else{
          mie--;
          document.getElementById('jumlahMieId').value = mie;
      }
    }


  //jeruk
  function clickIncreaseJeruk() {
        jeruk++;
        document.getElementById('jumlahJerukId').value = jeruk;
    }
  function clickDecreaseJeruk() {
      if(jeruk === 0){
          jeruk = 0;
      }
      else{
          jeruk--;
          document.getElementById('jumlahJerukId').value = jeruk;
      }
    }


  //jambu
  function clickIncreaseJambu() {
        jambu++;
        document.getElementById('jumlahJambuId').value = jambu;
    }
  function clickDecreaseJambu() {
      if(jambu === 0){
          jambu = 0;
      }
      else{
          jambu--;
          document.getElementById('jumlahJambuId').value = jambu;
      }
    }