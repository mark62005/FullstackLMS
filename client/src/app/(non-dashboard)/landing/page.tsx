import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { UseCarousel } from "@/hooks/useCarousel";

const HERO_IMAGES = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];

function Landing() {
	const currentImage = UseCarousel({ totalImages: 3 });

	return (
		<motion.div
			className="w-3/4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{/* HERO */}
			<motion.section
				className="flex justify-between items-center mt-12 h-[500px] rounded-lg bg-customgreys-secondarybg"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{/* LEFT SIDE */}
				<div className="basis-1/2 px-16 mx-auto">
					<h1 className="text-4xl font-bold mb-4">Courses</h1>
					<p className="text-lg text-gray-400 mb-8">
						This is the list of the courses you can enroll in.
						<br />
						Courses when you need them and want them.
					</p>

					<div className="w-fit">
						<Link
							href="/search"
							scroll={false}
						>
							<div className="bg-primary-700 hover:bg-primary-600 px-4 py-2 rounded-md">
								Search for Courses
							</div>
						</Link>
					</div>
				</div>

				{/* RIGHT SIDE */}
				<div className="basis-1/2 h-full relative overflow-hidden rounded-r-lg">
					{HERO_IMAGES.map((src, index) => (
						<Image
							key={index}
							src={src}
							alt={`Hero Image ${index + 1} for landing page.`}
							fill
							priority={index === currentImage}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className={cn(
								"object-cover transition-opacity duration-500 opacity-0",
								`${index === currentImage ? "opacity-100" : ""}`
							)}
						/>
					))}
				</div>
			</motion.section>
		</motion.div>
	);
}
export default Landing;
