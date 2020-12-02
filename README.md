For this project, I created an interface that had a list of 12 Original Broadway Cast(OBC) Recordings and allowed users to add a recording to a playlist. The interface also allowed users to filter on whether the show that the OBC recording was for won the Tony Award for Best Musical and if the show is currently running on Broadway. It also allows users to sort based on the length of the soundtrack. The aggregated value is how long (in minutes) the playlist is. 

ORGANIZATION OF COMPONENTS 
    This interface mostly followed the recommended architecture that was described in the GearUp Slides. 
    The interface is made up of three components: App.js, FilteredList.js, and DisplayList.js. 
    App.js: 
        In the App.js, I define the list of OBC recordings, which contains information about the name of the show, the length of the OBC recording, if it won the Tony Award for Best Musical, if it is currently running on Broadway, and a field for playlistCount (which is used help in the functionality for aggregating the items in the playlist) and is initally set to 0 for all recordings. This list is then passed into the FilteredList Component. 
    FilteredList.js
        The FilteredList component contains most of the logic to make the interface function correctly. This component contatins the logic related to making both of the fitlers work correctly, the functionality related to sorting, the functionality for adding and removing an album to the playlist as well as changing the amount of times it appears in the playlist, calculating how many minutes long the playlist is, and actually creating the filter and sorting features. The filtered and sorted list to show a user or the list of soundtracks in the playlist are then passed into the DisplayList Component. 
    DisplayList.js
        The DisplayList component is where each OBC recording is actually made into an HTML element and displayed correctly. Since how the soundtracks are displayed is different when it is in the playlist, this component uses the inPlaylist prop to determine how to display the list. Then depending on whether it is in the playlist or not, this component just defines the HTML to make sure all of the items appear correctly. 
    

HOW DATA IS PASSED DOWN THROUGH COMPONENTS 
    Some information about how data is passed is included in the organization of components section, but this section will discuss everything that is passed from compoenent to component. 
    App.js passes the list of OBC recordings, where each show is its own dictionary and has all the relevant information needed, to FilteredList.js. 
    FilteredList.js passes different information to DisplayList depnding on whether the list is for the items in the playlist. 
        If the list is comprised of the soundtracks in the playlist, then FilteredList passes this list, which again is made up of dictionaries for each soundtrack in the playlist with all of the relevant information, the removeFromPlaylist function so that it can be added to the onClick functionality for the "Remove" button, te changePlaylistValue function so that it can be added to the onClick functionality for the plus and minus buttons for items in the playlist, and then a boolean set to True to represent that this list is for the playlist. 
        If the list is not for the playlist, then FilteredList passes the filtered/sorted list of shows, which again is made up of dictionaries for each soundtrack in the playlist with all of the relevant information, the addToPlaylist function so that it can be added to the onClick functionality for the "Add To Playlist" button, and a boolean set to False to represent that this list is not the playlist. 

HOW THE USER TRIGGER STATE CHANGES 
    There are various ways that a user is able to trigger state changes since I defined the state in FliteredList to have multiple properties, including the current filter selected for if it won the Tony Award for Best Muscial and if it is currently running on Broadway, the sorting option selected, the list of items in the playlist, and the total length of the playlist. Therefore, whenenver a changes the option for how the list is filter and/or sorted, adds an item to the playlist, removes an item from the playlist, or changes the amount of times an album is in the playlist, a state change is triggered. 
