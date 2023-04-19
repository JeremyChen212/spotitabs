import Image from "next/image";

export default function Icon({icon, active, onClickFunc}) {
    return (
        <button className="m-auto active:scale-90">
            <Image className={`${active && "text-white"} hover:opacity-80 cursor-pointer opacity-50`}
            src={icon}
            onClick={onClickFunc}
            alt="spotify logo"
            width={22}
            height={20}
            objectFit="contain"
            /> 
        </button>
    )
}