const { join } = require('path');
const axios = require('axios');

const angermeMemberList = [
   /和田彩花/,
   /福田花音/,
   /前田憂佳/,
   /小川紗季/,
   /小数賀芙由香/,
   /中西香菜/,
   /竹内朱莉/,
   /勝田里奈/,
   /田村芽実/,
   /室田瑞希/,
   /相川茉穂/,
   /佐々木莉佳子/,
   /上國料萌衣/,
   /笠原/,
   /船木結/,
   /川村文乃/,
   /太田遥香/,
   /伊勢鈴蘭/,
   /橋迫鈴/,
   /川名凜/,
   /為永幸音/,
   /松本わかな/,
   /平山遊季/,
   /下井谷幸穂/,
   /後藤花/
]

const angerme_join_exit = [
    { "name": "和田彩花", "join_date": new Date(2009, 4, 4), "exit_date": new Date(2019, 6, 18)},
    { "name": "福田花音", "join_date": new Date(2009, 4, 4), "exit_date": new Date(2015, 11, 29)},
    { "name": "前田憂佳", "join_date": new Date(2009, 4, 4), "exit_date": new Date(2011, 12, 31)},
    { "name": "小川紗季", "join_date": new Date(2009, 4, 4), "exit_date": new Date(2011, 8, 27)},
    { "name": "小数賀芙由香", "join_date": new Date(2011, 8, 14), "exit_date": new Date(2011, 9, 9)},
    { "name": "中西香菜", "join_date": new Date(2011, 8,14), "exit_date": new Date(2019, 12, 10)},
    { "name": "竹内朱莉", "join_date": new Date(2011, 8,14), "exit_date": new Date(2099, 12, 31)},
    { "name": "勝田里奈", "join_date": new Date(2011, 8,14), "exit_date": new Date(2019, 9, 25)},
    { "name": "田村芽実", "join_date": new Date(2011, 8,14), "exit_date": new Date(2016, 5, 30)},
    { "name": "室田瑞希", "join_date": new Date(2014, 10, 4), "exit_date": new Date(2020, 3, 22)},
    { "name": "相川茉穂", "join_date": new Date(2014, 10, 4), "exit_date": new Date(2017, 1, 11)}, // 休業開始日をExit日とする
    { "name": "佐々木莉佳子", "join_date": new Date(2014, 10, 4), "exit_date": new Date(2024, 06, 16)},
    { "name": "上國料萌衣", "join_date": new Date(2015, 11, 11), "exit_date": new Date(2099, 12, 31)},
    { "name": "笠原", "join_date": new Date(2016, 7, 16), "exit_date": new Date(2021, 11, 15)},
    { "name": "船木結", "join_date": new Date(2017, 6, 26), "exit_date": new Date(2020, 12, 9)},
    { "name": "川村文乃", "join_date": new Date(2017, 6, 26), "exit_date": new Date(2024, 11, 28)},
    { "name": "太田遥香", "join_date": new Date(2018, 11, 23), "exit_date": new Date(2020, 2, 28)}, // 休業開始日をExit日とする
    { "name": "伊勢鈴蘭", "join_date": new Date(2018, 11, 23), "exit_date": new Date(2099, 12, 31)},
    { "name": "橋迫鈴", "join_date": new Date(2019, 9, 25), "exit_date": new Date(2099, 12, 31)}, // 本当の加入日は2019/7/3だがパフォーマン開始日を加入日とする
    { "name": "川名凜", "join_date": new Date(2020, 11, 2), "exit_date": new Date(2099, 12, 31)},
    { "name": "為永幸音", "join_date": new Date(2020, 11, 2), "exit_date": new Date(2099, 12, 31)},
    { "name": "松本わかな", "join_date": new Date(2020, 11, 2), "exit_date": new Date(2099, 12, 31)},
    { "name": "平山遊季", "join_date": new Date(2021, 12, 30), "exit_date": new Date(2099, 12, 31)},
    { "name": "後藤花", "join_date": new Date(2023, 5, 23), "exit_date": new Date(2099, 12, 31)},
    { "name": "下井谷幸穂", "join_date": new Date(2023, 5, 23), "exit_date": new Date(2099, 12, 31)},
]

const angermeList = [
   /[あアｱ][んンﾝ][じジｼﾞ][ゅュｭ][るルﾙ]*[むムﾑ]*/,
   /[AaＡａ][NnＮｎ][GgＧｇ][EeＥｅ][RrＲｒ][MmＭｍ][EeＥｅ]/
 ]

function checkAngerme(x) {
  for(const tl of angermeList) {
    if(tl.test(x)) return true;
  }
  
  if(/笠原桃奈/.test(x)) return true;
  return false;
}

function addSignal(x, member) {
    if(member.test(x)) return ",o";
    return ",x";
}

function addAngermeSignal(date) {
    let text = "";
    for(const member of angerme_join_exit) {
        if(date.getTime() < member.join_date.getTime()) {
            text = text + ",x";
        } else if(member.exit_date.getTime() < date.getTime()) {
            text = text + ",x";
        } else {
            text = text + ",o";
        }
    }
    return text;
}

function doRequest(url) {
  return axios.get(url).then(res => res.data);
}

async function fetch(year, month) {
    const url = "https://sayum.in/cgi/webcal/webcal.php?year=" + year + "&mon=" + month;
    const result = (await doRequest(url))
    .replace(/\n/g, '')
    .replace(/^.*<TABLE(.*)<\/TABLE>.*$/, '$1')
    .replace(/<TD[^>]+>/g, '<TD>');
    const day_rows = result.split('<TR>');
    for(const day_row of day_rows) {
        const column = day_row.split('<TD>')
        if(column.length != 5) continue; // Length should be 5. 
        const day = column[1].replace(/^.*>([0-9]+)<\/A.*$/, '$1');
        const events = column[4].split("<BR>");
        for(let event of events) {
            
            if(!/場所/.test(event)){
                continue;
            }
            event = event.replace(/<[^>]+>/g, '');
            if(checkAngerme(event)) {
                const date = new Date(year, month, day)
                const regex = /^.*場所：([^・]+)・(.*)$/
                const place = event.replace(regex, '$1');
                const hako = event.replace(regex, '$2');
                
                let output = `${year}/${month}/${day},${place},${hako},${event}`
                
                if(/アンジュルム/.test(event)) {
                    output = output + addAngermeSignal(date);
                    console.log(output)
                } else {
                    for(const member of angermeMemberList) {
                       output = output + addSignal(event, member);
                    }
                    console.log(output)
                }
            }
        }
    }
};


async function run() {
    console.log(`DATE,PREFECTURE,PLACE,CONTENT,${angermeMemberList.join(",").toString().replace(/\//g, '')}`);
    for(const year of [
            2025,
            2024,
            2023,
            2022,
            2021,
            2020,
            2019,
            2018,
            2017,
            2016,
            2015
        ]) {
        for(const month of [12,11,10,9,8,7,6,5,4,3,2,1]) {
            await fetch(year, month);
        }
    }
}

run().then();
