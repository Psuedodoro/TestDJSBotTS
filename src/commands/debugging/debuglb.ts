import { Command } from "../../structures/Command";
import User from "../../schemas/User";
import eloToRank from "../../functions/eloToRank";

export default new Command({
	name: "debug-lb",
	description: "Rolls back everyone's stats to the game before last.",

	run: async ({ interaction }) => {
		var users = await User.find({});
		users.sort((a, b) => b.elorating - a.elorating);

		users = users.filter((user) => user.gamehistory.length > 0);

		for (let i = 0; i < users.length; i++) {
			const user = users[i];
			user.lbpos = i + 1;

			user.rank = eloToRank(user.elorating);
			user.save();
		}

		interaction.reply("LB Positions have been updated.");
	},
});
