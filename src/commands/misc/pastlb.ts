import PastUserStats from "../../schemas/PastUserStats";
import { Command } from "../../structures/Command";

export default new Command({
	name: "pastlb",
	description: "Get all the players from best elo to worst from Ranked Games",

	run: async ({ interaction }) => {
		if (!(interaction.user.id === "930744788859359282")) {
			interaction.reply("You do not have permission to use this command!");
		}

		var users = await PastUserStats.find({});
		users.sort((a, b) => b.elorating - a.elorating);

		users = users.filter((user) => user.gamehistory.length > 0);

		var playernames = [];
		var elorating = [];
		var position = [];

		for (let i = 0; i < users.length; i++) {
			const user = users[i];

			const userID = user.discordID;
			const userMention = `<@${userID}>`;

			playernames.push(userMention);
			elorating.push(user.elorating);
			position.push(`#${i + 1}`);
		}

		interaction.reply({
			embeds: [
				{
					title: `Previous Ranked Game Leaderboard`,
					description: `Team Necro's leaderboard private ranked standings up until ${
						new Date().toLocaleString().split(",")[0]
					}!`,
					color: 0xefb859,
					fields: [
						{
							name: `Player`,
							value: `${playernames.join("\n")}`,
							inline: true,
						},
						{
							name: `ELO`,
							value: `${elorating.join("\n")}`,
							inline: true,
						},
						{
							name: `Position`,
							value: `${position.join("\n")}`,
							inline: true,
						},
					],
				},
			],
		});
	},
});
