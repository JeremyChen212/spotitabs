interface IProps {
    className?: string;
    text: string;
    size: string;
  }
  

export default function Header({text, className, size} : IProps) {
    return (
        <h1 className={`${className} ${size === "xl" && "text-2xl"} ${size === "xl" && "font-semibold"} text-2xl font-medium inline-block my-4`}>{text}</h1>
    )
}