import config from "@/config"
import Image from "next/image"

const Logo = () => {
  return <Image src="/logo.svg" alt={config.APP_NAME} width={175} height={43} />
}
export default Logo
