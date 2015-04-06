"use strict";

import React from "react";
import component from "omniscient";
import moment from "moment";
import {
    Button,
    Glyphicon,
    Panel,
    ListGroup,
    ListGroupItem
} from "react-bootstrap";

import Markdown from "./Markdown";
import CommentBox from "./CommentBox";


const Comment = component(({ comment }) => {
    return <ListGroupItem>
        <b>{comment.name}</b>&nbsp;
        ({ moment(comment.date).calendar() }):
        <Markdown>{comment.text}</Markdown>
    </ListGroupItem>;
}).jsx;


// See TODO above
const CommentList = component(({ itemCursor }) => {
    const commentsCursor = itemCursor.cursor("comments");

    return <Panel header="Comments">
        <ListGroup fill>

            {
                commentsCursor.toArray().map((commentCursor) => {
                    const comment = commentCursor.toJS();
                    return <Comment
                        statics={{ commentCursor }}
                        comment={comment}
                        key={comment.uuid} />;
                })
            }

            <ListGroupItem>
                <CommentBox statics={{ commentsCursor }} />
            </ListGroupItem>
        </ListGroup>
    </Panel>;
}).jsx;


export {
    Comment
};
export default CommentList;
