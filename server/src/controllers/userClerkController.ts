import { Request, Response } from "express";
import { clerkClient } from "../index";

/**
 * Update user with a specified user ID, return the updated user data if update is successfully.
 * If the user is not found, return a status of 404.
 *
 * @param userID ID of a user
 * @param userData User data from Clerk database
 */
export async function updateUser(req: Request, res: Response): Promise<void> {
	const { userId } = req.params;
	const userData = req.body;

	try {
		const user = await clerkClient.users.updateUserMetadata(userId, {
			publicMetadata: {
				userType: userData.publicMetadata.userType,
				settings: userData.publicMetadata.settings,
			},
		});

		if (!user) {
			res.status(404).json({ message: "User not found." });
			return;
		}

		res.json({ message: "User has been updated successfully.", data: user });
	} catch (error) {
		res.status(500).json({ message: "Error updating user.", error });
	}
}
