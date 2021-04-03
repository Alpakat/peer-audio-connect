import './App.css';

import { useEffect, useState } from 'react';

import { useHistory, Route, Switch } from 'react-router-dom';


import { AnimatePresence } from "framer-motion"

import Peer from 'peerjs';
import { PageStart } from './pages/PageStart';
import { PageEnterID } from './pages/PageEnterID';
import { PageConnecting } from './pages/PageConnecting';
import { PageConnected } from './pages/PageConnected';
import { CustomDialog } from './CustomDialog';
import { PageError } from './pages/PageError';

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
  }

  // if constraints config still lose some prop, you can define it by yourself also
  interface MediaTrackConstraintSet {
    displaySurface?: ConstrainDOMString;
    logicalSurface?: ConstrainBoolean;
    // more....
  }
}

const peer = new Peer();

function App() {

  const history = useHistory();

  const [peerjsID, setPeerjsID] = useState<null | string>(null);
  const [peerjsRemoteID, setPeerjsRemoteID] = useState("");

  const [peerjsOutgoingCall, setPeerjsOutgoingCall] = useState<any>();

  // const [peerjsOutgoingCall, setPeerjsOutgoingCall] = useState<any>();
  const [peerjsIncomingCall, setPeerjsIncomingCall] = useState<any>();
  const [peerjsIncomingData, setPeerjsIncomingData] = useState<Peer.DataConnection>();

  const [currentPage, setCurrentPage] = useState("/");

  useEffect(() => {

    peer.on("open", (id) => {
      setPeerjsID(id)
    })

    peer.on("call", (con) => {
      setPeerjsRemoteID(con.peer)
      console.log("incoming")
      setPeerjsIncomingCall(con)
    })

    peer.on("connection", (con)=>{
      setPeerjsIncomingData(con)
    })

    setTimeout(() => {
      setCurrentPage("/enterID")
    }, 1000);

  }, [])

  useEffect(() => {

    if (currentPage === "/") {
      history.replace('/')
    }

    if (currentPage === "/enterID") {

      if (peerjsID === null) {
        history.replace('/')
      } else {
        console.log(peerjsIncomingCall)
        if (peerjsIncomingCall === undefined) {
          history.replace('/enterID')
        } else {
          setCurrentPage('/callrec')
        }
      }

    }

    if (currentPage === "/connecting") {
      history.replace('/connecting')
    }

    if (currentPage === "/connected") {
      history.replace('/connected')
    }
  }, [history, peerjsID, currentPage, peerjsIncomingCall])

  function makeCallToID(conToid: string) {

    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then((stream) => {
      setCurrentPage("/connecting")
      setPeerjsOutgoingCall(peer.call(conToid, stream));

      let call = peer.connect(conToid)

      call.on('open', function () {
        call.on("data", () => {
          setCurrentPage("/connected")
          call.close()
        })
      });
    });

  }

  function acceptCall() {
    peerjsIncomingData?.send("connected")
    peerjsIncomingData?.close()
    peerjsIncomingCall.answer(undefined)
    peerjsIncomingCall.on("stream", () => {
      setCurrentPage("/connected")
    })
  }

  return (
    <div className="App">
      <Route
        render={({ location }) => (
          <AnimatePresence initial={true}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" key="/">
                {PageStart()}
              </Route>
              <Route exact path="/enterID" key="/enterID">
                {PageEnterID(peerjsID, peerjsRemoteID, makeCallToID, setPeerjsRemoteID, setCurrentPage)}
              </Route>
              <Route exact path="/connecting" key="/connecting">
                {PageConnecting()}
              </Route>
              <Route exact path="/connected" key="/connected">
                {PageConnected(peerjsID, peerjsRemoteID)}
              </Route>
              <Route exact path="/error" key="/error">
                {PageError(history)}
              </Route>
              <Route exact path="/reload" key="/reload">
              </Route>
            </Switch>
          </AnimatePresence>)} />
      {CustomDialog(currentPage, peerjsRemoteID, acceptCall, setCurrentPage)}
    </div >
  );
}

export default App;