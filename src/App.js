import './App.css';
import FilteredList from './FilteredList.js'
import beetlejuice from './beetlejuice.jpg'
import cfa from './cfa.jpg'
import deh from './deh.jpg'
import hadestown from './hadestown.jpg'
import hamilton from './hamilton.jpeg'
import hairspray from './hairspray.jpg'
import jbs from './jbs.jpg'
import lesmis from './lesmis.jpg'
import meangirls from './meangirls.jpg'
import newsies from './newsies.jpg'
import waitress from './waitress.jpg'
import wicked from './wicked.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';

/* 
Information about which musicals won the Tony Award for Best Muscial was found here: https://www.tonyawards.com/winners/year/any/category/musical/show/any/
Information about which musicals are currently are running on Broadway was found here: https://www.playbill.com/article/whats-currently-playing-on-broadway-com-321997
All images were obtained through Google Images. 
*/

const obcRecordingsList=[
  {name: "Beetlejuice", length: 57, tony:"No", running:"No", img: beetlejuice, playlistCount:0},
  {name: "Come From Away", length: 65, tony:"No", running:"Yes", img: cfa, playlistCount:0},
  {name: "Dear Evan Hansen", length: 56, tony:"Yes", running:"Yes", img: deh, playlistCount:0},
  {name: "Hadestown", length: 122, tony:"Yes", running:"Yes", img: hadestown, playlistCount:0},
  {name: "Hamilton", length: 142, tony:"Yes", running:"Yes", img: hamilton, playlistCount:0},
  {name: "Hairspray", length: 59, tony:"Yes", running:"No", img: hairspray, playlistCount:0},
  {name: "Jersey Boys", length: 52, tony:"Yes", running:"No", img: jbs, playlistCount:0},
  {name: "Les Misérables", length: 104, tony:"Yes", running:"No", img: lesmis, playlistCount:0},
  {name: "Mean Girls", length: 67, tony:"No", running:"Yes", img: meangirls, playlistCount:0},
  {name: "Newsies", length: 64, tony:"No", running:"No", img: newsies, playlistCount:0},
  {name: "Waitress", length: 52, tony:"No", running:"No", img: waitress, playlistCount:0},
  {name: "Wicked", length: 70, tony:"No", running:"Yes", img: wicked, playlistCount:0}
]
function App() {
  return (
    <div>
      <FilteredList list={obcRecordingsList} />
    </div>
  );
}

export default App;
