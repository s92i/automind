import { CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/logo.png"

const LeftSideAuthModal = () => {
    return (
        <div className="hidden lg:flex flex-col justify-center p-8 bg-gradient-hero relative overflow-hidden">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Link href={"/"}>
                        <div className="flex items-center gap-2 animate-fade-in">
                            <Image src={logo} alt="" width={200} height={190} />
                        </div>
                    </Link>
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold leading-tight">
                        Automate Everything
                        <br />
                        <span className="text-primary">Smarter</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">Join thousands of developers building the future of workflow automation with AI superpowers</p>
                </div>

                <div className="space-y-3">
                    {[
                        "Free forever plan available",
                        "No credit card required",
                        "Setup in 2 minutes"
                    ].map((txt, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span>{txt}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-glow-pulse opacity-30" />
            <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-neon-blue rounded-full animate-float opacity-20" />
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-neon-purple rounded-full animate-node-glow opacity-25" />
        </div>
    )
}

export default LeftSideAuthModal