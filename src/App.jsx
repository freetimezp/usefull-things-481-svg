import "./App.css";

import { ArrowDown, ArrowUpRight } from "lucide-react";

import StringSection from "./components/StringSection.jsx";

function App() {
    return (
        <main className="bg-[#080a14]">
            <section
                className="relative h-screen flex flex-col items-center 
                justify-center overflow-hidden text-center text-white"
            >
                <div
                    className="absolute w-125 h-125 rounded-full 
                    bg-violet-500/10 blur-[150px]"
                />

                <p className="text-cyan-300/70 text-xs tracking-[0.5em] mb-8">
                    A DIGITAL EXPERIENCE
                </p>

                <h1 className="text-6xl sm:text-8xl font-semibold tracking-[-0.07em] uppercase">
                    Beyond
                    <br />
                    <span className="text-white/30">The Ordinary.</span>
                </h1>

                <p className="text-white/40 text-sm mt-8 max-w-sm leading-7">
                    Every idea begins somewhere. Follow the connections and
                    discover something unexpected.
                </p>

                <div
                    className="absolute bottom-12 flex flex-col items-center
                    gap-3 text-white/40"
                >
                    <span className="text-[10px] tracking-[.3em]">
                        SCROLL TO DISCOVER
                    </span>

                    <ArrowDown size={17} />
                </div>
            </section>

            <StringSection />

            <section
                className="relative h-screen flex flex-col items-center justify-center 
                text-center text-white overflow-hidden"
            >
                <div
                    className="absolute w-125 h-125 rounded-full bg-cyan-400/10 
                    blur-[150px]"
                />

                <p className="text-cyan-300/70 text-xs tracking-[0.5em] mb-8">
                    THE JOURNEY CONTINUES
                </p>

                <h2
                    className="text-6xl sm:text-8xl font-semibold 
                    tracking-[-0.07em] uppercase"
                >
                    Stay
                    <br />
                    <span className="text-white/30">Curious.</span>
                </h2>

                <a
                    href="#"
                    className="mt-12 flex items-center gap-3 px-7 py-4 rounded-full
                    border border-white/15 text-sm hover:bg-white hover:text-black
                    transition-all duration-500"
                >
                    Explore more
                    <ArrowUpRight size={17} />
                </a>

                <div
                    className="absolute bottom-20 text-white/25 
                    text-[9px] tracking-[.3em]"
                >
                    DESIGNED TO FEEL ALIVE — 2026
                </div>
            </section>
        </main>
    );
}

export default App;
