/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

// Import necessary modules and components
import Image from "next/image"; // Import the Image component for optimized image handling
import Link from "next/link"; // Import the Link component for client-side navigation
import { useRef, useEffect, useState, useCallback } from "react"; // Import React hooks for state management and side effects
import Navbar from "@/components/Navbar"; // Import the Navbar component
import { motion } from "framer-motion"; // Import the motion component from framer-motion for animations

// Constants for animation durations and delays
const FADE_DURATION = 0.8; // Define the duration for fade animations
const FADE_DELAY = 0.2; // Define the delay for fade animations
const BOUNCE_DURATION = 0.5; // Define the duration for bounce animations
const ACCENT_COLOR = "#00ffff"; // Define the accent color
const CARD_SHADOW_COLOR = "rgba(0, 255, 255, 0.4)"; // Define the color for card shadows

// Animation variants for improved readability and reusability
const fadeIn = {
    initial: { opacity: 0, y: 20 }, // Initial state for fade-in animation (invisible and slightly moved down)
    animate: { opacity: 1, y: 0 }, // Animated state for fade-in animation (fully visible and in its original position)
    transition: { duration: FADE_DURATION, delay: FADE_DELAY }, // Transition properties for the fade-in animation (duration and delay)
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Initial state for card animation (invisible and moved down)
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Animated state for card animation (fully visible and in its original position with a transition)
};

const buttonHover = {
    scale: 1.05, // Scale the button up slightly on hover
    boxShadow: `0 4px 15px ${CARD_SHADOW_COLOR}`, // Add a shadow on hover
    backgroundColor: "#171717",
    transition: { duration: 0.2 },
};

const buttonTap = {
    scale: 0.95, // Scale the button down slightly when tapped
};

// Image sources array for dynamic rendering
const imageSources = ["/vercel.svg", "/window.svg", "/file.svg", "/next.svg", "/globe.svg"]; // Array of image paths

export default function Home() {
    // useRef for direct DOM access, avoiding unnecessary re-renders
    const cardRefs = useRef<HTMLDivElement[]>([]); // Create a ref to store the card elements
    // useState is generally better for triggering component updates
    const [buttonRefs, setButtonRefs] = useState<any>([]); // Create a state variable to store the button elements
    const [color, setColor] = useState(ACCENT_COLOR);

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Generate a random color
            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            setColor(randomColor);
        }, 3000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    // Use useCallback to memoize event handlers, preventing unnecessary re-renders
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const card = e.currentTarget as HTMLDivElement; // Get the current card element
        const rect = card.getBoundingClientRect(); // Get the bounding rectangle of the card
        const x = e.clientX - rect.left; // Calculate the x position of the mouse relative to the card
        const y = e.clientY - rect.top; // Calculate the y position of the mouse relative to the card

        card.style.setProperty('--spotlight-x', `${x}px`); // Set the x position of the spotlight
        card.style.setProperty('--spotlight-y', `${y}px`); // Set the y position of the spotlight

        const centerX = rect.width / 2; // Calculate the horizontal center of the card
        const centerY = rect.height / 2; // Calculate the vertical center of the card
        const offsetX = (x - centerX) / 15; // Calculate the horizontal offset for the shadow
        const offsetY = (y - centerY) / 15; // Calculate the vertical offset for the shadow
        const shadow = `${offsetX}px ${offsetY}px 30px 5px ${CARD_SHADOW_COLOR}`; // Create the shadow string
        card.style.boxShadow = shadow; // Set the box shadow of the card
    }, []);

    const handleMouseLeave = useCallback((e: MouseEvent) => {
        const card = e.currentTarget as HTMLDivElement; // Get the current card element
        card.style.setProperty("--spotlight-x", "-1000px"); // Reset the x position of the spotlight
        card.style.boxShadow = "none"; // Remove the box shadow
    }, []);

    const handleButtonHover = useCallback((e: MouseEvent) => {
        const button = e.currentTarget as HTMLButtonElement; // Get the current button element
        button.style.transform = "scale(1.05)"; // Scale the button up slightly
        button.style.boxShadow = `0 4px 15px ${CARD_SHADOW_COLOR}`; // Add a shadow to the button
    }, []);

    const handleButtonLeave = useCallback((e: MouseEvent) => {
        const button = e.currentTarget as HTMLButtonElement; // Get the current button element
        button.style.transform = "scale(1)"; // Reset the button scale
        button.style.boxShadow = "none"; // Remove the button shadow
    }, []);

    // useEffect for managing event listeners and cleanup
    useEffect(() => {
        // Ensure cardRefs.current is not null before iterating
        if (cardRefs.current) {
            cardRefs.current.forEach((card) => {
                if (card) {
                    card.addEventListener("mousemove", handleMouseMove); // Add mousemove event listener to each card
                    card.addEventListener("mouseleave", handleMouseLeave); // Add mouseleave event listener to each card
                }
            });
        }

        // added a check for buttonRefs
        if (buttonRefs) {
            buttonRefs.forEach((button: { addEventListener: (arg0: string, arg1: any) => void; }) => {
                if (button) {
                    button.addEventListener("mouseenter", handleButtonHover); // Add mouseenter event listener to each button
                    button.addEventListener("mouseleave", handleButtonLeave); // Add mouseleave event listener to each button
                }
            });
        }

        // Cleanup function to remove event listeners
        return () => {
            if (cardRefs.current) {
                cardRefs.current.forEach((card) => {
                    if (card) {
                        card.removeEventListener("mousemove", handleMouseMove); // Remove mousemove event listener from each card
                        card.removeEventListener("mouseleave", handleMouseLeave); // Remove mouseleave event listener from each card
                    }
                });
            }
            if (buttonRefs) {
                buttonRefs.forEach((button: { removeEventListener: (arg0: string, arg1: any) => void; }) => {
                    if (button) {
                        button.removeEventListener("mouseenter", handleButtonHover); // Remove mouseenter event listener from each button
                        button.removeEventListener("mouseleave", handleButtonLeave); // Remove mouseleave event listener from each button
                    }
                });
            }
        };
    }, [handleMouseMove, handleMouseLeave, handleButtonHover, handleButtonLeave, buttonRefs]);


    return (
        <div className="bg-black text-white font-[family-name:var(--font-geist-sans)] overflow-hidden relative">
            <Navbar />
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }} // Initial state for the hero section (invisible)
                animate={{ opacity: 1 }} // Animated state for the hero section (fully visible)
                transition={{ duration: 1 }} // Transition properties for the hero section animation
                className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-gray-900 to-black overflow-hidden relative"
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/20 via-transparent to-transparent opacity-40" />
                <motion.h1
                    variants={fadeIn} // Apply the fadeIn animation variants
                    initial="initial" // Set the initial state
                    animate="animate" // Set the animated state
                    className="relative text-6xl font-bold text-transparent bg-clip-text"
                    style={{ backgroundImage: `linear-gradient(to right, ${color}, ${ACCENT_COLOR})` }}
                >
                    Interactive Showcase
                </motion.h1>
                <motion.p
                    variants={fadeIn} // Apply the fadeIn animation variants
                    initial="initial" // Set the initial state
                    animate="animate" // Set the animated state
                    transition={{ duration: FADE_DURATION, delay: FADE_DELAY }} // Transition properties for the fade-in animation
                    className="relative mt-4 text-lg text-gray-300 max-w-3xl z-10"
                >
                    Dive into our collection of interactive components, featuring dynamic
                    effects and smooth animations, showcasing the latest in web design.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }} // Initial state for the arrow (invisible and slightly moved down)
                    animate={{ opacity: 1, y: 0 }} // Animated state for the arrow (fully visible and in its original position)
                    transition={{ duration: BOUNCE_DURATION, delay: FADE_DELAY * 3 }} // Transition properties for the bounce animation
                    className="relative mt-8 animate-bounce z-10"
                >
                    <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </motion.div>
            </motion.div>

            {/* Interactive Cards Section */}
            <section className="min-h-[80vh] flex flex-col items-center justify-center p-8 pb-20">
                <motion.h2
                    variants={fadeIn} // Apply the fadeIn animation variants
                    initial="initial" // Set the initial state
                    whileInView="animate" // Animate while the element is in view
                    viewport={{ once: true }} // Only animate once
                    className="text-5xl font-bold text-center text-transparent bg-clip-text"
                    style={{ backgroundImage: `linear-gradient(to right, ${color}, ${ACCENT_COLOR})` }}
                >
                    Dynamic Interaction Grids
                </motion.h2>

                <motion.div
                    variants={fadeIn} // Apply the fadeIn animation variants
                    initial="initial" // Set the initial state
                    whileInView="animate" // Animate while the element is in view
                    viewport={{ once: true }} // Only animate once
                    transition={{ duration: FADE_DURATION, delay: FADE_DELAY * 2 }} // Transition properties for the fade-in animation
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl"
                >
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <motion.div
                            key={item} // Set the key for the element
                            ref={(el: HTMLDivElement) => (cardRefs.current[index] = el)} // Store the card element in the cardRefs array
                            className="relative rounded-2xl p-6 bg-gray-900 transition-shadow duration-300 ease-out overflow-hidden border border-solid border-gray-800 hover:border-cyan-500/50 cursor-pointer hover:shadow-xl"
                            style={{
                                background:
                                    `radial-gradient(circle at var(--spotlight-x, -1000px) var(--spotlight-y, -1000px), rgba(0, 255, 255, 0.3), transparent 40%)`,
                            }}
                            aria-label={`Interactive card ${item}`} // Set the aria-label for accessibility
                        >
                            <div className="relative z-10">
                                <h2 className="text-xl font-semibold mb-2">Item {item}</h2>
                                <p className="text-sm text-gray-400 mb-4">
                                    Explore the interactive hover effects of each item.
                                </p>

                                <Image
                                    src={imageSources[index] || "/globe.svg"} // Set the image source
                                    alt={`Icon ${item}`} // Set the image alt text
                                    width={48} // Set the image width
                                    height={48} // Set the image height
                                    className="absolute bottom-4 right-4 opacity-10 dark:invert pointer-events-none"
                                    loading="lazy" // Implement lazy loading for images
                                    aria-hidden="true" // Hide the image from screen readers, as the card has an aria-label
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    variants={fadeIn} // Apply the fadeIn animation variants
                    initial="initial" // Set the initial state
                    whileInView="animate" // Animate while the element is in view
                    viewport={{ once: true }} // Only animate once
                    transition={{ duration: FADE_DURATION, delay: FADE_DELAY * 3 }} // Transition properties for the fade-in animation
                    className="flex gap-6 items-center flex-col sm:flex-row mt-12"
                >
                    <Link
                        href="https://nextjs.org/"
                        legacyBehavior
                        passHref
                        className="w-full sm:w-auto"
                    >
                        <motion.button className="relative overflow-hidden rounded-full border border-solid border-transparent transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-5 sm:px-6 shadow-lg hover:shadow-xl hover:from-cyan-600 hover:to-blue-600">
                            Next.js Docs
                        </motion.button>
                    </Link>
                    <motion.button
                        ref={(el: any) => {
                            if (el && !buttonRefs.includes(el)) {
                                setButtonRefs((prevButtonRefs: any) => [...prevButtonRefs, el]);
                            }
                        }}
                        className="relative overflow-hidden rounded-full border border-solid border-gray-700 transition-all duration-300 flex items-center justify-center bg-gray-800 hover:bg-gray-700 hover:border-gray-600 text-gray-300 font-medium text-sm sm:text-base h-10 sm:h-12 px-5 sm:px-6 shadow-md hover:shadow-lg w-full sm:w-auto"
                        whileHover={buttonHover} // Apply the buttonHover animation variants
                        whileTap={buttonTap} // Apply the buttonTap animation variants
                        aria-label="Learn more about interactive showcases" // Added aria-label
                    >
                        Learn More
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
}
