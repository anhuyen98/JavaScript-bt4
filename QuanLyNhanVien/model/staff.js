function Staff( _account, _name, _email, _password, _workingDays, _basicSalary, _position, _workingHours) {
    this.account = _account;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.workingDays = _workingDays;
    this.basicSalary = _basicSalary;
    this.position = _position;
    this.workingHours = _workingHours;
    this.totalSalary = function(position) {

        if (position === 'Giám đốc') {
            return this.basicSalary * 3;
        } else if (position === 'Trưởng phòng') {
            return this.basicSalary * 2;
        } else {
            return this.basicSalary;
        }
        
    };
    this.rank = function(workingHours) {

        if (workingHours >= 192) {
            return 'Xuất sắc';
        } else if (workingHours >= 176) {
            return 'Giỏi';
        } else if (workingHours >= 160) {
            return 'Khá';
        } else {
            return 'Trung bình';
        }

    };
}