document.addEventListener('DOMContentLoaded', function () {
    // Create a style element and add CSS rules
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.checkout_offer_offer_price_override { margin-bottom: 0 !important; }';
    document.head.appendChild(style);

    var h1Content = document.querySelector('.js-checkout-panel-price-discountable').textContent;

    var basePriceInput = document.querySelector('#checkout_offer_offer_price_override');
    var basePrice = basePriceInput ? parseFloat(basePriceInput.value) : 1800.00;

    var additionalPricePerParticipant = basePrice;

    var payWhatYouWantInput = document.querySelector('#pay-what-you-want-input');
    if (payWhatYouWantInput) {
        var labelElement = payWhatYouWantInput.querySelector('label');
        if (labelElement) {
            labelElement.textContent = h1Content;
        }

        if (basePriceInput) {
            basePriceInput.style.display = 'none';
        }

        var quantitySelector = document.createElement('div');
        quantitySelector.className = 'custom-quantity-selector';
        quantitySelector.style.paddingTop = '10px';
        quantitySelector.style.paddingBottom = '10px';

        var plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', function (event) {
            incrementQuantity(event);
        });
        plusButton.style.marginLeft = '5px';

        var minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', function (event) {
            decrementQuantity(event);
        });
        minusButton.style.marginRight = '5px';

        var quantitySpan = document.createElement('span');
        quantitySpan.textContent = '1 participant'; // Default quantity to 1

        quantitySelector.appendChild(minusButton);
        quantitySelector.appendChild(quantitySpan);
        quantitySelector.appendChild(plusButton);

        var targetDiv = payWhatYouWantInput.parentElement;
        targetDiv.appendChild(quantitySelector);

        var selectedQuantity = 1; // Default quantity to 1

        function incrementQuantity(event) {
            if (selectedQuantity < 5) {
                selectedQuantity++;
                updateQuantityDisplay();
            }
            event.preventDefault();
        }

        function decrementQuantity(event) {
            if (selectedQuantity > 1) {
                selectedQuantity--;
                updateQuantityDisplay();
            }
            event.preventDefault();
        }

        function updateQuantityDisplay() {
            quantitySpan.textContent = selectedQuantity;
        }

        function updatePrice() {
            var totalPrice = basePrice + (selectedQuantity - 1) * additionalPricePerParticipant;
            if (basePriceInput) {
                basePriceInput.value = totalPrice.toFixed(2);
            }

            var h1Element = document.querySelector('.js-checkout-panel-price-discountable');
            if (h1Element) {
                h1Element.textContent = '$' + totalPrice.toFixed(2);
            }
        }

        updatePrice();
    }
});
