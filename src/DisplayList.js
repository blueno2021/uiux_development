import React, { Component } from 'react';
import { Button} from 'react-bootstrap'
import './DisplayList.css';


export default class DisplayList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        return(
                /*This is basically an if else statment that is checking to see if the list is in the playlist or not and depending on if it is or not then
                displaying it appropriately*/
               this.props.inPlaylist ? (
                <div>
                {/*This following logic maps each items in the playlist to the following HTML. Basically, each item in the playlist will have its image, name,
                duration, and then buttons to add or subtract the number of times it plays in the playlist as well as an input box showing the amount of times 
                it appears in the playlist, and a remove button */}
                {this.props.playlist.map(item => 
                    <div className="playlistItem" key={item.name}>
                    <div className="playlistAlbum">
                        <div><img src={item.img} alt={item.name}/> </div>     
                            <div className="albumInfo">
                                <h2>{item.name}</h2>
                               <p>{item.length} minutes</p>
                            </div>
                        </div>
                        <div className="playlistButtonsDiv">
                                <div>
                                    <p># of times in playlist</p>
                                    <button onClick={()=>this.props.change(item, -1)} className="minus" disabled={item.playlistCount===1}>-</button>
                                    <input className="numTimes" value={item.playlistCount}
                                    type="number" readOnly disabled/>
                                    <button onClick={()=>this.props.change(item, 1)} className="plus">+</button>
                                </div>
                            
                            <div className="remove"><Button onClick={() =>this.props.remove(item)}>Remove</Button></div>
                        </div>
                    </div>
                )}
                </div>
               ) : (
                /*This logic handles creating the cards for each of the items in the list. Each card contains the image, the name of the show, and information about
                whether it won the tony, if its on Broadway, and how long the OBC recording is. Additionally, each card will have a button to add it to the playlist */ 
                <div className="cardContainer">
                {this.props.list.map(item => 
                    <div key={item.name} className="card">
                        <img src={item.img} alt={item.name}/>
                        <div className="cardInfo">
                            <h2>{item.name}</h2>
                            <p>Won Tony Award for Best Musical: {item.tony}</p>
                            <p>Currently Running on Broadway: {item.running}</p>
                            <p>Album Length: {item.length} minutes</p>
                            <div className="addButtonDiv"><Button onClick={() => this.props.add(item)}>Add to Playlist</Button> </div>
                        </div>
                    </div>
                )}
            </div>
               )
        )
    }


}