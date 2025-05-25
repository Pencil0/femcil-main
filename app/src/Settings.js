const value = Object.seal({
    /** @type {IPAddress[]} */
    listenerForbiddenIPs: [],
    /** @type {string[]} */
    listenerAcceptedOrigins: [],
    listenerMaxConnections: 100,
    listenerMaxClientDormancy: 1000 * 60,
    listenerMaxConnectionsPerIP: -1,
    listeningPort: 3000,
    serverFrequency: 25,
    serverName: "Pencil Main",
    serverGamemode: "FFA",

    chatEnabled: true,
    /** @type {string[]} */
    chatFilteredPhrases: [],
    chatCooldown: 1000,

    worldMapX: 0,
    worldMapY: 0,
    worldMapW: 7071,
    worldMapH: 7071,
    worldFinderMaxLevel: 16,
    worldFinderMaxItems: 16,
    worldSafeSpawnTries: 64,
    worldSafeSpawnFromEjectedChance: 0.8,
    worldPlayerDisposeDelay: 25 * 60,

    worldEatMult: 1.140175425099138,
    worldEatOverlapDiv: 3,

    worldPlayerBotsPerWorld: 0,
    /** @type {string[]} */
    worldPlayerBotNames: [],
    /** @type {string[]} */
    worldPlayerBotSkins: [],
    worldMinionsPerPlayer: 0,
    worldMaxPlayers: 50,
    worldMinCount: 0,
    worldMaxCount: 2,
    matchmakerNeedsQueuing: false,
    matchmakerBulkSize: 1,
//minions
    minionName: "*",
    minionSpawnSize: 32,
    minionEnableERTPControls: false,
    minionEnableQBasedControl: true,
//pellet
    pelletMinSize: 10,
    pelletMaxSize: 20,
    pelletGrowTicks: 25 * 60,
    pelletCount: 1000,
//virus
    virusMinCount: 30,
    virusMaxCount: 90,
    virusSize: 100,
    virusFeedTimes: 7,
    virusPushing: false,
    virusSplitBoost: 780,
    virusPushBoost: 120,
    virusMonotonePops: false,
//ejected mass
    ejectedSize: 38,
    ejectingLoss: 0,
    ejectDispersion: 0.3,
    ejectedCellBoost: 780,
//mothercell
    mothercellSize: 149,
    mothercellCount: 100,
    mothercellPassiveSpawnChance: 0.05,
    mothercellActiveSpawnSpeed: 1,
    mothercellPelletBoost: 90,
    mothercellMaxPellets: 200,
    mothercellMaxSize: 65535,
//player
    playerRoamSpeed: 32,
    playerRoamViewScale: 0.4,
    playerViewScaleMult: 1,
    playerMinViewScale: 0.01,
    playerMaxNameLength: 16,
    playerAllowSkinInName: true,
    playerMinSize: 32,
    playerSpawnSize: 32,
    playerMaxSize: 1500,
    playerMinSplitSize: 60,
    playerMinEjectSize: 60,
    playerSplitCap: 255,
    playerEjectDelay: 0,
    playerMaxCells: 16,
    playerMoveMult: 1,
    playerSplitSizeDiv: 1.414213562373095,
    playerSplitDistance: 40,
    playerSplitBoost: 780,
    playerNoCollideDelay: 0,
    playerNoMergeDelay: 0,
    /** @type {"old" | "new"} */
    playerMergeVersion: "new",
    playerMergeTime: 0,
    playerMergeTimeIncrease: 0,
    playerDecayMult: 0.002
});

module.exports = value;