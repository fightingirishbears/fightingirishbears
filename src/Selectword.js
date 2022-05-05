import React from 'react';

export default function Selectword({ words }) {

    const random = Math.floor(Math.random() * words.length)

    return words[random].word


}