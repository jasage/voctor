//Data , List Plans
const parts = {
    af: 'противотуманки',
    bb: 'задний бампера',
    bed: 'торцы древей',
    fb: 'передний бампер',
    fh: 'капот полностью',
    fw: 'крылья полностью',
    h: 'ручки',
    l: 'фары',
    m: 'зеркала',
    ph: 'часть капота',
    pw: 'часть крыльев',
    r: 'пороги внутренние'
}
const listPlan = {
    'mini': ['r','bed','bb','m','l','h'],
    'standart': ['ph','pw','fb','m','l','h','af'],
    'standart1': ['fh','pw','fb','m','l','h','af'],
    'standart2': ['fh','fw','fb','m','l','h','af'],
    'standart3': ['fh','fw','bb','fb','m','l','h','af'],
    'full': ['af','bb','bed','fb','fh','fw','h','l','m','ph','pw','r']
} 

const cl = document.querySelector(".cl");
const min = document.querySelector(".minimum");
const mid = document.querySelector(".middle");
const prem = document.querySelector(".premium");
const list = document.querySelector(".plans");
const dlist = document.querySelector(".dropdown");
const pic = document.querySelector(".main-pic");
const partsImg = document.querySelector(".parts-img");
//Default Params
let defpl = 'standart2';
let defcl = 'mercedes';
//Set Main Image
function setImg(cl,plan){
    pic.innerHTML = `<div class="${cl} ${plan}"></div>`;
    let check = document.querySelector(".dropdown>.active");
    partsImg.hidden = check ? false : true;
    if(listPlan[plan]){
        partsImg.innerHTML = "";
        listPlan[plan].forEach((val)=>{
            let div = document.createElement('div');
            div.innerHTML = `<span class="partial ${val}"></span><p>${parts[val]}</p>`;
            partsImg.appendChild(div);
        })
    }
}
//Change selected class
function remove(el, pr){
    if(el){
        let span = el.cloneNode(true);
        if(el.parentElement !== pr){
            pr.appendChild(span);
            el.remove();
        }
    }
}
//Set Img by selected plan
function reset(hidden, plan){
    if(hidden){
        let al = document.querySelectorAll(".active");
        if(al){
            al.forEach(val=>{val.classList.remove('active');})
        }
        if(plan){
            setImg(defcl, plan.dataset.plan);
        }else{
            document.querySelector(`[data-plan=${defpl}]`).classList.add('active');
            setImg(defcl, defpl);
        }
    }
}
//Default Setting
reset(true);

//Choose Classes
cl.addEventListener("click",function(e){
    let chosen = document.querySelector(".chosen");
    dlist.hidden = true;
    if(min.contains(e.target)){
        remove(chosen, min);
        defcl = 'citroen';
    }
    if(mid.contains(e.target)){
        remove(chosen, mid)
        defcl = 'mazda';
    }
    if(prem.contains(e.target)){
        remove(chosen, prem)
        defcl = 'mercedes';
    }
    reset(dlist.hidden);
})
//On Hover plans elements
list.addEventListener("mouseover",function(e){
    if(e.target === list.lastElementChild || list.lastElementChild.contains(e.target) || e.target === list)return;
    let al = document.querySelector(".plans>li.active");
    if(al){
        al.classList.remove('active');
    }
    e.target.classList.add('active');
    setImg(defcl, e.target.dataset.plan);
});

dlist.addEventListener("mouseover",function(e){
    if(e.target === dlist)return;
    let al = document.querySelector(".dropdown>li.active");
    if(al){
        al.classList.remove('active');
    }
    e.target.classList.add('active');
    setImg(defcl, e.target.dataset.plan);
});
//On Click partial
list.lastElementChild.addEventListener("click",function(e){
    if(e.target !== list.lastElementChild)return;
    dlist.hidden = !dlist.hidden;
    reset(dlist.hidden, document.querySelector(".plans>li.active"));
})