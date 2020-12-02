import React, { Component } from 'react';
import DisplayList from './DisplayList'
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
import './FilteredList.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FilteredList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tonyWinner: "All", 
            onBroadway: "All", 
            sortSelected: "Unsorted", 
            playlist:[],
            totalLength:0
        };
        this.onSelectFilterTonyWinners=this.onSelectFilterTonyWinners.bind(this)
        this.onSelectFilterOnBroadway=this.onSelectFilterOnBroadway.bind(this)
        this.onSelectSortFiler=this.onSelectSortFiler.bind(this)
        this.addToPlaylist=this.addToPlaylist.bind(this)
        this.removeFromPlaylist=this.removeFromPlaylist.bind(this)
        this.changePlaylistValue=this.changePlaylistValue.bind(this)
    }
    /*
    This changes the state by setting tonyWinner to the selected event, which is whatever filter option for if it won Best Musical (All, Yes, No) is selected. This helps matchesFilterTonyWinner to work correctly and return the correct list of shows.  
    */
    onSelectFilterTonyWinners = event => {
        this.setState({
            tonyWinner: event
        })
    };
    /*
    This changes the state by setting onBroadway to the selected event, which is whatever filter option for if it is currently running on Broadway (All, Yes, No) is selected. This helps matchesFilterOnBroadway to work correctly and return the correct list of shows.  
    */
    onSelectFilterOnBroadway = event => {
        this.setState({
            onBroadway: event
        })
    };
    /*
    This is checking whether an item matches the current filter for if the show won the Tony for Best Musical and only returning the items that 
    match the current the filter for this condition.
    */

    matchesFilterTonyWinner = item => {
        // all items should be shown when no filter is selected
        if(this.state.tonyWinner === 'All') { 
            return true
        } else if (this.state.tonyWinner === item.tony) {
            return true
        } else {
            return false
        }
    }
    /*
    This is checking whether an item matches the current filter for if the show is currently running on Broadway and only returning the items that 
    match the current the filter for this condition.
    */
    matchesFilterOnBroadway = item => {
        // all items should be shown when no filter is selected
        if(this.state.onBroadway === 'All') { 
            return true
        } else if (this.state.onBroadway === item.running) {
            return true
        } else {
            return false
        }
    }
    /*This handles the functionality for sorting. Based off of examples in the Javascript documentation for the sort funnction, which was linked in the Gear Up slides, and is found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort */
    compareFunction=(a,b)=>{
        if (this.state.sortSelected==='Ascending'){
            return a.length-b.length
        }
        else if(this.state.sortSelected==='Descending'){
            return b.length-a.length
        }
        else{
            return 0
        }
    }
    /*
    This changes the state by setting sortSelected to the selected event, which is whatever sorting option is currently selected for the length of the soundtrack(Unsorted, Ascending, Descending). This helps compareFunction to work correctly.  
    */
    onSelectSortFiler = event => {
        this.setState({
            sortSelected: event
        })
    };
    //This is a helper function called in aggregator to help in calculating the length of the playlist. Based off of examples in te Javascript documentation for the reduce function, which was linked in the Gear Up slides, and is found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce.
    add(accumulator, currentValue){
        //Have to multiply by playlistCount in case the album appears more than once in the playlist.
        return accumulator + (currentValue.length*currentValue.playlistCount)
    }
    //The function is responsible for calculating and returning how many minutes is the playlist. 
    aggregator(playlistList){
        let initialValue = 0
        let total=playlistList.reduce(this.add,initialValue)      
        return total
    }
    //This funtion handles the functionality surrounding adding a show's recording to the playlist
    addToPlaylist(item){
        let playlistList=this.state.playlist
        /*Checking to see if a show is already in the playlist and if isn't then incrementing its playlistCount and add it to playlist. 
          If it is already in the playlist then this loops throught the items until it gets to the correct one and returns then updates 
          the playlist count for that item. 
        */
        if(item.playlistCount===0){
            item.playlistCount=item.playlistCount+1
            playlistList.push(item)
        }
        else{
            for(let d of playlistList){
                if(d.name===item.name){
                    d.playlistCount=d.playlistCount+1
                    item.playlistCount=d.playlistCount
                    break
                }
            }
        }
        //Recaluclating the total playlist length
        let total=this.aggregator(playlistList)
        this.setState({
            playlist: playlistList, 
            totalLength:total
        })     
    }
    /*This function is called when a user either the presses either the plus or minus button for an item in the playlist. This function goes through the items in the playlist until it gets to the correct one and then it adds the value passed in, which is a 1 if the user pressed the plus button and -1 if the user presses the minus button.
    */
    changePlaylistValue(item, value){
        let playlistList=this.state.playlist
        for(let d of playlistList){
            if(d.name===item.name){
                d.playlistCount=d.playlistCount+value
                item.playlistCount=d.playlistCount
                break
            }
        }
        let total=this.aggregator(playlistList)
        this.setState({
            playlist: playlistList, 
            totalLength:total
        })     
    }
    //This function handles the functionality with removing an item from the playlist.
    removeFromPlaylist(item){
        var dict;
        let playlistList=this.state.playlist
        for(let d of playlistList){
            if(d.name===item.name){
                //save dictionary of current item so it can be filtered out later
                dict=d
                d.playlistCount=0
                item.playlistCount=0
                break
            }
        }
        //This is removing the current item from the shows in the playlist.
        playlistList = playlistList.filter(function(d) {
            return d !== dict
        })
        let total=this.aggregator(playlistList)

        this.setState({
            playlist: playlistList, 
            totalLength: total
        })    
    }
    
    render(){
        return(
            <div className="contentContainer">
                <h1>Create a Playlist of Original Broadway Cast Recordings</h1>
               <div className="cardAndFilterContainer">
                   <div className="filterDiv">
                       {/* The filters and sort functionality was created by using React Bootstrap nav bar components. These components based off the examples React Bootstrap examples found here https://react-bootstrap.github.io/components navbar/*/}
                        <div>
                            <Navbar bg="light" variant="light">
                                <Navbar.Brand>Tony Award Winner for Best Musical:</Navbar.Brand>
                                <Nav activeKey={this.state.tonyWinner} className="mr-auto">
                                    <Nav.Item><Nav.Link eventKey="All" onSelect={this.onSelectFilterTonyWinners}>All</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="Yes" onSelect={this.onSelectFilterTonyWinners}>Yes</Nav.Link></Nav.Item>
                                    <Nav.Item> <Nav.Link eventKey="No" onSelect={this.onSelectFilterTonyWinners}>No</Nav.Link></Nav.Item>
                                </Nav>
                            </Navbar>
                        </div>
                        <div>
                            <Navbar bg="light" variant="light">
                                <Navbar.Brand>Currently Running On Broadway:</Navbar.Brand>
                                <Nav activeKey={this.state.onBroadway} className="mr-auto">
                                    <Nav.Item><Nav.Link eventKey="All" onSelect={this.onSelectFilterOnBroadway}>All</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link eventKey="Yes" onSelect={this.onSelectFilterOnBroadway}>Yes</Nav.Link></Nav.Item>
                                    <Nav.Item> <Nav.Link eventKey="No" onSelect={this.onSelectFilterOnBroadway}>No</Nav.Link></Nav.Item>
                                </Nav>
                            </Navbar>
                        </div>
                        <div>
                            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                                <Navbar.Brand>Sort By Album Length</Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav activeKey={this.state.sortSelected} className="mr-auto">
                                    <NavDropdown title="Select" id="collasible-nav-dropdown">
                                        <NavDropdown.Item eventKey="Unsorted" onSelect={this.onSelectSortFiler}>Unsorted</NavDropdown.Item>
                                        <NavDropdown.Item  eventKey="Ascending" onSelect={this.onSelectSortFiler}>Shortest to Longest</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="Descending" onSelect={this.onSelectSortFiler}>Longest to Shortest</NavDropdown.Item>
                                    </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </div>
                    </div>
                    <div>
                        <DisplayList list={this.props.list.filter(this.matchesFilterTonyWinner).filter(this.matchesFilterOnBroadway).sort(this.compareFunction)} add={this.addToPlaylist} inPlaylist={false}/>
                    </div>
                </div>
                <div className="playlist">
                    <h2>Playlist</h2>
                        <DisplayList playlist={this.state.playlist} remove={this.removeFromPlaylist} change={this.changePlaylistValue} inPlaylist={true} />
                    <div className="total"><h3>Playlist Length: {this.state.totalLength} minutes</h3></div>
                </div>
                
            </div>        
        )
    }


}