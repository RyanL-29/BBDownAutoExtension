const schedule = require('node-schedule');
const { exec } = require('child_process');
const iconvLite = require('iconv-lite');
const fs = require('fs');
let jsonRaw = fs.readFileSync('config.json');
let settings = JSON.parse(jsonRaw);
var time_setting = '0 */' + settings.interval + ' * * * *';
var j = schedule.scheduleJob(time_setting, async function () {
    var arg = buildArg();
    DebugPrint(arg);
    var bangumiLists = await bangumiList();
    DebugPrint(bangumiLists)
    bangumiLists.forEach(element => DebugPrint(element))
    bangumiLists.forEach(element => executeProcess(arg, element))
})

function buildArg() {
    let jsonRaw = fs.readFileSync('config.json');
    let settings = JSON.parse(jsonRaw)
    var argc = ""
    if (settings.tv == true) {
        argc += "-tv" + " "
    }
    else if (settings.app == true) {
        argc += "-app" + " "
    }

    if (settings.intl == true) {
        argc += "-intl" + " "
    }

    if (settings.use_mp4box == true) {
        argc += "--use-mp4box" + " "
    }

    if (settings.only_hevc == true) {
        argc += "-hevc" + " "
    }
    else if (settings.only_avc == true) {
        argc += "-avc" + " "
    }
    else if (settings.only_info == true) {
        argc += "-info" + " "
    }

    if (settings.hide_streams == true) {
        argc += "-hs" + " "
    }

    if (settings.interactive == true) {
        argc += "-ia" + " "
    }

    if (settings.show_all == true) {
        argc += "--show-all" + " "
    }

    if (settings.use_aria2c == true) {
        argc += "--use-aria2c" + " "
    }

    if (settings.multi_thread == true) {
        argc += "-mt" + " "
    }

    if (settings.range != null) {
        argc += "-p "+ settings.range + " "
    }

    if (settings.audio_only == true) {
        argc += "--audio-only" +  " "
    }
    else if (settings.video_only == true) {
        argc += "--video-only" + " "
    }
    else if (settings.sub_only == true) {
        argc += "--sub-only" + " "
    }

    if (settings.zerofill == false) {
        argc += "--no-padding-page-num" + " "
    }

    if (settings.debug_bbdown == true) {
        argc += "--debug" + " "
    }

    if (settings.skip_mux == true) {
        argc += "--skip-mux" + " "
    }

    if (settings.language != false) {
        argc += "--language " + settings.language + " "
    }

    if (settings.access_token != false) {
        argc += "--language " + settings.access-token + " "
    }

    if (settings.interval < 1) {
       time_setting = 1
    }
    else
    {
        time_setting = settings.interval;
    }

    return argc;
}

async function bangumiList() {
    return new Promise((resolve, reject) => {
        fs.readFile('list.txt', 'utf8', function (err, data) {
            if (err) throw err;
            console.log('正在讀取: ' + 'list.txt');
            var list = data.replace(/[^\S\r\n]/g, '');
            list = list.split(/[\r\n]+/);
            var outpath = "";
            list = list.filter(function (entry) { return /\S/.test(entry); });
            list.forEach(function (part, index) {
                if (this[index].indexOf("@") > -1) {
                    if (this[index].split("@")[1] != "") {
                        outpath = "-o " + this[index].split("@")[1] + " ";
                        DebugPrint(outpath);
                    }
                }

                this[index] = outpath + this[index].split("#")[0];
            }, list);
            list = list.filter(function (comment) {
                return comment.toLowerCase().indexOf("@") == -1;
            });
            DebugPrint(list);
            DebugPrint(list);
            console.log('已添加 ' + list.length + '個任務')
            resolve(list);
        });
    });
}

function executeProcess(arg, bangumiList) {
    exec('BBDown.exe ' + arg + ' ' + bangumiList,{ encoding: 'buffer' }, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`stdout: ${iconvLite.decode(stdout, 'Big5')}`);
        //console.log(stdout);
    });
}

function DebugPrint(words) {
    let jsonRaw = fs.readFileSync('config.json');
    let settings = JSON.parse(jsonRaw)
    if (settings.debug == true) {
        console.log("Debug", words)
    }
}