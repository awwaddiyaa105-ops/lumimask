import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL, PolicyPage, policyHead } from "@/components/PolicyPage";

export const Route = createFileRoute("/refunds")({
  head: () => policyHead("refunds", "Refund Policy", "LumiMask returns, refunds and damaged item policy."),
  component: () => (
    <PolicyPage title="Refund Policy">
      <h2>30-day returns</h2>
      <p>You can return your LumiMask within 30 days of delivery if it is unused and in its original packaging.</p>
      <h2>Damaged or faulty items</h2>
      <p>If your mask arrives damaged or stops working, email us within 30 days with a photo and your order number and we'll replace or refund it.</p>
      <h2>How refunds work</h2>
      <p>Once we receive and check your return, we refund the original payment method within 5–10 business days. Return shipping costs are not refunded unless the item was faulty.</p>
      <h2>Start a return</h2>
      <p>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your order number.</p>
    </PolicyPage>
  ),
});
