
import { Text, TextField, PrimaryButton } from '@fluentui/react';
import CustomPage from '../components/CustomPage';
import { useState } from "react";

export function PageLogin() {

  const oldPass = window.localStorage.getItem("alpakaauth")?"Falsches Passwort":""

  const [password, setPassword] = useState("")

  function savePass() {
    window.localStorage.setItem("alpakaauth", password)
    window.location.reload()
  }

  return <CustomPage>
    <div className="idEnterGrid">
      <div>
        <Text variant="xLarge">Anmelden</Text>
      </div>
      <div className="maxWidth">
        <div className="inputRow">
          <TextField value={password} type="password" errorMessage={oldPass} canRevealPassword onKeyPress={(e)=>{if(e.key==="Enter"){savePass()}}} onChange={(event, newVal) => { setPassword(newVal || ""); }}  label="Passwort" />
          <PrimaryButton onClick={savePass}>Anmelden</PrimaryButton>
        </div>
      </div>
    </div>
  </CustomPage>;
}
