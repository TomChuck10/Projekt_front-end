const toggleButton = document.getElementsByClassName('toggle')[0];
const items = document.getElementsByClassName('item');
toggleButton.addEventListener("click", function () {
    for (var i = 0; i < items.length; i++)
        items[i].classList.toggle("active");
});