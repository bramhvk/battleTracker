import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import {MonsterOverview} from "./pages/monster/MonsterOverview";
import MonsterEdit from "./pages/monster/MonsterEdit";
import MonsterExtract from "./pages/monster/MonsterExtract";
import EncounterOverview from "./pages/encounters/EncounterOverview";
import CampaignOverview from "./pages/campaigns/CampaignOverView";
import PlayerCharacterOverview from "./pages/playersCharacters/PlayerCharacterOverView";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/campaigns" element={<CampaignOverview />} />

                    <Route path="/enemies" element={<MonsterOverview />} />
                    <Route path="/enemies/edit" element={<MonsterEdit />} />
                    <Route path="/enemies/extract" element={<MonsterExtract />} />

                    <Route path="/player-characters" element={<PlayerCharacterOverview />} />

                    <Route path="/encounters" element={<EncounterOverview />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;