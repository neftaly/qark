"use strict";

import React from "react";
import component from "omniscient";


const LayoutHeader = React.createClass({
    render: function () {
        return <div className="flexRowContainer" style={{
                backgroundColor: "white",
                borderBottom: "1px solid #ddd",
                width: "100%"
            }}>

                <img src="http://i.imgur.com/74YarCa.png" style={{
                    marginTop: "3px",
                    marginLeft: "4px",
                    height: "32px"
                }} />

                <div className="flex pull-right">
                    {this.props.children}
                </div>

        </div>;
    }
});


const LayoutBody = React.createClass({
    render: function () {
        return <div
            className="flex"
            style={{
                scrollBehavior: "smooth",
                overflowX: "auto",
                overflowY: "scroll"
            }}>
            {this.props.children}
        </div>;
    }
});


const Layout = React.createClass({
    render: function () {
        return <div className="flexColumnContainer" style={{
            height: "100vh"
        }}>
            {this.props.children}
        </div>;
    }
});

export {
    LayoutHeader,
    LayoutBody,
    Layout
};
