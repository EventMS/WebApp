// retryInvoiceWithNewPaymentMethod = ({ customerId, paymentMethodId, invoiceId, priceId }) => {
//     return (
//       fetch('/retry-invoice', {
//         method: 'post',
//         headers: {
//           'Content-type': 'application/json',
//         },
//         body: JSON.stringify({
//           customerId: customerId,
//           paymentMethodId: paymentMethodId,
//           invoiceId: invoiceId,
//         }),
//       })
//         .then((response) => {
//           return response.json();
//         })
//         // If the card is declined, display an error to the user.
//         .then((result) => {
//           if (result.error) {
//             // The card had an error when trying to attach it to a customer.
//             throw result;
//           }
//           return result;
//         })
//         // Normalize the result to contain the object returned by Stripe.
//         // Add the additional details we need.
//         .then((result) => {
//           return {
//             // Use the Stripe 'object' property on the
//             // returned result to understand what object is returned.
//             invoice: result,
//             paymentMethodId: paymentMethodId,
//             priceId: priceId,
//             isRetry: true,
//           };
//         })
//         // Some payment methods require a customer to be on session
//         // to complete the payment process. Check the status of the
//         // payment intent to handle these actions.
//         .then(priceId this.handlePaymentThatRequiresCustomerAction())
//         // No more actions required. Provision your service for the user.
//         .then(onSubscriptionComplete)
//         .catch((error) => {
//           // An error has happened. Display the failure to the user here.
//           // We utilize the HTML element we created.
//           this.cardErrors = error.message;
//         })
//     );
//   };

//   handlePaymentThatRequiresCustomerAction({ subscription, invoice, priceId, paymentMethodId, isRetry }) {
//     if (subscription && subscription.status === 'active') {
//       // Subscription is active, no customer actions required.
//       return { subscription, priceId, paymentMethodId };
//     }

//     // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
//     // If it's a retry, the payment intent will be on the invoice itself.
//     let paymentIntent = invoice ? invoice.payment_intent : subscription.latest_invoice.payment_intent;

//     if (
//       paymentIntent.status === 'requires_action' ||
//       (isRetry === true && paymentIntent.status === 'requires_payment_method')
//     ) {
//       return this.stripe
//         .confirmCardPayment(paymentIntent.client_secret, {
//           payment_method: paymentMethodId,
//         })
//         .then((result) => {
//           if (result.error) {
//             // Start code flow to handle updating the payment details.
//             // Display error message in your UI.
//             // The card was declined (i.e. insufficient funds, card has expired, etc).
//             throw result;
//           } else {
//             if (result.paymentIntent.status === 'succeeded') {
//               // Show a success message to your customer.
//               // There's a risk of the customer closing the window before the callback.
//               // We recommend setting up webhook endpoints later in this guide.
//               return {
//                 priceId: priceId,
//                 subscription: subscription,
//                 invoice: invoice,
//                 paymentMethodId: paymentMethodId,
//               };
//             }
//           }
//         })
//         .catch((error) => {
//           this.cardErrors = error.message;
//         });
//     } else {
//       // No customer action needed.
//       return { subscription, priceId, paymentMethodId };
//     }
//   }
