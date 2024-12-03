import { dark } from "@clerk/themes";
import { UserProfile } from "@clerk/nextjs";
import ProfileHeader from "@/components/shared/ProfileHeader";

function UserProfilePage() {
	return (
		<>
			<ProfileHeader
				title="Profile"
				subtitle="View your profile"
			/>
			<UserProfile
				path="/user/profile"
				routing="path"
				appearance={{
					baseTheme: dark,
					elements: {
						scrollBox: "bg-customgreys-darkGrey",
						navbar: {
							"& > div:nth-child(1)": {
								background: "none",
							},
						},
					},
				}}
			/>
		</>
	);
}
export default UserProfilePage;
