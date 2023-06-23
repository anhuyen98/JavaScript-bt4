function StaffList() {
    // setArray
    this.arrStaffList = [];

    // add
    this.add = function (staff) {
        this.arrStaffList.push(staff)
    }

    // findIndex
    this.findIndex = function ( _account) {

        for (var i = 0; i < this.arrStaffList.length; i++) {
            if (this.arrStaffList[i].account === _account) {
                return i;
            }
        }

        return -1;
    };

    // remove
    this.remove = function ( _account) {
        var _accountIndex = this.findIndex( _account);

        if (_accountIndex !== -1) {
            this.arrStaffList.splice( _accountIndex, 1);
        }
    }

    // update
    this.update = function (staff) {
        var _indexStaff = this.findIndex(staff.account);
        
        if (_indexStaff !== -1) {
            this.arrStaffList[_indexStaff] = staff;
        }
    }
}