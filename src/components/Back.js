import React, { Component } from 'react'
import "../static/back.css"
export class Back extends Component {
    render() {
        return (
            <div>
                <div className="flex" onClick={this.props.handleBackButton} >
        
                    <svg class="vector" width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 11.4285H9.14287L17.1429 3.42855L13.7143 0L0 13.7143L13.7143 27.4285L17.1428 24L9.14287 16H32V11.4285Z" fill="black"/>
            </svg>
            
                <p class="back">Go Back</p>
            </div></div>
        )
    }
}
export default Back;