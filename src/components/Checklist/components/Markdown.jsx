"use strict";

import React from "react";
import component from "omniscient";
import Remarkable from "remarkable";


const md = new Remarkable({
    html: false,
    xhtmlOut: true,
    breaks: false,
    langPrefix: "language-",
    linkify: true
});


const Markdown = component(({ children }) => {
    return <span
        dangerouslySetInnerHTML={{
            __html: md.render(children)
        }} />;
}).jsx;


export default Markdown;
