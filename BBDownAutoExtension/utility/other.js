//Calculate Size
module.exports.getfilesize = function (fileSizeInBytes) {
    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + " " +byteUnits[i];
};


//Calculate Date
module.exports.getCurrentdate = function(dateTime){
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);

    // current minutes
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // current seconds
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    if (dateTime) {
        var current =  year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    } else {
        var current =  year + "-" + month + "-" + date;
    }
    

    return current;
};

//Calculate Date
module.exports.getdateFormat = function(timeStamp, dateTime){
    let date_ob = new Date(timeStamp);

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);

    // current minutes
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // current seconds
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    if (dateTime) {
        var current =  year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    } else {
        var current =  year + "-" + month + "-" + date;
    }
    

    return current;
};


module.exports.printProgress = function(progress) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(progress);
}