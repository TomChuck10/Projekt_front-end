const btnEl1 = document.getElementById("btn");


btnEl1.addEventListener("mouseover", (event) => {

    const x = event.pageX - btnEl1.offsetLeft;
    const y = event.pageY - btnEl1.offsetTop;

    btnEl1.style.setProperty("--xPos", x + "px");
    btnEl1.style.setProperty("--yPos", y + "px");
});
