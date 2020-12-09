function loadCatatan() {
    if (localStorage.list_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        var data_app = "";
        if (list_data.length > 0) {
 
            for (i in list_data) {
                data_app += '<tr>';
                data_app +=
                    '<td><p>' + list_data[i].nama + ' </p></td>' +
                    '<td><p>' + list_data[i].jumlah + ' </p></td>' +
                    '<td><p>' + 'Rp ' + list_data[i].harga + ' </p></td>' +
                    '<td><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="hapusData(\'' + list_data[i].id_data + '\')">Hapus</a></td>';
                data_app += '</tr>';
            }

            var makanan = 0;
            var minuman = 0;

            for (j = 0; j < list_data.length; j++){
                var harga = parseInt(list_data[j].harga);
                if( harga === 15000 || harga === 10000 ){
                    makanan = makanan + parseInt(list_data[j].jumlah)
                }

                else{
                    minuman = minuman + parseInt(list_data[j].jumlah)
                }
            }

            if(makanan > 0 && minuman > 0){
                data_app += '<tr>';
                    data_app +=
                        '<td colspan="2"><p>' + 'Total Pesanan :' + ' </p></td>' +
                        '<td colspan="2"><p>' + makanan  + ' Makanan ' + 'dan ' +  minuman  + ' Minuman' + '</p></td>';
                    data_app += '</tr>';
            }
            else if(makanan == 0 && minuman > 0){
                data_app += '<tr>';
                    data_app +=
                        '<td colspan="2"><p>' + 'Total Pesanan :' + ' </p></td>' +
                        '<td colspan="2"><p>' +  minuman  + ' Minuman' + '</p></td>';
                    data_app += '</tr>';
            }
            else if(makanan > 0 && minuman == 0){
                data_app += '<tr>';
                    data_app +=
                        '<td colspan="2"><p>' + 'Total Pesanan :' + ' </p></td>' +
                        '<td colspan="2"><p>' + makanan  + ' Makanan' + '</p></td>';
                    data_app += '</tr>';
            }


            var total = 0;
            for (k = 0; k < list_data.length; k++){
                var total = total + parseInt(list_data[k].harga)*parseInt(list_data[k].jumlah);
            }
            data_app += '<tr>';
                data_app +=
                    '<td colspan="2"><p>' + 'Total Harga :' + ' </p></td>' +
                    '<td colspan="2"><p>' + 'Rp ' + total + ' </p></td>';
                data_app += '</tr>';
        }
        else {
            data_app += '<tr>';
                data_app +=
                    '<td colspan="4"><p>' + 'Belum ada menu yang dipesan' + ' </p></td>'
                data_app += '</tr>';
        }
 
        $('#list-catatan').html(data_app);
    }
    console.log(list_data);
}

function simpanDataNasgor() {
 
    nama = $('#menuNasgorId').val();
    jumlah = $('#jumlahNasgorId').val();
    harga = $('#hargaNasgorId').val();

    if($('#jumlahNasgorId').val() == 0){
        alert("Maaf, minimal pemesanan 1 porsi");
    }

    else{
        if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
        }
        else {
            list_data = [];
            id_data = 0;
        }
 
    id_data++;
    list_data.push({ 'id_data': id_data, 'nama': nama, 'jumlah': jumlah, 'harga': harga });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
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
        if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    }
    else {
        list_data = [];
        id_data = 0;
    }
 
    id_data++;
    list_data.push({ 'id_data': id_data, 'nama': nama, 'jumlah': jumlah, 'harga': harga });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
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
        if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    }
    else {
        list_data = [];
        id_data = 0;
    }
 
    id_data++;
    list_data.push({ 'id_data': id_data, 'nama': nama, 'jumlah': jumlah, 'harga': harga });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
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
        if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    }
    else {
        list_data = [];
        id_data = 0;
    }
 
    id_data++;
    list_data.push({ 'id_data': id_data, 'nama': nama, 'jumlah': jumlah, 'harga': harga });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
    document.getElementById("menuJambuForm").reset();
    loadCatatan();
 
    return false;
    }
}
 
function hapusData(id) {
    if (localStorage.list_data && localStorage.id_data) {
        list_data = JSON.parse(localStorage.getItem('list_data'));
 
        idx_data = 0;
        for (i in list_data) {
            if (list_data[i].id_data == id) {
                list_data.splice(idx_data, 1);
            }
            idx_data++;
        }
        localStorage.setItem('list_data', JSON.stringify(list_data));
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