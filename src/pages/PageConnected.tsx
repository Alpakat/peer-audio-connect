import { Text, Slider, PrimaryButton } from '@fluentui/react';
import CustomPage from '../components/CustomPage';

export function PageConnected(peerjsID: string | null, peerjsRemoteID: string, audioVol: number, setAudioVol: React.Dispatch<React.SetStateAction<number>>, peerjsIncomingCall: any, stopCall: Function) {
    return <CustomPage>
        <div className="maxWidth">
            <Text variant="xxLarge">Verbunden.</Text>
            < br />
            <br />
            <br />
            <br />
            {peerjsIncomingCall !== undefined &&
                <Slider
                    label="Lautstärke"
                    max={100}
                    value={audioVol}
                    onChange={(v: number) => { setAudioVol(v) }}
                    ariaValueText={(n) => { return `${n}%` }}
                    valueFormat={(n) => { return `${n}%` }}
                    showValue
                />
            }
            <br />
            <br />
            <br />
            <PrimaryButton onClick={()=>{stopCall()}}>Beenden</PrimaryButton>
        </div>
    </CustomPage>;
}
