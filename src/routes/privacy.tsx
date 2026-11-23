import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL, PolicyPage, policyHead } from "@/components/PolicyPage";

export const Route = createFileRoute("/privacy")({
  head: () => policyHead("privacy", "Privacy Policy", "How LumiMask collects, uses and protects your personal information."),
  component: () => (
    <PolicyPage title="Privacy Policy">
      <p>This policy explains what information we collect and how we use it.</p>
      <h2>What we collect</h2>
      <p>This website does not ask you for personal details. When you buy, Shopify collects your name, email, shipping address and payment details to complete your order, under <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noreferrer">Shopify's privacy policy</a>.</p>
      <h2>How we use it</h2>
      <p>We use order information only to ship your order, provide support and meet legal obligations. We never sell your information.</p>
      <h2>Your rights</h2>
      <p>If you live in the UK, EU or Canada, you can ask to see, correct or delete your personal data. Email us and we'll respond within 30 days.</p>
      <h2>Contact</h2>
      <p>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </PolicyPage>
  ),
});
