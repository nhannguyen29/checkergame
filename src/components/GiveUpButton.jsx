import React from 'react';
import { Button } from 'semantic-ui-react';

export default class GiveUpButton extends React.Component {
    handleClick(e) {
        e.preventDefault();
        window.location.href = "/game";
    }

    render() {
        const { modalContent } = this.props;

        return <Button onClick={this.handleClick.bind(this)} className='startBtn' style={{ backgroundColor: '#009688', color: '#FAFAFA' }} size='large'>Just Give Up Bra</Button>
    }
};
