let benzin = [
    { leiras: "1000 cm -ig 7,6 l/100km", norma: "7.6" },
    { leiras: "1001-1500 cm között 8,6 l/100km", norma: "8.6" },
    { leiras: "1501-2000 cm között 9,5 l/100km", norma: "9.5" },
    { leiras: "2001-3000 cm között 11,4 l/100km", norma: "11.4" },
    { leiras: "3001 cm fölött 13,3 l/100km", norma: "13.3" }
];

let gazolaj = [
    { leiras: "1500 cm -ig 5,7 l/100km", norma: "5.7" },
    { leiras: "1501-2000 cm között 6,7 l/100km", norma: "6.7" },
    { leiras: "2001-3000 cm között 7,6 l/100km", norma: "7.6" },
    { leiras: "3001 cm fölött 9,5 l/100km", norma: "9.5" }
];

let uzemanyag = document.querySelector("#uzemanyag");
uzemanyag.onchange = fuelSelect;
document.querySelector("body").onload = selectBenzinFeltolt;
document.querySelector(".maidatum").innerHTML += formatDate(Date());

function fuelSelect() {
    removeAllOption();
    switch (uzemanyag.value) {
        case 'benzin':
            selectBenzinFeltolt();
            break;
        case 'gazolaj':
            selectGazolajFeltolt();
            break;
    }
}

function removeAllOption() {
    let normaSelect = document.querySelector("#norma");
    for (let i = normaSelect.options.length - 1; i >= 0; i--) {
        normaSelect.options[i].remove();
    }
}

function selectBenzinFeltolt() {
    let normaSelect = document.querySelector("#norma");
    for (let i = 0; i < benzin.length; i++) {
        let option = document.createElement("option");
        option.innerHTML = Object.values(benzin[i])[0];
        normaSelect.appendChild(option);
    }
}

function selectGazolajFeltolt() {
    let normaSelect = document.querySelector("#norma");
    for (let i = 0; i < gazolaj.length; i++) {
        let option = document.createElement("option");
        option.innerHTML = Object.values(gazolaj[i])[0];
        normaSelect.appendChild(option);
    }
}

let calcButton = document.querySelector("input[name='szamol']");
calcButton.onclick = calcAmount;

function calcAmount() {
    adatkitolesEllenorzes();
    let utikoltseg = document.querySelector("#utikoltseg");
    let amortizacio = document.querySelector("#amortizacio");
    let osszeskoltseg = document.querySelector("#osszeskoltseg");
    let normaindex = document.querySelector("#norma").options.selectedIndex;
    let uzemanyagegysegar = Number(document.querySelector("#egysegar").value);
    let tavolsag = Number(document.querySelector("#tavolsag").value);
    let norma;
    switch (uzemanyag.value) {
        case 'benzin':
            norma = Number(Object.values(benzin[normaindex])[1]);
            break;
        case 'gazolaj':
            norma = Number(Object.values(gazolaj[normaindex])[1]);
            break;
    }
    //útiköltség = fogyasztási_norma * üzemanyagegységár * megtett_kilométer / 100
    utikoltseg.innerHTML = Math.round(norma * uzemanyagegysegar * tavolsag / 100) + " Ft";
    amortizacio.innerHTML = tavolsag * 15 + " Ft";
    osszeskoltseg.innerHTML = Math.round(norma * uzemanyagegysegar * tavolsag / 100) + tavolsag * 15 + " Ft";
}

let printButton = document.querySelector("input[name='nyomtat']");
printButton.onclick = printForm;

function adatkitolesEllenorzes() {
    let inputok = document.querySelectorAll("input");
    let hibauzenet = document.querySelector(".error");
    let ures = false;
    for (let i = 0; i < inputok.length; i++) {
        if (inputok[i].value == "") {
            ures = true;
            break;
        }
    }
    if (ures) {
        //alert("Minden mezőt kötelező kitölteni!");
        hibauzenet.innerHTML = "Minden mezőt kötelező kitölteni!";
        printButton.disabled = true;
    } else {
        hibauzenet.innerHTML = "";
        printButton.disabled = false;
    }
}

function printForm() {
        window.print();
}

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('.') + ".";
}