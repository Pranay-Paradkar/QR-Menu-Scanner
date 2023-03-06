let purchase = [];
let localCartData = localStorage.getItem("cart")
console.log(localCartData)
if(localCartData != null){
    localCartData = JSON.parse(localCartData)
    purchase = localCartData.map(e=>{
      return {id : e.id, name : e.name, price : e.price}
    })
}

const message = document.querySelector(".message");
if(purchase.length == 0){
  if(message.classList.contains("success")) message.classList.remove("success");
  message.classList.add("failure")
  message.textContent = "Nothing at the cart, please add product to the cart"
}else {
  if(message.classList.contains("failure")) message.classList.remove("failure");
  message.classList.add("success")
  function calculateprice(){
    let price = 0;
    for(let i = 0; i<purchase.length; i++){
      price += purchase[i].price;
    }
    return price;
  }
  
  const total_amount = calculateprice() * 100;
  const shipping_fee = 0 * 100;
  message.textContent = `Total Amount : ${total_amount/100} rs`;
  
  
var stripe = Stripe(
  'pk_test_51McNPZSHzLMmKSdt6kHrozwxu3kRb5abyqgBKrsxTALZdYdGSiAOYangY0peZwiA5jHUKYBJAf3PN8hZhgfyPbNS003ppiMoet'
);

// The items the customer wants to buy

// Disable the button until we have Stripe set up on the page
document.querySelector('button').disabled = true;
fetch('/stripe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ purchase, total_amount, shipping_fee }),
})
  .then(function (result) {
    return result.json();
  })
  .then(function (data) {
    var elements = stripe.elements();

    var style = {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };

    var card = elements.create('card', { style: style });
    // Stripe injects an iframe into the DOM
    card.mount('#card-element');

    card.on('change', function (event) {
      // Disable the Pay button if there are no card details in the Element
      document.querySelector('button').disabled = event.empty;
      document.querySelector('#card-error').textContent = event.error
        ? event.error.message
        : '';
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      // Complete payment when the submit button is clicked
      payWithCard(stripe, card, data.clientSecret);
    });
  });

// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function (stripe, card, clientSecret) {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    })
    .then(function (result) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        // The payment succeeded!
        orderComplete(result.paymentIntent.id);
        localStorage.removeItem("cart")
      }
    });
};

/* ------- UI helpers ------- */

// Shows a success message when the payment is complete
var orderComplete = function (paymentIntentId) {
  loading(false);
  document
    .querySelector('.result-message a')
    .setAttribute(
      'href',
      'https://dashboard.stripe.com/test/payments/' + paymentIntentId
    );
  document.querySelector('.result-message').classList.remove('hidden');
  document.querySelector('button').disabled = true;
};

// Show the customer the error from Stripe if their card fails to charge
var showError = function (errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector('#card-error');
  errorMsg.textContent = errorMsgText;
  setTimeout(function () {
    errorMsg.textContent = '';
  }, 4000);
};

// Show a spinner on payment submission
var loading = function (isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector('button').disabled = true;
    document.querySelector('#spinner').classList.remove('hidden');
    document.querySelector('#button-text').classList.add('hidden');
  } else {
    document.querySelector('button').disabled = false;
    document.querySelector('#spinner').classList.add('hidden');
    document.querySelector('#button-text').classList.remove('hidden');
  }
};

}