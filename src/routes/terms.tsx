import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL, PolicyPage, policyHead } from "@/components/PolicyPage";

export const Route = createFileRoute("/terms")({
  head: () => policyHead("terms", "Terms of Service", "The terms that apply when you use shoplumimask.com and buy LumiMask."),
  component: () => (
    <PolicyPage title="Terms of Service">
      <p>By using shoplumimask.com or buying a LumiMask, you agree to these terms.</p>
      <h2>Orders and payment</h2>
      <p>All orders and payments are processed securely by Shopify. We never see or store your card details. We may cancel an order if a product is unavailable or a price was shown in error, with a full refund.</p>
      <h2>Prices</h2>
      <p>Prices are listed in US dollars. Prices shown in other currencies are estimates; the final amount is shown at checkout.</p>
      <h2>Product use</h2>
      <p>LumiMask is a cosmetic device and is not intended to diagnose, treat, cure or prevent any medical condition. Follow the included instructions. Do not use it if you are pregnant, have light sensitivity or epilepsy, or take light-sensitising medication, without first speaking to a doctor.</p>
      <h2>Limitation of liability</h2>
      <p>To the extent allowed by law, our liability for any claim is limited to the amount you paid for the product.</p>
      <h2>Changes</h2>
      <p>We may update these terms. The date at the top shows the latest version.</p>
      <h2>Contact</h2>
      <p>Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </PolicyPage>
  ),
});
