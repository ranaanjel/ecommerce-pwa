import Image from "next/image"

export function FilledMapIcon() {
    return <div>
        <Image placeholder="blur" blurDataURL="/blur.jpg" src="/map-icon.svg" alt="icon" width={16} height={16}/>
    </div>
}