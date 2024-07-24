document.getElementById("snapshot-btn").onclick = async() => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true})
    let result
    try {
        [{result}] = await chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: async () => {
                const getStamps = async (key) => {
                    return new Promise((resolve) => {
                        chrome.storage.local.get([key], (result) => {
                            resolve(result[key] || {});
                        });
                    });
                }

                const div = document.getElementsByClassName("MuiCollapse-wrapperInner")
                let parsedData;
                try {
                    parsedData = JSON.parse(div[0].lastChild.textContent);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                    return "Error: Unable to parse data from the page";
                }
                let combatStamps = parsedData.data.StampLv[0]
                let skillStamps = parsedData.data.StampLv[1]
                let miscStamps = parsedData.data.StampLv[2]
                let combatStamps1 = await getStamps("combatStamps1")
                let combatStamps2 = await getStamps("combatStamps2")
                let skillStamps1 = await getStamps("skillStamps1")
                let skillStamps2 = await getStamps("skillStamps2")
                let miscStamps1 = await getStamps("miscStamps1")
                let miscStamps2 = await getStamps("miscStamps2")

                const isEmpty = (obj) => {
                    return Object.keys(obj).length ? false : true
                }
  
                if(!isEmpty(combatStamps1) && !isEmpty(combatStamps2)) {
                    await chrome.storage.local.set({"combatStamps1": combatStamps2})
                    await chrome.storage.local.set({"combatStamps2": combatStamps})
                } else if(!isEmpty(combatStamps1)) {
                    await chrome.storage.local.set({"combatStamps2": combatStamps})
                } else {
                    await chrome.storage.local.set({"combatStamps1": combatStamps})
                }
                
                if(!isEmpty(skillStamps1) && !isEmpty(skillStamps2)) {
                    await chrome.storage.local.set({"skillStamps1": skillStamps2})
                    await chrome.storage.local.set({"skillStamps2": skillStamps})
                } else if(!isEmpty(skillStamps1)) {
                    await chrome.storage.local.set({"skillStamps2": skillStamps})
                } else {
                    await chrome.storage.local.set({"skillStamps1": skillStamps})
                }
            
                if(!isEmpty(miscStamps1) && !isEmpty(miscStamps2)) {
                    await chrome.storage.local.set({"miscStamps1": miscStamps2})
                    await chrome.storage.local.set({"miscStamps2": miscStamps})
                } else if(!isEmpty(miscStamps1)) {
                    await chrome.storage.local.set({"miscStamps2": miscStamps})
                } else {
                    await chrome.storage.local.set({"miscStamps1": miscStamps})
                }
                
                return "Snapshot complete!"
            }
        })
    } catch (e) {
        return e
    }

    let targetDiv = document.getElementById("results")
    targetDiv.textContent = result
}

document.getElementById("compare-btn").onclick = async() => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true})
    let result
    try {
        [{result}] = await chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: async () => {
                const getStamps = async (key) => {
                    return new Promise((resolve) => {
                        chrome.storage.local.get([key], (result) => {
                            resolve(result[key] || {});
                        });
                    });
                }

                let combatStamps1 = await getStamps("combatStamps1")
                let combatStamps2 = await getStamps("combatStamps2")
                let skillStamps1 = await getStamps("skillStamps1")
                let skillStamps2 = await getStamps("skillStamps2")
                let miscStamps1 = await getStamps("miscStamps1")
                let miscStamps2 = await getStamps("miscStamps2")
                let combatKeys = Object.keys(combatStamps1)
                let skillKeys = Object.keys(skillStamps1)
                let miscKeys = Object.keys(miscStamps1)
                let result = []
                if(!combatKeys.length || !skillKeys.length || !miscKeys.length) {
                    return "No stamps recorded!"
                }

                const stampNamesCombat = {
                    "0": "Sword Stamp",
                    "1": "Heart Stamp",
                    "2": "Mana Stamp",
                    "3": "Tomahawk Stamp",
                    "4": "Target Stamp",
                    "5": "Shield Stamp",
                    "6": "Longsword Stamp",
                    "7": "Kapow Stamp",
                    "8": "Fist Stamp",
                    "9": "Battleaxe Stamp",
                    "10": "Agile Stamp",
                    "11": "Vitality Stamp",
                    "12": "Book Stamp",
                    "13": "Manamoar Stamp",
                    "14": "Clover Stamp",
                    "15": "Scimitar Stamp",
                    "16": "Bullseye Stamp",
                    "17": "Feather Stamp",
                    "18": "Polearm Stamp",
                    "19": "Violence Stamp",
                    "20": "Buckler Stamp",
                    "21": "Hermes Stamp",
                    "22": "Sukka Foo",
                    "23": "Arcane Stamp",
                    "24": "Avast Yar Stamp",
                    "25": "Steve Sword Stamp",
                    "26": "Blover Stamp",
                    "27": "Stat Graph Stamp",
                    "28": "Gilded Axe Stamp",
                    "29": "Diamond Axe Stamp",
                    "30": "Tripleshot Stamp",
                    "31": "Blackheart Stamp",
                    "32": "Maxo Slappo Stamp",
                    "33": "Sashe Sidestamp",
                    "34": "Intellectostampo",
                    "35": "Conjocharmo Stamp",
                    "36": "Dementia Sword Stamp",
                    "37": "Golden Sixes Stamp",
                    "38": "Stat Wallstreet Stamp",
                    "39": "Void Sword Stamp",
                    "40": "Void Axe Stamp",
                    "41": "Capitalist Stats Stamp"
                }

                
                const stampNamesSkills = {
                    "0": "Pickaxe Stamp",
                    "1": "Hatchet Stamp",
                    "2": "Anvil Zoomer Stamp",
                    "3": "Lil Mining Baggy Stamp",
                    "4": "Twin Ores Stamp",
                    "5": "Choppin' Bag Stamp",
                    "6": "Duplogs Stamp",
                    "7": "Matty Bag Stamp",
                    "8": "Smart Dirt Stamp",
                    "9": "Cool Diggy Tool Stamp",
                    "10": "High IQ Lumber Stamp",
                    "11": "Swag Swingy Tool Stamp",
                    "12": "Alch Go Brr Stamp",
                    "13": "Brainstew Stamps",
                    "14": "Drippy Drop Stamp",
                    "15": "Droplots Stamp",
                    "16": "Fishing Rod Stamp",
                    "17": "Fishead Stamp",
                    "18": "Catch Net Stamp",
                    "19": "Fly Intel Stamp",
                    "20": "Bag o Heads Stamp",
                    "21": "Holy Mackerel Stamp",
                    "22": "Bugsack Stamp",
                    "23": "Buzz Buzz Stamp",
                    "24": "Hidey Box Stamp",
                    "25": "Purp Froge Stamp",
                    "26": "Spikemouth Stamp",
                    "27": "Shiny Crab Stamp",
                    "28": "Gear Stamp",
                    "29": "Stample Stamp",
                    "30": "Saw Stamp",
                    "31": "Amplestample Stamp",
                    "32": "SpoOoky Stamp",
                    "33": "Flowin' Stamp",
                    "34": "Prayday Stamp",
                    "35": "Banked Points Stamp",
                    "36": "Cooked Meal Stamp",
                    "37": "Spice Stamp",
                    "38": "Ladle Stamp",
                    "39": "Nest Eggs Stamp",
                    "40": "Egg Stamp",
                    "41": "Lab Tube Stamp",
                    "42": "Sailboat Stamp",
                    "43": "Gamejoy Stamp",
                    "44": "Divine Stamp",
                    "45": "Multitool Stamp",
                    "46": "Skelefish Stamp",
                    "47": "Crop Evo Stamp",
                    "48": "Sneaky Peeky Stamp",
                    "49": "Jade Mint Stamp",
                    "50": "Summoner Stone Stamp",
                    "51": "White Essence Stamp",
                    "52": "Triad Essence Stamp",
                    "53": "Dark Triad Essence Stamp"
                }

                const stampNamesMisc = {
                    0: "Questin Stamp",
                    1: "Mason Jar Stamp",
                    2: "Crystallin Stamp",
                    3: "Arcade Ball Stamp",
                    4: "Gold Ball Stamp",
                    5: "Potion Stamp",
                    6: "Golden Apple Stamp",
                    7: "Ball Timer Stamp",
                    8: "Card Stamp",
                    9: "Forge Stamp",
                    10: "Vendor Stamp",
                    11: "Sigil Stamp",
                    12: "Talent I Stamp",
                    13: "Talent II Stamp",
                    14: "Talent III Stamp",
                    15: "Talent IV Stamp",
                    16: "Talent V Stamp",
                    17: "Talent S Stamp",
                    18: "Multikill Stamp",
                    19: "Biblio Stamp",
                    20: "DNA Stamp",
                    21: "Refinery Stamp",
                    22: "Atomic Stamp"
                }


                combatKeys.forEach(cKey => {
                    let cStamp
                    let cDiff
                    if(combatStamps1[cKey] !== combatStamps2[cKey]) {
                        cStamp = stampNamesCombat[cKey]
                        cDiff = Math.abs(combatStamps2[cKey] - combatStamps1[cKey])
                        result.push(`${cStamp} increased by ${cDiff} levels since last snapshot!`)
                    }
                })
                skillKeys.forEach(sKey => {
                    let sStamp
                    let sDiff
                    if(skillStamps1[sKey] !== skillStamps2[sKey]) {
                        sStamp= stampNamesSkills[sKey]
                        sDiff = Math.abs(skillStamps2[sKey] - skillStamps1[sKey])
                        result.push(`${sStamp} increased by ${sDiff} levels since last snapshot!`)
                    }
                })
                miscKeys.forEach(mKey => {
                    let mStamp
                    let mDiff
                    if(miscStamps1[mKey] !== miscStamps2[mKey]) {
                        mStamp = stampNamesMisc[mKey]
                        mDiff = Math.abs(miscStamps2[mKey] - miscStamps1[mKey])
                        result.push(`${mStamp} increased by ${mDiff} levels since last snapshot!`)
                    }
                })
                if(!result.length) {
                    return "No stamps changed!"
                } else {
                    result = result.map(res => {
                        return `<p>${res}</p>`
                    })
                    return result.join("")
                }
            }
        })
    } catch (e) {
        return
    }
    let targetDiv = document.getElementById("results")
    targetDiv.innerHTML = "Stamps Changed: " + result
}