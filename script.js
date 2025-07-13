const $charm_list = document.getElementById('charm-list');
const $config = document.getElementById('config');

const config = {
  'kingsoul': 0,
  'grimmchild': 0
};

const charms = {
  'Wayward Compass': 1,
  'Gathering Swarm': 1,
  'Stalwart Shell': 2,
  'Soul Catcher': 2,
  'Shaman Stone': 3,
  'Soul Eater': 4,
  'Dashmaster': 2,
  'Sprintmaster': 1,
  'Grubsong': 1,
  'Grubberfly_s Elegy': 3,
  'Unbreakable Heart': 2,
  'Unbreakable Greed': 2,
  'Unbreakable Strength': 3,
  'Spell Twister': 2,
  'Steady Body': 1,
  'Heavy Blow': 2,
  'Quick Slash': 3,
  'Longnail': 2,
  'Mark of Pride': 3,
  'Fury of the Fallen': 2,
  'Thorns of Agony': 1,
  'Baldur Shell': 2,
  'Flukenest': 3,
  'Defender_s Crest': 1,
  'Glowing Womb': 2,
  'Quick Focus': 3,
  'Deep Focus': 4,
  'Lifeblood Heart': 2,
  'Lifeblood Core': 3,
  'Joni_s Blessing': 4,
  'Hiveblood': 4,
  'Spore Shroom': 1,
  'Sharp Shadow': 2,
  'Shape of Unn': 2,
  'Nailmaster_s Glory': 1,
  'Weaversong': 2,
  'Dream Wielder': 1,
  'Dreamshield': 3,
  'Grimmchild': 2,
  'Carefree Melody': 3,
  'Kingsoul': 5
}

function setCharm(charm, pos=1) {
  const notch = document.createElement('span');
  notch.classList.add('charm');
  notch.style.backgroundImage = `url('img/${charm}.png')`;
  notch.style.animationDelay = (pos * 30) + 'ms';
  $charm_list.appendChild(notch);
}

function getRandom() {
  $charm_list.innerHTML = '';
  let slots = Number(document.getElementById('notch-count')?.value) || 11;
  let selected = [];

  const validCharms = charmsConfig();

  while(slots > 0 && selected.length < Object.keys(validCharms).length) {
    let ch = Math.round(Math.random() * Object.keys(validCharms).length);
    let charm = Object.keys(validCharms)[ch];

    if(!selected.includes(ch) && validCharms[charm] <= slots) {
      selected.push(ch);
      slots -= validCharms[charm];
      setCharm(charm, selected.length);
    }
  }
}

function charmsConfig() {
  const list = {...charms};
  for(let charm in charms) {
    if(!validConfig(charm)) {
      delete list[charm];
    }
  }
  return list;
}

function validConfig(charm) {
  switch(charm) {
    case 'Kingsoul':
      return config.kingsoul === 1;
      break;
    case 'Grimmchild':
      return config.grimmchild === 0;
      break;
    case 'Carefree Melody':
      return config.grimmchild === 1;
      break;
  }
  return true;
}

function toggleConfigDiv() {
  $config.toggleAttribute('visible');
}

function toggleConfigOption(el) {
  const options = [...el.children];
  options.forEach(op => op.toggleAttribute('active'));
  config[el.getAttribute('config')] = options.findIndex(e => e.hasAttribute('active'));
}