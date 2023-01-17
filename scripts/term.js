var firstSeatLabel = 10;
var booked = !!localStorage.getItem('booked') ? $.parseJSON(localStorage.getItem('booked')) : [];
$(document).ready(function() {
    var $cart = $('#selected-seats'),
        $counter = $('#counter'),
        $total = $('#total'),
        sc = $('#bus-seat-map').seatCharts({
            map: [
                'eee',
                'eee',
                'eee',
            ],
            seats: {
                e: {
                    
                    classes: 'economy-class', //your custom CSS class
                    category: 'Godzina'
                }

            },
            naming: {
                top: false,
                getLabel: function(character, row, column) {
                    return firstSeatLabel++;
                },
            },
            legend: {
                node: $('#legend'),
                items: [

                    ['e', 'available', 'Wolny termin'],
                    ['f', 'unavailable', 'Zarezerwowany termin']
                ]
            },
            click: function() {
                if (this.status() == 'available') {
                    //let's create a new <li> which we'll add to the cart items
                    $('<li>' + this.data().category + '  ' + this.settings.label + ': <a href="#" class="cancel-cart-item">[anuluj]</a></li>')
                        .attr('id', 'cart-item-' + this.settings.id)
                        .data('seatId', this.settings.id)
                        .appendTo($cart);

                    /*
                     * Lets update the counter and total
                     *
                     * .find function will not find the current seat, because it will change its stauts only after return
                     * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                     */
                    $counter.text(sc.find('selected').length + 1);
                    $total.text(recalculateTotal(sc) + this.data().price);

                    return 'selected';

                } else if (this.status() == 'selected') {

                    //update the counter
                    $counter.text(sc.find('selected').length - 1);

                    //and total
                    $total.text(recalculateTotal(sc) - this.data().price);

                    //remove the item from our cart
                    $('#cart-item-' + this.settings.id).remove();

                    //seat has been vacated
                    return 'available';

                } else if (this.status() == 'unavailable') {
                    //seat has been already booked
                    return 'unavailable';
                } else {
                    return this.style();
                }
            }
        });

    //this will handle "[cancel]" link clicks
    $('#selected-seats').on('click', '.cancel-cart-item', function() {
        //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
        sc.get($(this).parents('li:first').data('seatId')).click();
    });

    //let's pretend some seats have already been booked
    // sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');
    sc.get(booked).status('unavailable');

});

function recalculateTotal(sc) {
    var total = 0;

    //basically find every selected seat and sum its price
    sc.find('selected').each(function() {

        total += this.data().price;

    });

    return total;
}

$(function() {
    $('#checkout-button').click(function() {
        var items = $('#selected-seats li')
        if (items.length <= 0) {
            alert("Proszę wybrać termin")
            return false;
        }
        var selected = [];
        items.each(function(e) {
            var id = $(this).attr('id')
            id = id.replace("cart-item-", "")
            selected.push(id)
        })
        if (Object.keys(booked).length > 0) {
            Object.keys(booked).map(k => {
                selected.push(booked[k])
            })
        }
        localStorage.setItem('booked', JSON.stringify(selected))
        alert("Termin został zarezerwowany")
        location.reload()
    })
    $('#reset-btn').click(function() {
        if (confirm("Czy jesteś pewny że chcesz anulować rezerwację?") === true) {
            localStorage.removeItem('booked')
            alert("Rezerwacja została anulowana pomyślnie")
            location.reload()
        }
    })
})