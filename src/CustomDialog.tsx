import { PrimaryButton, DefaultButton, Dialog, DialogFooter, DialogType } from '@fluentui/react';

export function CustomDialog(currentPage: string, peerjsRemoteID: string, acceptCall: Function, setCurrentPage: React.Dispatch<React.SetStateAction<string>>) {

    console.log(currentPage)

    return <Dialog
        hidden={currentPage !== "/callrec"}
        onDismiss={() => { }}
        dialogContentProps={{
            type: DialogType.normal,
            title: 'Verbindung von',
            subText: peerjsRemoteID
        }}
        modalProps={{
            titleAriaId: "labelId",
            subtitleAriaId: "subTextId",
            isBlocking: false,
            styles: { main: { maxWidth: 450 } },
        }}
    >
        <DialogFooter>
            <PrimaryButton onClick={() => {
                acceptCall();
                setCurrentPage("/connecting");
            }} text="Annehmen" />
            <DefaultButton onClick={() => { }} text="Ablehnen" />
        </DialogFooter>
    </Dialog>;
}
