import { images } from "../data/assets.js";

import { useRef } from "react";

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

// lenis
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const StringSection = () => {
    const containerRef = useRef();

    useGSAP(
        () => {
            const section = containerRef.current;
            const path = section.querySelector("#network-path");
            const dot = section.querySelector(".moving-dot");
            const cards = gsap.utils.toArray(".im-card", section);
            const counter = section.querySelector(".progress-number");

            const pathLength = path.getTotalLength();

            gsap.set(path, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength,
            });

            gsap.set(dot, {
                opacity: 0,
                scale: 0,
            });

            const samples = 800;

            const pathSamples = Array.from({ length: samples + 1 }, (_, i) => {
                const t = i / samples;
                const point = path.getPointAtLength(t * pathLength);

                return {
                    t,
                    x: point.x,
                    y: point.y,
                };
            });

            const sectionRect = section.getBoundingClientRect();

            const cardProgressMap = cards.map((card) => {
                const rect = card.getBoundingClientRect();

                const centerX = rect.left + rect.width / 2 - sectionRect.left;
                const centerY = rect.top + rect.height / 2 - sectionRect.top;

                const x = (centerX / sectionRect.width) * 1600;
                const y = (centerY / sectionRect.height) * 900;

                let closestProgress = 0;
                let closestDistance = Infinity;

                pathSamples.forEach((point) => {
                    const dx = point.x - x;
                    const dy = point.y - y;

                    const distance = dx * dx + dy * dy;

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestProgress = point.t;
                    }
                });

                return closestProgress;
            });

            gsap.set(cards, {
                scale: 0.85,
                opacity: 0.45,
                filter: "brightness(0.65)",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,

                    onUpdate: (self) => {
                        const progress = self.progress;

                        counter.textContent = String(
                            Math.round(progress * 100),
                        ).padStart(2, "0");

                        gsap.set(section.querySelector(".progress-line"), {
                            width: `${progress * 100}%`,
                        });

                        cards.forEach((card, index) => {
                            const cardProgress = cardProgressMap[index];

                            const distance = Math.abs(progress - cardProgress);

                            const proximity = Math.max(0, 1 - distance / 0.055);

                            const activated = progress >= cardProgress;

                            gsap.set(card, {
                                scale: 0.85 + proximity * 0.2,
                                opacity: activated ? 1 : 0.45,
                                filter: activated
                                    ? "brightness(1)"
                                    : "brightness(0.65)",
                            });

                            card.classList.toggle("is-active", proximity > 0.4);
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
                0,
            )

                .to(
                    dot,
                    {
                        motionPath: {
                            path,
                            align: path,
                            alignOrigin: [0.5, 0.5],
                        },

                        opacity: 1,
                        scale: 1,
                        ease: "none",
                    },
                    0,
                );

            gsap.to(".ambient-orb", {
                y: -35,
                x: 20,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 1,
            });
        },
        { scope: containerRef },
    );

    return (
        <section
            ref={containerRef}
            className="network-section relative h-screen w-full overflow-hidden"
        >
            <div className="network-grid absolute inset-0" />

            <div className="ambient-orb orb-one" />
            <div className="ambient-orb orb-two" />
            <div className="ambient-orb orb-three" />

            {/* header */}
            <div className="absolute top-8 left-8 z-30 flex items-center gap-3">
                <div className="brand-symbol">
                    <span />
                    <span />
                    <span />
                </div>

                <div>
                    <p className="text-white text-xs font-bold tracking-[0.25em]">
                        N E U R A L
                    </p>

                    <p className="text-white/40 text-[9px] tracking-[0.2em]">
                        CONNECTED EXPERIENCES
                    </p>
                </div>
            </div>

            {/* top right */}

            <div className="absolute top-10 right-8 z-30 hidden sm:block">
                <p className="text-white/40 text-[10px] tracking-[0.3em]">
                    AN INTERACTIVE JOURNEY / 2026
                </p>
            </div>

            <div
                className="absolute inset-0 z-10 flex items-center justify-center
                pointer-events-none"
            >
                <div className="text-center">
                    <p
                        className="text-cyan-300/70 text-[10px] sm:text-xs 
                        tracking-[0.5em] mb-5"
                    >
                        EVERYTHING IS CONNECTED
                    </p>

                    <h1
                        className="text-white font-semibold uppercase leading-[0.85]
                        tracking-[-0.07em] text-5xl sm:text-7xl md:text-8xl lg:text-[110px]"
                    >
                        DESIGNED
                        <br />
                        TO FEEL
                        <br />
                        <span className="gradient-text">ALIVE.</span>
                    </h1>

                    <p className="text-white/35 text-xs sm:text-sm tracking-[0.15em] mt-7">
                        FOLLOW THE CONNECTION
                    </p>
                </div>
            </div>

            {/* svg */}

            <svg
                className="absolute inset-0 z-5 w-full h-full"
                viewBox="0 0 1600 900"
                preserveAspectRatio="none"
                fill="none"
            >
                <defs>
                    <linearGradient
                        id="network-gradient"
                        x1="0"
                        y1="0"
                        x2="1600"
                        y2="900"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#67E8F9" />
                        <stop offset=".45" stopColor="#A78BFA" />
                        <stop offset="1" stopColor="#F472B6" />
                    </linearGradient>

                    <filter
                        id="path-glow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                    >
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Static subtle path */}
                <path
                    d="
                        M 800,198
                        C 950,190 980,50 1056,234
                        C 1120,350 1200,100 1264,306
                        C 1320,450 1150,420 1296,450
                        C 1420,480 1250,600 1216,639
                        C 1180,680 1280,820 1216,639
                        C 1120,420 850,750 928,729
                        C 1000,710 940,850 928,729
                        C 900,600 750,700 656,747
                        C 550,800 600,920 656,747
                        C 720,580 500,750 480,747
                        C 400,740 380,850 320,540
                        C 280,300 180,650 240,405
                        C 280,200 100,420 240,405
                        C 380,390 320,500 448,306
                        C 520,180 350,220 448,306
                        C 520,380 680,210 800,198
                        Z
                    "
                    stroke="white"
                    strokeOpacity=".08"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                />

                {/* Animated path */}
                <path
                    id="network-path"
                    d="
                        M 800,198
                        C 950,190 980,50 1056,234
                        C 1120,350 1200,100 1264,306
                        C 1320,450 1150,420 1296,450
                        C 1420,480 1250,600 1216,639
                        C 1180,680 1280,820 1216,639
                        C 1120,420 850,750 928,729
                        C 1000,710 940,850 928,729
                        C 900,600 750,700 656,747
                        C 550,800 600,920 656,747
                        C 720,580 500,750 480,747
                        C 400,740 380,850 320,540
                        C 280,300 180,650 240,405
                        C 280,200 100,420 240,405
                        C 380,390 320,500 448,306
                        C 520,180 350,220 448,306
                        C 520,380 680,210 800,198
                        Z
                    "
                    stroke="url(#network-gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#path-glow)"
                />
            </svg>

            {/* dot*/}
            <div className="moving-dot absolute top-0 left-0 z-30">
                <div className="dot-core" />
                <div className="dot-halo" />
            </div>

            {/* cards */}

            {images.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.number}
                        className="im-card absolute z-20"
                        style={{
                            "--accent": item.color,

                            "--card-x": item.x,
                            "--card-y": item.y,

                            "--mobile-x": item.mobileX,
                            "--mobile-y": item.mobileY,

                            transform: "translate(-50%, -50%)",
                            transformOrigin: "center center",
                        }}
                    >
                        <div className="node-card flex items-center gap-3">
                            <div className="node-icon">
                                <Icon size={23} strokeWidth={1.7} />
                            </div>

                            <div className="node-info">
                                <div className="flex items-center gap-2">
                                    <span className="node-number">
                                        {item.number}
                                    </span>

                                    <span className="node-title">
                                        {item.title}
                                    </span>
                                </div>

                                <p className="node-category">{item.category}</p>
                            </div>

                            <div className="node-indicator" />
                        </div>
                    </div>
                );
            })}

            {/* info */}
            <div className="absolute bottom-8 left-8 z-30">
                <p className="text-white/35 text-[9px] tracking-[0.25em]">
                    SCROLL TO EXPLORE
                </p>

                <div className="w-24 h-0.5 bg-white/10 mt-3 overflow-hidden">
                    <div className="progress-line h-full bg-cyan-300" />
                </div>
            </div>

            <div className="absolute bottom-8 right-8 z-30 text-right">
                <p className="text-white/35 text-[9px] tracking-[0.25em]">
                    JOURNEY PROGRESS
                </p>

                <div className="flex items-baseline justify-end gap-1 mt-1">
                    <span
                        className="progress-number text-white text-3xl 
                        font-light tabular-nums"
                    >
                        00
                    </span>

                    <span className="text-white/40 text-xs">%</span>
                </div>
            </div>
        </section>
    );
};

export default StringSection;
