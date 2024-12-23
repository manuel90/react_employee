import Image from "next/image"


//Assets
import logo from "./assets/logo.png"

export default function Logo({ className }) {
	return (
		<>
			<Image className={className} src={logo.src} width="200" height="139" alt="logo" />
		</>
	)
}