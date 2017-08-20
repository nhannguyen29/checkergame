import React from 'react';

export default class App extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div className='login-page'>
                {children}
            </div>
        );
    }
};
