import { MessageCircle } from "lucide-react";
import { company, fullAddress, hasPhone, hasWhatsapp, mailHref, telHref, whatsappHref } from "@/config/company";
import { anchors } from "@/config/navigation";
import { genericWhatsappMessage } from "@/lib/lead";
import { Container } from "../ui/Container";
import { Pending } from "../ui/Pending";

interface Item {
  label: string;
  value: string;
  href?: string;
  track?: string;
  tabular?: boolean;
}

/** Coordonnées en bandeau : seules les coordonnées confirmées sont rendues, WhatsApp pour une question rapide. */
export function Contact() {
  const items: Item[] = [];
  if (hasPhone) items.push({ label: "Téléphone", value: company.phone.display, href: telHref, track: "phone", tabular: true });
  if (mailHref && company.email.value) items.push({ label: "E-mail", value: company.email.value, href: mailHref });
  if (company.address.publicDisplay.value && fullAddress) items.push({ label: "Adresse", value: fullAddress });

  return (
    <section id={anchors.contact} data-section="contact" aria-labelledby="contact-title" className="bg-white py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="contact-title" className="text-[1.85rem] leading-[1.1] font-bold text-deep sm:text-4xl">
              Contacter {company.name}
            </h2>
            <p className="mt-3 max-w-[60ch] text-muted">
              Courtier en énergie, nous accompagnons les particuliers, les entreprises et les collectivités partout en France, par téléphone et en ligne.
            </p>
          </div>
          {hasWhatsapp && (
            <a
              href={whatsappHref(genericWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp"
              data-track-location="contact"
              className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-md border-2 border-brand px-5 py-2.5 font-semibold text-brand transition-colors hover:bg-brand hover:text-white sm:self-auto"
            >
              <MessageCircle className="size-5" aria-hidden />
              Échanger avec nous sur WhatsApp
            </a>
          )}
        </div>

        {items.length > 0 && (
          <address className="mt-8 not-italic">
            <dl className="grid border-t-2 border-deep md:grid-cols-3">
              {items.map((it) => (
                <div key={it.label} className="border-b border-line py-5 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                  <dt className="text-sm text-muted">{it.label}</dt>
                  <dd>
                    {it.href ? (
                      <a
                        href={it.href}
                        {...(it.track ? { "data-track": it.track, "data-track-location": "contact" } : {})}
                        className={`inline-flex min-h-11 items-center text-lg font-semibold break-words text-deep hover:text-brand hover:underline ${it.tabular ? "tabular" : ""}`}
                      >
                        {it.value}
                      </a>
                    ) : (
                      <p className="flex min-h-11 items-center text-lg font-semibold text-deep">{it.value}</p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </address>
        )}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {!hasPhone && <Pending label="Téléphone (NEXT_PUBLIC_PHONE_E164)" note={company.phone.status.note} />}
          {!mailHref && <Pending label="E-mail de contact" note={company.email.note} />}
          {!hasWhatsapp && <Pending label="Numéro WhatsApp" note={company.whatsapp.number.note} />}
          {company.address.publicDisplay.status !== "confirmed" && <Pending label="Adresse publique" note={company.address.publicDisplay.note} />}
        </div>
      </Container>
    </section>
  );
}
