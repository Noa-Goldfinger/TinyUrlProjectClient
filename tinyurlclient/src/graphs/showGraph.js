import React, { useState, useEffect } from 'react';
import axios from "axios";
import ChartComponent from "../graphs/pieGraph";

export default function ShowGraph() {
    const [links, setLinks] = useState([]);
    const [dictionary, setDictionary] = useState({});
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
        setDictionary({});
    };

    useEffect(() => {
        if (!selectedOption) return;

        const newDictionary = {};

        // עדכון המילון על בסיס ה- clicks
        links[selectedOption]?.clicks?.forEach(c => {
            const targetParamValue = c.targetParamValue;
            newDictionary[targetParamValue] = (newDictionary[targetParamValue] || 0) + 1;
        });

        setDictionary(newDictionary);
        console.log(newDictionary);
    }, [selectedOption, links]);

    useEffect(() => {
        if (!selectedOption) return;

        const updatedDictionary = {};
        let needsUpdate = false;

        links[selectedOption]?.targetValues?.forEach(v => {
            const newValue = dictionary[v.value];
            if (newValue !== undefined) {
                needsUpdate = true;
                updatedDictionary[v.name] = newValue;
            }
        });

        if (needsUpdate) {
            setDictionary(updatedDictionary);
        }
    }, [selectedOption, dictionary, links]);

    useEffect(() => {
        axios.get(`http://localhost:3000/links`)
            .then(res => {
                setLinks(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <h2>Select an option:</h2>
            <select value={selectedOption} onChange={handleChange}>
                <option value="">Select...</option>
                {links.map((l, index) => (
                    <option key={index} value={index}>{l.originalUrl}</option>
                ))}
            </select>
            {selectedOption && Object.keys(dictionary).length > 0 && (
                <ChartComponent dictionary={dictionary} link={links[selectedOption]} />
            )}
        </>
    );
}
