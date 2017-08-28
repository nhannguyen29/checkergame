import React, {Component} from 'react'
import {Button, Header, Modal} from 'semantic-ui-react'

export default class PopupModal extends Component {
    constructor(props) {
        super(props);
        // save the popup state
        this.state = { modalOpen: this.props.gameOver, modalContent: this.props.modalContent}
    }
    //
    // handleOpen(e) {
    //     this.setState({modalOpen: true, modalContent: 'You gave up!'})
    // }
    //
    handleClose(e) {
        this.setState({modalOpen: false, modalContent: ''})
    }

    backToLobby(e) {
        this.setState({modalOpen: false, modalContent: ''})
        e.preventDefault();
        window.location.href = "/";
    }

    render() {
        return (
            <Modal
                open={this.props.gameOver}
                // onClose={this.handleClose.bind(this)}
                basic
                size={this.props.modalSize}
            >
                <Header icon='announcement' content='Game Over'/>
                <Modal.Content>
                    <h3>{this.props.modalContent}</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button style={{backgroundColor: '#009688', color: '#FAFAFA'}} onClick={this.backToLobby.bind(this)} inverted>
                        Back to lobby
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}