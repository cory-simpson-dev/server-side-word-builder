document.querySelector('.cvc').addEventListener('click', addCVC)
document.querySelector('.vp').addEventListener('click', addVP)
document.querySelector('.ha').addEventListener('click', addHA)
document.querySelector('.save').addEventListener('click', save)
document.querySelector('.clear').addEventListener('click', clearField)
document.querySelector('.see-saved').addEventListener('click', seeSaved)

async function addCVC(){

  const res = await fetch(`/api?key=cvc`)
  const data = await res.json()

  console.log(data);
  document.querySelector(".word").textContent += data.cvc
}
async function addVP(){

    const res = await fetch(`/api?key=vp`)
    const data = await res.json()
  
    console.log(data);
    document.querySelector(".word").textContent += data.vp
}
async function addHA(){

    const res = await fetch(`/api?key=ha`)
    const data = await res.json()
  
    console.log(data);
    document.querySelector(".word").textContent += data.ha
}

function allStorage() {
    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    return values;
}

function save() {
    // save to local storage
    if (document.querySelector(".word").textContent.length>0) {
        // save to local storage
        localStorage.setItem(`word-${Math.random()}`, document.querySelector(".word").textContent);
    } else {
        alert('Must have a word > 0 characters to save');
    }
    
    // clear word field
    document.querySelector(".word").textContent = ''
}

function clearField() {
    document.querySelector(".word").textContent = ''
}

let toggle=0;

function seeSaved() {
    let saved = allStorage();
    // update attachLocal content
    document.querySelector('.attachLocal').textContent = saved.join(' | ');
    // toggle saved block
    if (toggle===0) {
        document.querySelector('.saved').style.display = 'block';
        toggle++;
    } else if (toggle===1) {
        document.querySelector('.saved').style.display = 'none';
        toggle--;
    }
}
