"use strict";

import React from "react";
//import { shouldComponentUpdate } from "omniscient";
import Remarkable from "remarkable";


const md = new Remarkable({
    html: false,
    xhtmlOut: true,
    breaks: false,
    langPrefix: "language-",
    linkify: true
});


const Markdown = React.createClass({
    //mixins: [shouldComponentUpdate],

    render: function() {
        const { children } = this.props;
        return <span
            dangerouslySetInnerHTML={{
                __html: md.render(children)
            }} />;
    }

});


export default Markdown;
