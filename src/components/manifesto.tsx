import Quote from "../icons/quote.tsx";

export interface ManifestoProps {
  text: string;
  name: string;
}

/**
 * Brand manifesto: a semantic <blockquote> with an editorial treatment.
 * Replaces the previous quote component that used an <h4> (wrong heading
 * level) and mislabeled a brand statement as social proof.
 */
const Manifesto = ({ text, name }: ManifestoProps) => {
  return (
    <blockquote
      cite="/about"
      className="relative mx-auto w-full max-w-[820px] flex flex-col items-center gap-5 px-2 text-center lg:gap-6"
    >
      <span aria-hidden="true" className="inline-flex text-accent">
        <Quote />
      </span>
      <p className="font-dm text-[24px] leading-[34px] lg:text-[34px] lg:leading-[46px] italic tracking-wide text-primary-200">
        {text}
      </p>
      <cite className="not-italic font-jost text-base tracking-tight text-ink-soft lg:text-lg">
        — {name}
      </cite>
    </blockquote>
  );
};

export default Manifesto;
