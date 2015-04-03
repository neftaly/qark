"use strict";

import React from "react";
import component from "omniscient";
import R from "ramda";
import moment from "moment";
import uuidGenerator from "uuid";
import {
    Button,
    Glyphicon,
    Panel,
    ListGroup,
    ListGroupItem
} from "react-bootstrap";

import Markdown from "./Markdown";


const Comment = component(({ comment }) => {
    return <ListGroupItem>
        <b>{comment.name}</b>&nbsp;
        ({ moment(comment.date).calendar() }):
        <Markdown>{comment.comment}</Markdown>
    </ListGroupItem>;
}).jsx;


// TODO: Give this component some state or w/e
// We don't want it to update the main state until "submit" is pushed.
const CommentBox = component(({}, { postNewComment }) => {
    const temporarySubmitHandler = (event) => {
        postNewComment({ target: event.target.parentNode.firstChild });
    };

    return <div>
        <textarea placeholder="Write a new comment" />
        <button onClick={temporarySubmitHandler}>Submit</button>
    </div>;
}).jsx;


const postNewComment = R.curry((itemCursor, event) => {
    const comment = {
        name: "engineer1",
        date: moment(),
        uuid: uuidGenerator.v4(),
        comment: event.target.value
    };

    itemCursor.cursor("comments").merge({ [comment.uuid]: comment });
});


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
                <CommentBox statics={{ postNewComment: postNewComment(itemCursor) }} />
            </ListGroupItem>
        </ListGroup>
    </Panel>;
}).jsx;


export {
    Comment,
    CommentBox,
    postNewComment
};
export default CommentList;
