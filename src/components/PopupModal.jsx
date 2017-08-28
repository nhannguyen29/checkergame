import React, {Component} from 'react'
import {Button, Header, Modal} from 'semantic-ui-react'

export default class PopupModal extends Component {
    constructor(props) {
        super(props);
        // save the popup state
        this.state = { modalOpen: props.gameOver, modalContent: props.modalContent}
    }

    handleOpen(e) {
        this.setState({modalOpen: true, modalContent: 'You gave up!'})
    }

    handleClose(e) {
        this.setState({modalOpen: false, modalContent: ''})
    }

    backToLobby(e) {
        this.setState({modalOpen: false, modalContent: ''})
        e.preventDefault();
        window.location.href = "/";
    }

    render() {
        const { gameOver, modalContent } = this.props;

        return (
            <Modal
                trigger={<Button onClick={this.handleOpen.bind(this)} className='startBtn' style={{backgroundColor: '#009688', color: '#FAFAFA'}} size='large'>I Give Up :(</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose.bind(this)}
                basic
                size='mini'
            >
                <Header icon='announcement' content='Game Over'/>
                <Modal.Content>
                    <h3>{this.state.modalContent}</h3>
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