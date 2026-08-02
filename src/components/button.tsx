import ArrowSec from "../icons/arrow-sec.tsx";
import ArrowPri from "../icons/arrow-pri.tsx";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  text: string;
  type?: "submit" | "button";
  href?: string;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { variant = "primary", text = "Default Text", type = "button", href, disabled } = props;

  const defaultStyles =
    "rounded-full flex capitalize items-center justify-center gap-[9px] w-fit text-white text-base lg:text-lg font-semibold font-['Jost'] leading-snug tracking-tight px-9 py-4 md:px-[44px] md:py-[20px] transition-[background-color,transform,box-shadow] duration-300 ease-out-smooth hover:-translate-y-0.5 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0";
  const bgClass = variant === "primary" ? "bg-primary-200" : "bg-primary-100";
  const stateClass = disabled
    ? "bg-ink/40 cursor-not-allowed hover:translate-y-0 hover:shadow-none"
    : bgClass;
  const className = `${defaultStyles} ${stateClass}`;

  const content = (
    <>
      {text}
      {variant === "primary" ? <ArrowSec /> : <ArrowPri />}
    </>
  );

  return href ? (
    <a href={href} className={className} aria-disabled={disabled}>
      {content}
    </a>
  ) : (
    <button className={className} type={type} disabled={disabled}>
      {content}
    </button>
  );
};

export default Button;
