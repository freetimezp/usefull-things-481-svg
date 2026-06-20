import { images } from "../assets/js/assets.js";

import { useRef } from "react";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

export const StringSeection = () => {
    const containerRef = useRef();

    useGSAP(
        () => {
            const path = document.querySelector("#network-path");
            const dot = document.querySelector(".moving-dot");
            const cards = document.querySelectorAll(".im-card");

            const pathLenght = path.getTotalLength();

            gsap.set(path, {
                strokeDasharray: pathLenght,
                strokeDashoffset: pathLenght,
            });

            const cardCenters = Array.from(cards).map((card) => {
                const xPct = parseFloat(card.style.left) / 100;
                const yPct = parseFloat(card.style.top) / 100;
                return {
                    svgX: xPct * 1600,
                    svgY: yPct * 900,
                };
            });

            const SAMPLES = 600;
            const pathSamples = [];
            for (let i = 0; i <= SAMPLES; i++) {
                const t = (i / SAMPLES) * pathLenght;
                const pt = path.getPointAtLength(t);
                pathSamples.push({ t: i / SAMPLES, x: pt.x, y: pt.y });
            }

            const cardProgressMap = cardCenters.map(({ svgX, svgY, card }) => {
                let closestProgress = 0;
                let closest = Infinity;

                for (const sample of pathSamples) {
                    const dx = sample.x - svgX;
                    const dy = sample.y - svgY;
                    const dist = dx * dx + dy * dy;

                    if (dist < closest) {
                        closest = dist;
                        closestProgress = sample.t;
                    }
                }
                return { card, progress: closestProgress };
            });

            gsap.set(cards, { scale: 0.85 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        cardProgressMap.forEach(({ card, progress: cardProg }) => {
                            const activationWindow = 0.06;

                            const proximity = Math.max(0, 1 - Math.abs(progress - cardProg) / activationWindow);

                            const scale = progress >= cardProg ? 1.1 : 0.85 + 0.25 * proximity;

                            gsap.set(card, { scale });
                        });
                    },
                },
            });

            tl.to(
                path,
                {
                    strokeDashoffset: 0,
                    ease: "none",
                },
                0
            );

            tl.to(
                dot,
                {
                    motionPath: {
                        path: path,
                        align: path,
                        alignOrigin: [0.5, 0.5],
                    },
                    ease: "none",
                },
                0
            );
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <h1 className="text-7xl leading-[0.9] font-bold uppercase text-black text-center tracking-wide">
                    DESIGNED
                    <br />
                    TO FEEL ALIVE
                </h1>
            </div>

            <svg
                id="team-svg"
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1600 900"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
            >
                <path
                    id="network-path"
                    d="
              M 800, 198 
              C 950, 190 980, 50 1056, 234 
              C 1120, 350 1200, 100 1264, 306 
              C 1320, 450 1150, 420 1296, 450 
              C 1420, 480 1250, 600 1216, 639 
              C 1180, 680 1280, 820 1216, 639 
              C 1120, 420 850, 750 928, 729 
              C 1000, 710 940, 850 928, 729 
              C 900, 600 750, 700 656, 747 
              C 550, 800 600, 920 656, 747 
              C 720, 580 500, 750 480, 747 
              C 400, 740 380, 850 320, 540 
              C 280, 300 180, 650 240, 405 
              C 280, 200 100, 420 240, 405 
              C 380, 390 320, 500 448, 306 
              C 520, 180 350, 220 448, 306 
              C 520, 380 680, 210 800, 198 
              Z
          "
                    stroke="#111"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>

            <div className="moving-dot absolute top-0 left-0 w-4 h-4 rounded-full bg-black -z-20" />

            {images.map((item, i) => {
                return (
                    <div
                        key={i}
                        className="im-card absolute flex items-center gap-2 px-4 py-1 rounded-full border border-black bg-white shadow-sm z-20"
                        style={{
                            left: item.x,
                            top: item.y,
                            transform: "translate(-50% , -50%)",
                            transformOrigin: "center center",
                            willChange: "transform",
                        }}
                    >
                        <img
                            className="w-11 h-11 rounded-full object-cover border -ml-2 border-black/10"
                            src={item.image}
                            alt=""
                        />
                        <h2 className="uppercase text-xl font-semibold whitespace-nowrap text-black tracking-wide">
                            {item.title}
                        </h2>
                    </div>
                );
            })}
        </section>
    );
};
