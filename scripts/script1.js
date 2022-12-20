const btnEl1 = document.getElementById("btn1");
const btnEl2 = document.getElementById("btn2");
const btnEl3 = document.getElementById("btn3");
const btnEl4 = document.getElementById("btn4");

btnEl1.addEventListener("mouseover", (event) => {

    const x = event.pageX - btnEl1.offsetLeft;
    const y = event.pageY - btnEl1.offsetTop;

    btnEl1.style.setProperty("--xPos", x + "px");
    btnEl1.style.setProperty("--yPos", y + "px");
});
btnEl2.addEventListener("mouseover", (event) => {

    const x = event.pageX - btnEl2.offsetLeft;
    const y = event.pageY - btnEl2.offsetTop;

    btnEl2.style.setProperty("--xPos", x + "px");
    btnEl2.style.setProperty("--yPos", y + "px");
});
btnEl3.addEventListener("mouseover", (event) => {

    const x = event.pageX - btnEl3.offsetLeft;
    const y = event.pageY - btnEl3.offsetTop;

    btnEl3.style.setProperty("--xPos", x + "px");
    btnEl3.style.setProperty("--yPos", y + "px");
});
btnEl4.addEventListener("mouseover", (event) => {

    const x = event.pageX - btnEl4.offsetLeft;
    const y = event.pageY - btnEl4.offsetTop;

    btnEl4.style.setProperty("--xPos", x + "px");
    btnEl4.style.setProperty("--yPos", y + "px");
});
