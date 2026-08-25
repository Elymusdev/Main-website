"use client";

import type { FormEvent } from "react";

export default function InquiryForm({
  inquiryTypes,
  contactEmail,
}: {
  inquiryTypes: string[];
  contactEmail: string;
}) {
  function emailInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const inquiry = String(form.get("inquiry") || "Website inquiry");
    const body = [
      `Name: ${String(form.get("name") || "")}`,
      `Organization: ${String(form.get("organization") || "")}`,
      `Email: ${String(form.get("email") || "")}`,
      `Inquiry type: ${inquiry}`,
      "",
      String(form.get("message") || ""),
    ].join("\n");
    const subject = encodeURIComponent(`Elymus website inquiry: ${inquiry}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="inquiry-form" aria-label="Elymus contact form" onSubmit={emailInquiry}>
      <label>Full name<input type="text" name="name" autoComplete="name" required /></label>
      <label>Organization<input type="text" name="organization" autoComplete="organization" /></label>
      <label>Email address<input type="email" name="email" autoComplete="email" required /></label>
      <label>Inquiry type<select name="inquiry">{inquiryTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
      <label className="form-wide">Message<textarea name="message" rows={6} required /></label>
      <button className="button primary" type="submit">Submit inquiry</button>
    </form>
  );
}
