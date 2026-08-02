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
    "rounded-[18px] flex capitalize items-center justify-center gap-[9px] w-fit text-white text-base lg:text-lg font-semibold font-['Jost'] leading-snug tracking-tight px-10 py-5 md:px-[54px] md:py-[26px]";
  const bgClass = variant === "primary" ? "bg-primary-200" : "bg-primary-100";
  const className = `${defaultStyles} ${bgClass} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`;

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
