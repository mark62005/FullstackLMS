import { Request, Response } from "express";
import { clerkClient } from "../index";

/**
 * Return the course with the specified course ID.
 * If the course if not found, return a status of 404.
 *
 * @param userID: ID of a user
 * @param userData:
 */
export async function updateUser(req: Request, res: Response): Promise<void> {
	const { userId } = req.params;
	const userData = req.body;

	try {
		await clerkClient.users.updateUserMetadata(userId, {
			publicMetadata: {
				userType: userData.publicMetadata.userType,
				settings: userData.publicMetadata.settings,
			},
		});

		res.json({ message: "User has been updated successfully." });
	} catch (error) {
		res.status(500).json({ message: "Error updating user.", error });
	}
}
