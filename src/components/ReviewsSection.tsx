import { Star, ArrowUpRight, Quote, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SALON } from "@/lib/salon";
import { SALON_REVIEWS } from "@/lib/salon-reviews";

function Stars({ rating }: { rating: number }) {
  return <span className="reviews-stars" role="img" aria-label={`${rating} de 5 estrelas`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} fill={i < Math.round(rating) ? "currentColor" : "none"} aria-hidden="true" />)}</span>;
}

export function ReviewsSection() {
  const reviewLink = SALON_REVIEWS.writeReviewUrl ?? SALON_REVIEWS.listingUrl;
  const feedbackLink = `https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(`Olá, ${SALON.name}! Gostaria de compartilhar minha experiência no salão: `)}`;
  return (
    <>
      <section id="avaliacoes" className="reviews-section scroll-mt-20" aria-labelledby="reviews-title">
        <div className="reviews-inner">
          <div className="reviews-heading">
            <div>
              <p className="reviews-eyebrow">Avaliações</p>
              <h2 id="reviews-title" className="reviews-title">O que dizem <em>as clientes.</em></h2>
            </div>
            {SALON_REVIEWS.rating !== null && <div className="reviews-summary">
              <span className="reviews-score">{SALON_REVIEWS.rating.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}</span>
              <div><Stars rating={SALON_REVIEWS.rating} /><p className="reviews-summary-label">Nota pública no Google{SALON_REVIEWS.count !== null ? ` · ${SALON_REVIEWS.count} avaliações` : ""}</p></div>
            </div>}
          </div>
          {SALON_REVIEWS.reviews.length > 0 && <div className="reviews-grid">
            {SALON_REVIEWS.reviews.map((review) => <figure key={review.sourceUrl} className="review-card">
              <Stars rating={review.rating} />
              <blockquote className="review-quote">“{review.text}”</blockquote>
              <figcaption className="review-author"><a href={review.sourceUrl} target="_blank" rel="noopener noreferrer">{review.author} · Google</a></figcaption>
            </figure>)}
          </div>}
          {SALON_REVIEWS.reviews.length === 0 && <div className="reviews-empty">
            <Quote className="reviews-quote-mark" aria-hidden="true" />
            <div>
              <p className="reviews-empty-title">O próximo depoimento pode ser o seu.</p>
              <p className="reviews-empty-copy">Cada cabelo tem uma história. Queremos conhecer a sua.</p>
            </div>
            <Button variant="reviewSocial" size="service" asChild>
              <a href={SALON.instagram} target="_blank" rel="noopener noreferrer"><Instagram />Conheça a A.M no Instagram<ArrowUpRight /></a>
            </Button>
          </div>}
          {SALON_REVIEWS.listingUrl && <p className="reviews-source">Avaliações públicas de clientes no Google. <a href={SALON_REVIEWS.listingUrl} target="_blank" rel="noopener noreferrer">Ver todas as avaliações</a></p>}
        </div>
      </section>
      <section className="reviews-invitation" aria-label="Avalie sua experiência">
        <div className="reviews-invitation-inner">
          <div><h3>Já foi atendida na {SALON.shortName} Cabelos &amp; Produções?</h3><p>Sua avaliação ajuda outras clientes a nos encontrarem.</p></div>
          <Button variant="reviewGoogle" size="service" asChild><a href={reviewLink ?? feedbackLink} target="_blank" rel="noopener noreferrer">{reviewLink ? <Star /> : <MessageCircle />}{reviewLink ? "Avaliar no Google" : "Enviar meu depoimento"}<ArrowUpRight /></a></Button>
        </div>
      </section>
    </>
  );
}