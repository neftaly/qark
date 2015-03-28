"use strict";

import React from "react";
import { shouldComponentUpdate } from "omniscient";
import R from "ramda";
import {
    Modal,
    Button,
    ProgressBar
} from "react-bootstrap";


/**
 * Modal for file save/export
 *
 * @extends React.ReactComponent
 * @class Table
 * @constructor
 * @namespace components
 * @param {Immstruct.cursor} props.rootCursor
 */
export default React.createClass({
    mixins: [{ shouldComponentUpdate }],

    render: function () {
        let { rootCursor } = this.props;

        //let stateCursor = cursor.cursor("state");
        let itemsCursor = rootCursor.cursor("list");

        return <div className="static-modal">
            <Modal title="Temporary example success modal"
                bsStyle="primary"
                backdrop={true}
                animation={true}
                container={0}
                onRequestHide={0}>
                <div className="modal-body">
                    Congratulations! Everything has passed.
                    <code><pre>
                        { JSON.stringify(itemsCursor.toJS(), null, 4) }
                    </pre></code>
                </div>
                <div className="modal-footer">
                    <Button>Close</Button>
                    <Button bsStyle="primary">Save changes</Button>
                </div>
            </Modal>
        </div>;
    }

});
