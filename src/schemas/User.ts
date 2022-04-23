import mongoose from "mongoose";

export interface IUser {
	discordID: string;
	elorating: number;
	wins: number;
	losses: number;
	gamehistory: number[];
	gamesPlayed: number;
	lbpos: number;
	ratingBefore: number;
	suspended: boolean;
	suspendedUntil: number;
	suspendedReason: string;
}

const userSchema = new mongoose.Schema<IUser>({
	discordID: String,
	elorating: Number,
	wins: Number,
	losses: Number,
	gamehistory: [Number],
	gamesPlayed: Number,
	lbpos: Number,
	ratingBefore: Number,
	suspended: Boolean,
	suspendedUntil: Number,
	suspendedReason: String,
});

export default mongoose.model<IUser>("User", userSchema);
