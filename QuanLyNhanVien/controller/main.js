// Đặt tên biến local hàm get_querySelector
var get = document.querySelector.bind(document);
var getAll = document.querySelectorAll.bind(document);

// Tạo mảng danh sách nhân viên theo StaffList_Constructors
var DSNV = new StaffList();

// Lấy dữ liệu trên LocalStorage
getLocalStorage();

// HandleEvent_user_click "button_ThemNV"
get('#btnThem').addEventListener('click', () => {
    get('#form-login').reset();
    get('#tknv').removeAttribute('disabled', '');
    get('#btnThemNV').style.display = 'block';
    get('#btnCapNhat').style.display = 'none';
})

// Hàm lấy dữ liệu UserInput
function getInformation(isEdit) {
    var tknv = get('#tknv').value;
    var name = get('#name').value;
    var email = get('#email').value;
    var password = get('#password').value;
    var datepicker = get('#datepicker').value;
    var luongCB = get('#luongCB').value;
    var chucvu = get('#chucvu').value;
    var gioLam = get('#gioLam').value;

    // Tạo đối tượng nhanVien
    var nhanVien = new Staff(tknv, name, email, password, datepicker, luongCB, chucvu, gioLam);

    // Kiểm tra (Validation)
    var isValid = true;
    
    // Kiểm tra Tài khoản
    isValid &= checkedString(nhanVien.account, 1, undefined, 'span#tbTKNV', 'Trường này không được bỏ trống')
        && checkedString(nhanVien.account, 4, 6, 'span#tbTKNV', 'Yêu cầu nhập 4-6 ký tự')
        && checkedPattern(nhanVien.account, /^[\dA-Za-z]+$/, 'span#tbTKNV', 'Yêu cầu nhập vào là ký số')
        && checkedSameAccount(nhanVien.account, DSNV.arrStaffList, isEdit, 'span#tbTKNV', 'Tài khoản đã tồn tại');

    // Kiểm tra Họ & tên
    isValid &= checkedString(nhanVien.name, 1, undefined, 'span#tbTen', 'Trường này không được bỏ trống')
        && checkedPattern(nhanVien.name, /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/, 'span#tbTen', 'Yêu cầu nhập vào là chữ');

    // Kiểm tra email
    isValid &= checkedString(nhanVien.email, 1, undefined, 'span#tbEmail', 'Trường này không được bỏ trống')
        && checkedPattern(nhanVien.email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'span#tbEmail', 'Email không hợp lệ');

    // Kiểm tra mật khẩu
    isValid &= checkedString(nhanVien.password, 1, undefined, 'span#tbMatKhau', 'Trường này không được bỏ trống')
        && checkedPattern(nhanVien.password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/, 'span#tbMatKhau', 'Mật khẩu không hợp lệ');

    // Kiểm tra ngày làm
    isValid &= checkedString(nhanVien.workingDays, 1, undefined, 'span#tbNgay', 'Trường này không được bỏ trống')
        && checkedPattern(nhanVien.workingDays, /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/, 'span#tbNgay', 'Yêu cầu nhập đúng định dạng MM/DD/YYYY');

    // Kiểm tra lương cơ bản
    isValid &= checkedString(nhanVien.basicSalary, 1, undefined, 'span#tbLuongCB', 'Trường này không được bỏ trống')
        && checkedNumber(nhanVien.basicSalary, 1e6, 2e7, 'span#tbLuongCB', 'Yêu cầu nhập giá trị trong khoảng 1.000.000 - 20.000.000');

    // Kiểm tra chức vụ
    isValid &= checkedString(nhanVien.position, 1, undefined, 'span#tbChucVu', 'Yêu cầu chọn chức vụ');

    // Kiểm tra số giờ làm
    isValid &= checkedString(nhanVien.workingHours, 1, undefined, 'span#tbGiolam', 'Trường này không được bỏ trống')
        && checkedNumber(nhanVien.workingHours, 80, 200, 'span#tbGiolam', 'Yêu cầu nhập vào giờ làm trong khoảng 80 - 200 giờ');

    // Trả về nhân viên theo Staff_Constructors
    return isValid ? nhanVien : undefined;
};

// HandleEvent_user_click "button_Themnguoidung"
get('#btnThemNV').onclick = function () {
    var nhanVien = getInformation(false);    // B1: Lấy dữ liệu từ người dùng

    if (nhanVien) {
        DSNV.add(nhanVien);                 // B2: Thêm nhân viên vào mảng
        renderUI();                         // B3: Hiển thị UI
        setLocalStorage();                  // B4: Lưu dữ liệu vào LocalStorage
    };
};

// Hàm hiển thị UI
function renderUI(arrRender = DSNV.arrStaffList) {
    var content = '';
    var arrLength = arrRender.length;

    for (var i = 0; i < arrLength; i++) {
        var staff = arrRender[i];
        var totalSalary = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(staff.totalSalary(staff.position));
        var rank = staff.rank(staff.workingHours);
        content += `
        <tr>
            <td>${staff.account}</td>
            <td>${staff.name}</td>
            <td>${staff.email}</td>
            <td>${staff.workingDays}</td>
            <td>${staff.position}</td>
            <td>${totalSalary}</td>
            <td>${rank}</td>
            <td><button class='btn btn-success' data-toggle="modal" data-target="#myModal" onclick="editStaff('${staff.account}')">Edit</button></td>
            <td><button class='btn btn-danger' onclick="deleteStaff('${staff.account}')">Delete</button></td>
        </tr>
        `;
    };

    get('#tableDanhSach').innerHTML = content;
};

// Hàm lưu dữ liệu vào LocalStorage
function setLocalStorage() {
    // Định dạng dữ liệu theo dạng chuỗi JSON 
    // JSON: chỉ lưu thuộc tính & không lưu phương thức
    // Mã hóa - Encode 'JSON.stringify()'
    localStorage.setItem('StaffList', JSON.stringify(DSNV.arrStaffList))
};

// Hàm lấy dữ liệu từ LocalStorage
function getLocalStorage() {
    // Chuyển dữ liệu về dạng JavaScript
    // Giải mã - Decode 'JSON.parse()'
    var data = localStorage.getItem('StaffList');

    if (data) {
        var parseData = JSON.parse(data);
        var arrData = [];

        for (var i = 0; i < parseData.length; i++) {
            var staffData = parseData[i];
            var staffGet = new Staff(staffData.account, staffData.name, staffData.email, staffData.password, staffData.workingDays, staffData.basicSalary, staffData.position, staffData.workingHours);
            arrData.push(staffGet);
        };

        DSNV.arrStaffList = arrData;
        renderUI();         // Hiển thị lại UI
    };
};

// Hàm xóa nhân viên (HandleEvent_user_click "button_Delete")
function deleteStaff(_account) {
    DSNV.remove(_account);     // B1: Xóa nhân viên
    renderUI();                 // B2: Hiển thị lại UI
    setLocalStorage();          // B3: Lưu lại dữ liệu LocalStorage
};

// Hàm chỉnh sửa nhân viên (HandleEvent_user_click "button_Edit")
function editStaff(_account) {
    get('#btnThemNV').style.display = 'none';
    get('#btnCapNhat').style.display = 'block';

    // Tìm index nhân viên muốn edit
    var _index = DSNV.findIndex(_account);
    var staffUpdate = DSNV.arrStaffList[_index];

    // Đẩy dữ liệu lên inputUser
    get('#tknv').value = staffUpdate.account;
    get('#tknv').setAttribute('disabled', '');
    get('#name').value = staffUpdate.name;
    get('#email').value = staffUpdate.email;
    get('#password').value = staffUpdate.password;
    get('#datepicker').value = staffUpdate.workingDays;
    get('#luongCB').value = staffUpdate.basicSalary;
    get('#chucvu').value = staffUpdate.position;
    get('#gioLam').value = staffUpdate.workingHours;

    return _index;
};

// HandleEvent_user_click "button_CapNhat"
get('#btnCapNhat').onclick = function () {
    var nhanVien = getInformation(true);

    if (nhanVien) {
        DSNV.update(nhanVien);
        renderUI();
        setLocalStorage();
    }
};

// HandleEvent_user_press "input_searchName"
get('#searchName').addEventListener('keyup', () => {
    var valueSearch = get('#searchName').value.toLowerCase();
    var arrSearch = [];

    for (var i = 0; i < DSNV.arrStaffList.length; i++) {
        var checkedRank = DSNV.arrStaffList[i].rank(DSNV.arrStaffList[i].workingHours).toLowerCase();
        
        if (checkedRank.indexOf(valueSearch) !== -1) {
            arrSearch.push(DSNV.arrStaffList[i]);
        };
    };

    renderUI(arrSearch);
});

// Xử lý reset-validate khi popup-modal
$('#myModal').on('hidden.bs.modal', function () {
    var arrSpan = getAll('#form-login span.sp-thongbao');

    for (var i = 0; i < arrSpan.length; i++) {
        arrSpan[i].style.display = 'none';
    };
});