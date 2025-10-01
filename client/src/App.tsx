import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import Layout from "./components/Layout";
import {TextExtractionComponent} from "./components/OCR/TextExtractionComponent";
import {MonsterOverview} from "./components/enemies/MonsterOverview";

function App() {

    // const [data, setData] = useState({characters: []})
    //
    // useEffect(() => {
    //     fetch("/api/characters")
    //         .then(res => res.json())
    //         .then((data) => {
    //             setData(data)
    //         })
    // }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/enemies" element={<MonsterOverview />} />
                    {/*<Route path="ocr" element={<OCR />} />*/}
                    {/*<Route path="settings" element={<Settings />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;