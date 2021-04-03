import { motion } from "framer-motion"


const imageVariants = {
    initial: {
        opacity: 0,
        top: "15px"
    },
    animate: {
        opacity: 1,
        top: "-0px",
        transition: { delay: 0.1 }
    },
    exit: {
        opacity: 0,
        top: "-15px"
    }
};

function CustomPage(args: any) {

    return <motion.div transition={{ ease: [0.1, 0.9, 0.2, 1], duration: 0.3 }} variants={imageVariants} initial="initial" animate="animate" exit="exit" className="page">{args.children}</motion.div>

}

export default CustomPage