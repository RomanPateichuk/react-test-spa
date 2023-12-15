import React, {useRef} from "react";
import s from "./Footer.module.css"
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
import {wrap} from "@motionone/utils";


export const Footer:React.FC = React.memo(()=>{
    return(
        <footer className={s.footer}>
            <section>
                <ParallaxText baseVelocity={-1}>Roman is looking for a job</ParallaxText>
                <ParallaxText baseVelocity={1}>Roman is looking for a job</ParallaxText>
            </section>
        </footer>
    )
})


type ParallaxProps ={
    children: string;
    baseVelocity: number;
}

const ParallaxText:React.FC<ParallaxProps>=React.memo(({ children, baseVelocity = 100 }) =>{
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });


    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);


        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });


    return (
        <div className={s.parallax}>
            <motion.div className={s.scroller} style={{ x }}>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
                <span>{children} </span>
            </motion.div>
        </div>
    );
})



