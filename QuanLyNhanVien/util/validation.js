/** Hàm kiểm tra chuỗi (có rỗng/ có độ dài đúng yêu cầu) không?
 * @param {string} value Chuỗi cần kiểm tra
 * @param {number} minLength Độ dài tối thiểu 
 * @param {number} maxLength Độ dài tối đa
 * @param {any} selector Thẻ chứa lỗi cần hiển thị
 * @param {string} messErr Lỗi hiển thị UI
 */
function checkedString(value, minLength, maxLength, selector, messErr) {
    if (value.trim().length < minLength || value.trim().length > Number(maxLength)) {
        get(selector).innerHTML = messErr;
        get(selector).style.display = 'block';
        return false;
    } else {
        get(selector).innerHTML = '';
        return true;
    }
};
/**
 * Hàm kiểm tra chuỗi có đúng định dạng (Regex) yêu cầu không?
 * @param {string} value Chuỗi cần kiểm tra
 * @param {any} pattern Định dạng yêu cầu (phần lớn là: Regex)
 * @param {any} selector Thẻ chứa lỗi cần hiển thị
 * @param {string} messErr Lỗi hiển thị UI
 */
function checkedPattern(value, pattern, selector, messErr) {
    if(!pattern.test(value)) {
        get(selector).innerHTML = messErr;
        get(selector).style.display = 'block';
        return false;
    } else {
        get(selector).innerHTML = '';
        return true;
    }
};
/**
 * Hàm kiểm tra xem các tài khoản có trùng nhau không?
 * @param {string} account Tài khoản cần kiểm tra
 * @param {Array} list Danh sách chứa tất cả `account`
 * @param {boolean} isEdit Cờ kiểm tra chế độ `Edit` true/ false?
 * @param {any} selector Thẻ chứa lỗi cần hiển thị
 * @param {string} messErr Lỗi hiển thị UI
 */
function checkedSameAccount(account, list, isEdit, selector, messErr) {
    if (isEdit) return true;
    
    for (var i = 0; i < list.length; i++) {
        if (list[i].account === account) {
            get(selector).innerHTML = messErr;
            get(selector).style.display = 'block';
            return false;
        }
    }
    
    get(selector).innerHTML = '';
    return true;
};
/**
 * Hàm kiểm tra số nằm trong khoảng yêu cầu không?
 * @param {number} number Giá trị cần kiểm tra
 * @param {number} minPoint Điểm tối thiểu của giá trị
 * @param {number} maxPoint Điểm tối đa của giá trị
 * @param {any} selector Thẻ chứa lỗi cần hiển thị
 * @param {string} messErr Lỗi hiển thị UI
 */
function checkedNumber(number, minPoint, maxPoint, selector, messErr) {
    if (number < minPoint || number > maxPoint) {
        get(selector).innerHTML = messErr;
        get(selector).style.display = 'block';
        return false;
    } else {
        get(selector).innerHTML = '';
        return true;
    }
};
