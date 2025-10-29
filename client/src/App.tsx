import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import {MonsterOverview} from "./components/enemies/MonsterOverview";
import EditMonster from "./components/enemies/pages/EditMonster";
import ExtractMonster from "./components/enemies/pages/ExtractMonster";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/enemies" element={<MonsterOverview />} />
                    <Route path="/enemies/edit" element={<EditMonster />} />
                    <Route path="/enemies/extract" element={<ExtractMonster />} />
                    {/*<Route path="ocr" element={<OCR />} />*/}
                    {/*<Route path="settings" element={<Settings />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;