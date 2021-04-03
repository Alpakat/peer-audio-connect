import { Text, Slider } from '@fluentui/react';
import CustomPage from '../components/CustomPage';

export function PageConnected(peerjsID: string | null, peerjsRemoteID: string, audioVol: number, setAudioVol: React.Dispatch<React.SetStateAction<number>>) {
    return <CustomPage>
        <div className="maxWidth">
            <Text variant="xxLarge">Verbunden.</Text>
            <br />
            <br />
            <br />
            <br />
            <Slider
                label="Lautstärke"
                max={100}
                value={audioVol}
                onChange={(v: number) => { setAudioVol(v) }}
                ariaValueText={(n) => { return `${n}%` }}
                valueFormat={(n) => { return `${n}%` }}
                showValue
            />
        </div>
    </CustomPage>;
}
