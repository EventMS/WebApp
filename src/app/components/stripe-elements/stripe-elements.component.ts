import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/AUTH/authentication.service';
import waait from 'waait';
declare var Stripe: stripe.StripeStatic;

@Component({
  selector: 'app-stripe-elements',
  templateUrl: './stripe-elements.component.html',
  styleUrls: ['./stripe-elements.component.scss'],
})
export class StripeElementsComponent implements OnInit, AfterViewInit {
  constructor(private authService: AuthenticationService, public loadingController: LoadingController) {}

  @Input() amount: number;
  @Input() description: string;
  @Input() dismissModal?: () => void;
  @ViewChild('cardElement') cardElement: ElementRef;

  stripe: stripe.Stripe; // : stripe.Stripe;
  card: stripe.elements.Element;
  cardErrors: string | undefined;

  loading = false;

  ngAfterViewInit() {
    console.log('called');
    const elements = this.stripe.elements();

    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', (error) => {
      this.cardErrors = error?.error?.message;
    });
  }

  ngOnInit() {
    this.stripe = Stripe(
      'pk_test_51HS0EUBx5A11R9GHe4zQ0OPYybaSBAKDpNJieOALrFCX9QsnMbc9wU6FZToIEoaFdgO45ODaabYVZCXYcyRlero100Dx2lyk2A'
    );
  }

  getButtonText = () =>
    this.amount && this.description
      ? `Buy ${this.description} for $ ${this.amount}.00`
      : 'Please choose a subscription';

  // Listen for form submission, process the form with Stripe,
  // and get the
  async handleForm(e: { preventDefault: () => void }) {
    e.preventDefault();

    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1000,
    });
    await loading.present();

    const { source, error } = await this.stripe.createSource(this.card);

    if (error) {
      this.loading = false;
      // Inform the customer that there was an error.
      this.cardErrors = error.message;
    } else {
      console.log(source);
      await waait(2000);
      // Send the token to your server.
      loading.dismiss();
      this.dismissModal?.();
    }
  }
}
