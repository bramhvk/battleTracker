import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import {MonsterOverview} from "./pages/monster/MonsterOverview";
import MonsterEdit from "./pages/monster/MonsterEdit";
import MonsterExtract from "./pages/monster/MonsterExtract";
import EncounterOverview from "./pages/encounters/EncounterOverview";
import CampaignOverview from "./pages/campaigns/CampaignOverView";
import PlayerCharacterOverview from "./pages/playersCharacters/PlayerCharacterOverView";
import PlayerCharacterCreate from "./pages/playersCharacters/PlayerCharacterCreate";
import PlayerCharacterEdit from "./pages/playersCharacters/PlayerCharacterEdit";
import EncounterEdit from "./pages/encounters/EncounterEdit";
import EncounterCreate from "./pages/encounters/EncounterCreate";
import CampaignEdit from "./pages/campaigns/CampaignEdit";
import CampaignCreate from "./pages/campaigns/CampaignCreate";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/campaigns" element={<CampaignOverview />} />
                    <Route path="/campaigns/create" element={<CampaignCreate />} />
                    <Route path="/campaigns/edit" element={<CampaignEdit />} />

                    <Route path="/enemies" element={<MonsterOverview />} />
                    <Route path="/enemies/edit" element={<MonsterEdit />} />
                    <Route path="/enemies/extract" element={<MonsterExtract />} />

                    <Route path="/player-characters" element={<PlayerCharacterOverview />} />
                    <Route path="/player-characters/create" element={<PlayerCharacterCreate />} />
                    <Route path="/player-characters/edit" element={<PlayerCharacterEdit />} />

                    <Route path="/encounters" element={<EncounterOverview />} />
                    <Route path="/encounters/create" element={<EncounterCreate />} />
                    <Route path="/encounters/edit" element={<EncounterEdit />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;