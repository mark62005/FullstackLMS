import Link from "next/link";

const FOOTER_LINKS = ["About", "Privacy Policy", "Licensing", "Contact"];

function Footer() {
	function getFooterLinkHref(link: string): string {
		return link.toLocaleLowerCase().replace(" ", "-");
	}

	return (
		<footer className="bg-customgreys-secondarybg bottom-0 w-full py-8 mt-10 text-center text-sm">
			<p className="">&copy; 2024 Mark Wong. All Right Reserved.</p>

			<div className="mt-2">
				{FOOTER_LINKS.map((footerLink) => (
					<Link
						key={footerLink}
						href={`/${getFooterLinkHref(footerLink)}`}
						className="text-primary-500 mx-2 capitalize"
					>
						{footerLink}
					</Link>
				))}
			</div>
		</footer>
	);
}
export default Footer;
