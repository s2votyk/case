
let xp = 0;
let hp = 100;
let gold = 50;
let vukhi = 0;
let fighting;
let monsterHp;
let hanhtrang = ['gậy gỗ'];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const hpText = document.querySelector('#hpText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterName');
const monsterhpText = document.querySelector('#monsterhp');

const monsters = [
    {
        name: "Darkwolf",
        level: 5,
        hp: 60
    },
    {
        name: 'Dragon',
        level: 20,
        hp: 360
    },
    {
        name: 'Demon',
        level: 45,
        hp: 620
    }
]

const weapons = [
    {
        name: 'Gậy gỗ',
        power: 5
    },{
        name: 'Dao găm',
        power: 22
    },{
        name: 'Búa sét',
        power: 49
    },{
        name: 'Rìu leviathan',
        power: 68
    },{
        name: 'Kiếm athur',
        power: 83
    },{
        name: 'Trượng odin',
        power: 100
    }
]

const locations = [{
    name: 'backroom',
    "button text":['Đến cửa hàng.','Đến ngục tối.','Đánh boss.'],
    "button function":[goStore,goDungeon,fightboss],
    text: 'hãy tiếp tục hành trình của bạn.Bạn thấy một dấu hiệu cho biết \"store\".'
},{
    name: 'store',
    "button text":['hồi phục 30 hp(20 gold).','mua trang bị(50 gold).','Quay trở về.'],
    "button function":[Buyhp,BuyWeapon,comeback],
    text: 'chào mùng bạn đến với của hàng'
},{
    name: 'dungeon',
    "button text":['Darkwolf','Dragon','Quay trở về.'],
    "button function":[fightmonsters,fightleader,comeback],
    text: 'bạn tiến vào hầm ngục và thấy rất nhiều quái vật'
},{
    name: 'fight',
    "button text":['tấn công','né tránh','Quay trở về.'],
    "button function":[Attack,Dodge,comeback],
    text: 'bạn tiến đến và đánh nhau với quái vật'
},{
    name: 'kill monsters',
    "button text":['quay trở lại','quay trở lại','Quay trở về.'],
    "button function":[comeback,comeback,comeback],
    text: 'Quái vật đã bị tiêu diệt bạn nhận được gold and xp'
},{
    name: 'lose',
    "button text":['chơi lại.','chơi lại.','chơi lại.'],
    "button function":[restart,restart,restart],
    text: 'quái vật đã tiêu diệt bạn.'
},{
    name: 'win',
    "button text":['chơi lại.','chơi lại.','chơi lại.'],
    "button function":[restart,restart,restart],
    text: 'bạn đã đánh bại được trùm hầm ngục.'
}]

button1.onclick = goStore;
button2.onclick = goDungeon;
button3.onclick = fightboss;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button function"][0];
    button2.onclick = location["button function"][1];
    button3.onclick = location["button function"][2];
    text.innerText = location.text;
}
function comeback() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goDungeon() {
    update(locations[2]);
}
function Buyhp() {
    if(gold>=20){
        gold -=  20
        hp +=  30
        goldText.innerText = gold
        hpText.innerText = hp
    }else {
        text.innerText = "bạn không có đủ vàng"
    }
}

function BuyWeapon() {
    if(vukhi<weapons.length - 1){
        if (gold>=50) {
            gold -= 50;
            vukhi++;
            let newWeapons = weapons[vukhi].name;
            text.innerText = "bạn vừa nhận được " + newWeapons + ".";
            hanhtrang.push(newWeapons);
            text.innerText += "Hành trang của bạn có: " + hanhtrang;
            goldText.innerText=gold
        }else {
            text.innerText = "bạn không có đủ vàng để mua vũ khí."
        }
    }else {
        text.innerText = "hành trang của bạn đã đầy";
        button2.innertext= "bán trang bị nhận 30 vàng";
        button2.onclick= sellWeapon;
    }

} function sellWeapon() {
    if (hanhtrang.length > 1){
        gold += 30
        goldText.innerText = gold;
        vukhi = hanhtrang.shift();
        text.innerText = 'bạn đã bán '+ vukhi +".";
        text.innerText += "Hành trang của bạn có: " + hanhtrang;
    }else {
        text.innerText = "bạn không thể bán bất kỳ vũ khí."
    }
}
function fightmonsters() {
    fighting = 0;
    gofight();
}
function fightleader() {
    fighting = 1;
    gofight();
}
function fightboss() {
    fighting = 2;
    gofight();
}
function gofight(){
    update (locations[3])
    monsterHp = monsters[fighting].hp;
    monsterStats.style.display = 'block';
    monsterNameText.innerText = monsters[fighting].name;
    monsterhpText.innerText = monsterHp;
}function Attack() {
    text.innerText = 'quái vật'+ monsters[fighting].name + 'tấn công.'
    text.innerText = 'Bạn tấn công chúng bằng'+ weapons[vukhi].name + '.'
    if (isMonsterHit()){
        hp -= getMonsterAttackValue(monsters[fighting].level);
    }else {text.innerText = 'bạn đã né'}
    monsterHp -= weapons[vukhi].power + Math.floor(Math.random() * xp) + 1;
    hpText.innerText = hp;
    monsterhpText.innerText = monsterHp;
    if (0>=hp){
        lose();
    }
    else if (monsterHp<=0) {
        fighting === 2 ? winGame() : defeatMonster();
    }

    if (Math.random() <= .1 && hanhtrang.length !== 1){
        text.innerText += 'trang bị' + hanhtrang.pop() + "của bạn đã bị hỏng.";
        vukhi--;
    }
}
function getMonsterAttackValue(level) {
    let hit = ([level]*5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}
function isMonsterHit() {
    return Math.random() > .2;
}
function Dodge() {
    text.innerText = "bạn đã né đòn tấn công của "+ monsters[fighting].name + ".";
}
function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += Math.floor(monsters[fighting].level * 3.2);
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose() {
    update(locations[5])
}
function winGame() {
    update(locations[6])
}
function restart(){
    xp = 0;
    hp = 100;
    gold = 50;
    vukhi = 0;
    hanhtrang = ['gậy gỗ'];
    goldText.innerText = gold;
    hpText.innerText = hp;
    xpText.innerText = xp;
    comeback();
}