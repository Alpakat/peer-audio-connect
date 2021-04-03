import './App.css';

import { useEffect, useState } from 'react';

import { useHistory, Route, Switch } from 'react-router-dom';

import { Text, ProgressIndicator, MaskedTextField, PrimaryButton, DefaultButton } from '@fluentui/react'
import CustomPage from './components/CustomPage';

import { AnimatePresence } from "framer-motion"

import Peer from 'peerjs';

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

let call;

function makeCallToID(conToid: string) {

  navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then((stream) => {
    call = peer.call(conToid, stream);
    // call.on('stream', (remoteStream) => {
    //   // Show stream in some <video> element.
    // });
  });

}

function App() {

  const history = useHistory();

  const [peerjsID, setPeerjsID] = useState<null | string>(null);
  const [peerjsRemoteID, setPeerjsRemoteID] = useState("");

  const [currentPage, setCurrentPage] = useState("/");

  useEffect(() => {

    peer.on("open", (id) => {
      setPeerjsID(id)
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
        history.replace('/enterID')
      }

    }

    if (currentPage === "/connecting") {
      history.replace('/connecting')
    }
  }, [history, peerjsID, currentPage])

  return (
    <div className="App">
      {/* <AnimatedSwitch
        atEnter={{ opacity: 0, top: 35 }}
        atLeave={{ opacity: 0, top: 35 }}
        atActive={{ opacity: 1, top: 0 }}
        runOnMount={true}
        wrapperComponent={"div"}
        className="main-page-wrapper"
      > */}
      <Route
        render={({ location }) => (
          <AnimatePresence initial={true}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" key="/">
                <CustomPage>
                  <div className="maxWidth">
                    <Text variant="xxLarge">Verbindung zum Server wird hergestellt.</Text>
                    <br />
                    <br />
                    <ProgressIndicator barHeight={3}></ProgressIndicator>
                  </div>
                </CustomPage>
              </Route>
              <Route exact path="/enterID" key="/enterID">
                <CustomPage>
                  <div className="idEnterGrid">
                    <div>
                      <Text variant="xLarge">ID dieses PCs:</Text>
                      <br />
                      <Text variant="xxLarge">{peerjsID}</Text>
                    </div>
                    <div className="maxWidth">
                      <div className="inputRow">
                        <MaskedTextField value={peerjsRemoteID} onChange={(event, newVal) => { setPeerjsRemoteID(newVal || "") }} mask="********-****-****-****-************" label="ID des anderen PCs" />
                        <PrimaryButton onClick={() => {
                          makeCallToID(peerjsRemoteID)
                        }}>Verbinden</PrimaryButton>
                      </div>
                    </div>
                  </div>
                </CustomPage>
              </Route>
              <Route exact path="/connecting" key="/connecting">
                <CustomPage>
                  <div className="maxWidth">
                    <Text variant="xxLarge">Verbindung zum anderen PC wird hergestellt.</Text>
                    <br />
                    <br />
                    <ProgressIndicator barHeight={3}></ProgressIndicator>
                  </div>
                </CustomPage>
              </Route>
              <Route exact path="/error" key="/error">
                <CustomPage>
                  <div className="maxWidth">
                    <Text variant="xxLarge">Ein Fehler ist aufgetreten.</Text>
                    <br />
                    <br />
                    <DefaultButton onClick={() => {
                      history.replace('/reload')
                      setTimeout(() => {
                        window.location.reload()
                      }, 300);
                    }}>Erneut Versuchen</DefaultButton>
                  </div>
                </CustomPage>
              </Route>
              <Route exact path="/reload" key="/reload">
                <CustomPage>
                  <div><Text variant="xxLarge"></Text></div>
                </CustomPage>
              </Route>
            </Switch>
          </AnimatePresence>)} />
      {/* </AnimatedSwitch> */}
    </div >
  );
}

export default App;