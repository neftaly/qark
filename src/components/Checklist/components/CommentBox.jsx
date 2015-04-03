"use strict";

import React from "react";
import R from "ramda";
import moment from "moment";
import uuidGenerator from "uuid";
import {
    Panel,
    Button,
    ButtonGroup
} from "react-bootstrap";

import Markdown from "./Markdown";


const CommentBox = React.createClass({

    getInitialState: function() {
        return {
            text: "",
            preview: false
        };
    },


    update: function(property, value) {
        return (event) => {
            this.setState({
                [property]: (value !== undefined) ? value : event.target.value
            });
        };
    },


    submit: function () {
        const { props, state } = this;
        const { commentsCursor } = props.statics;

        const uuid = uuidGenerator.v4();
        const comment = {
            [uuid]: {
                uuid,
                name: "engineer1",
                date: moment(),
                text: state.text
            }
        };

        commentsCursor.merge(comment);

        this.update(text, ""); // Reset comment box
    },


    render: function () {
        const { props, state } = this;

        return <div id={props.id}>

            <textarea
                placeholder="Write a new comment"
                onChange={ this.update("text") }
                value={state.text}
                className="form-control" />

            <br />

            <div className='clearfix'>
                <ButtonGroup className="pull-right">
                    <Button
                        onClick={ this.update("preview", !state.preview) }
                        bsStyle="default">
                        Preview
                    </Button>
                    <Button
                        type="submit"
                        onClick={this.submit}
                        bsStyle="primary">
                        Submit
                    </Button>
                </ButtonGroup>
            </div>

            <br />

            <div style={{
                display: (state.preview) ? "block" : "none"
            }}>
                <br />
                <Panel header="Preview">
                    <Markdown>{state.text}</Markdown>
                </Panel>
            </div>

        </div>;
    }

});


export default CommentBox;
