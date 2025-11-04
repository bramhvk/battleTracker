import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import {MonsterOverview} from "./pages/monster/MonsterOverview";
import MonsterEdit from "./pages/monster/MonsterEdit";
import MonsterExtract from "./pages/monster/MonsterExtract";
import EncounterOverview from "./pages/encounters/EncounterOverview";
import CampaignOverview from "./pages/campaigns/CampaignOverView";
import PlayerCharacterOverview from "./pages/playersCharacters/PlayerCharacterOverView";
import EncounterEdit from "./pages/encounters/EncounterEdit";
import CampaignEdit from "./pages/campaigns/CampaignEdit";
import PlayerCharacterEdit from "./pages/playersCharacters/PlayerCharacterEdit";
import BattleTracker from "./pages/battleTracker/BattleTracker";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/campaigns" element={<CampaignOverview />} />
                    <Route path="/campaigns/create" element={<CampaignEdit />} />
                    <Route path="/campaigns/edit" element={<CampaignEdit />} />

                    <Route path="/monsters" element={<MonsterOverview />} />
                    <Route path="/monsters/edit" element={<MonsterEdit />} />
                    <Route path="/monsters/extract" element={<MonsterExtract />} />

                    <Route path="/player-characters" element={<PlayerCharacterOverview />} />
                    <Route path="/player-characters/create" element={<PlayerCharacterEdit />} />
                    <Route path="/player-characters/edit" element={<PlayerCharacterEdit />} />

                    <Route path="/encounters" element={<EncounterOverview />} />
                    <Route path="/encounters/create" element={<EncounterEdit />} />
                    <Route path="/encounters/edit" element={<EncounterEdit />} />

                    <Route path="/battle-tracker" element={<BattleTracker />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;