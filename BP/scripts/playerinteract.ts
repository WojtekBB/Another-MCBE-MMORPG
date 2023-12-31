import * as server from '@minecraft/server'
import * as ui from '@minecraft/server-ui'

const world = server.world

export function playerinteract(iplayer: server.Player, player: server.Player) {
    const interactui = new ui.ActionFormData()
        .title(iplayer.name)
        .body(`Money: ${iplayer.getDynamicProperty("money")}
    \nBank: ${iplayer.getDynamicProperty("bankbalance")}`)
        .button("Invite To Guild")
        .button("Send Money")


    interactui.show(player).then(data => {
        switch (data.selection) {
            case 1:
                var guildmemberscount = world.scoreboard.getObjective("guildmemberscount").getScore(String(player.getDynamicProperty("guildid")))

                if (guildmemberscount < 9 && player.getDynamicProperty("guildid") != 0) {
                    iplayer.setDynamicProperty("guildinvite", player.getDynamicProperty("guildid"))
                    iplayer.sendMessage("§3You got a guild invite!")
                } else { player.sendMessage("§4ERROR!") }
                break;
            case 2:
                new ui.ModalFormData()
                    .title("Send Money")
                    .slider("Choose Amount", 0, Math.trunc(player.getDynamicProperty("money") as number), 1, 0)
                    .show(player).then((data) => {
                        iplayer.setDynamicProperty("money", iplayer.getDynamicProperty("money") + data[0])
                        player.setDynamicProperty("money", player.getDynamicProperty("money") as number - data[0])
                    })
                break;
        }
    })
}