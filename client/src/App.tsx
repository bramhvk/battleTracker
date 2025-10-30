import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import {MonsterOverview} from "./pages/monster/MonsterOverview";
import MonsterEdit from "./pages/monster/MonsterEdit";
import MonsterExtract from "./pages/monster/MonsterExtract";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/enemies" element={<MonsterOverview />} />
                    <Route path="/enemies/edit" element={<MonsterEdit />} />
                    <Route path="/enemies/extract" element={<MonsterExtract />} />
                    {/*<Route path="ocr" element={<OCR />} />*/}
                    {/*<Route path="settings" element={<Settings />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;