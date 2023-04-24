interface IProps {
    className?: string;
    text: string;
  }
  

export default function Header({text, className} : IProps) {
    return (
        <h1 className={`${className} text-2xl inline-block my-4 font-semibold`}>{text}</h1>
    )
}