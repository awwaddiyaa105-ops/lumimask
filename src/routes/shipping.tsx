import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL, PolicyPage, policyHead } from "@/components/PolicyPage";

export const Route = createFileRoute("/shipping")({
  head: () => policyHead("shipping", "Shipping Policy", "Where LumiMask ships and how long delivery takes."),
  component: () => (
    <PolicyPage title="Shipping Policy">
      <h2>Where we ship</h2>
      <p>We ship to the United States, Spain, France, the United Kingdom and Canada.</p>
      <h2>Processing and delivery</h2>
      <p>Orders are processed within 1–3 business days. Delivery usually takes 7–15 business days after dispatch. You'll get a tracking link by email once your order ships.</p>
      <h2>Customs and duties</h2>
      <p>Some countries may charge import duties or taxes on delivery. These are the customer's responsibility.</p>
      <h2>Lost or late orders</h2>
      <p>If your order hasn't arrived within 30 days, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we'll help.</p>
    </PolicyPage>
  ),
});
