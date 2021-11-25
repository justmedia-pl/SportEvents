import React,{Component} from "react";
import {Toast} from "react-bootstrap";

export default class MyToast extends Component {
    render(){
        const toastCss = {
            position:'fixed',
            top: '10px',
            right: '10px',
            zIndex: '1',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'

        };
        return(
            <div style={this.props.children.show ? toastCss : null}>
                <Toast className={"border bg-"+this.props.children.messageType+" text-white"} show={this.props.children.show}>
                    <Toast.Header className={"bg-"+this.props.children.messageType+" text-white"} closeButton={false}>
                        <strong className={"mr-auto"}>{this.props.children.messageType}</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.children.message}
                    </Toast.Body>
                </Toast>
            </div>
        )
    }
}