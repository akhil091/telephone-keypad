var button = document.querySelectorAll('button'),
    input = document.querySelector('input'),
    busy = true, /* flag to check if button is pressed within the delay time*/
    hold,
    is_busy,
    delay = 600, /* delay time */
    change = -1, /* index of text array */
    click = null;

/* loop through each button */
for (var i = 0, len = button.length; i < len; ++i) {
    button[i].onmousedown = function(e) {
        var text = this.getAttribute('data-text').split(""), /* split text into an array when clicked on button */
            number = this.getAttribute('data-number');
        busy = true;
        clearTimeout(is_busy); /* prevent setTimeout called in onmouseup funtion */
        if (click !== e.target) {
            busy = false;
        }
        /* set the index to point the first element of text array if the current index is last */
        if (change >= text.length - 1 || click !== e.target) {
            change = 0;
            click = e.target;
        } else {
            change = change + 1; /* increment the index to point the next element of text array */
        }
        if (text[0] === '-') {
            input.value = input.value.slice(0, -1); /* erasing element one by one */
            hold = setTimeout(function() { /* erase full text if long press */
                input.value = "";
            }, delay);
            return;
        }
        hold = setTimeout(function() { /* print number only if long press */
            input.value = input.value.slice(0, -1) + number;
        }, delay);
        input.value = busy ? input.value.slice(0, -1) + text[change] : input.value + text[change]; /* if busy is true, replace the last character with new character, else add new charater */
    };
    button[i].onmouseup = function(e) {
        clearTimeout(hold);
        busy = true;
        /* reset the values if button is not pressed again within the delay */
        is_busy = setTimeout(function() {
            change = -1;
            busy = false;
            e.target = null;
            click = null;
        }, delay);
    };
}