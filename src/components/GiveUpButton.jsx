import React from 'react';
import { Button } from 'semantic-ui-react';

export default class GiveUpButton extends React.Component {
    handleClick(e) {
        e.preventDefault();
        console.log("Hello");
    }

    render() {
        return <Button onClick={this.handleClick} className='startBtn' color='teal' size='large'>Just Give Up Bra</Button>
    }
};
