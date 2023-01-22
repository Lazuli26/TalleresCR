import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { UserSessionProvider } from "./Login"
import { FirestoreService, testDocument } from "./Services/Firestore";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const TestComponent = () => {

    const userSession = useContext(UserSessionProvider);

    const [testData, updateTestData] = useState<testDocument | null>()
    useEffect(() => {
        if (userSession?.session?.user.uid) {

            const unsubscribe = FirestoreService.test.getNumbers(userSession?.session?.user.uid, (data) => {
                updateTestData(data)
            })

            return unsubscribe
        }
    }, [userSession?.session?.user.uid])

    const [numberField, setNumber] = useState<number>()
    const [nameField, setName] = useState<string>("")

    const isAddButtonDisabled = Object.values(testData?.numeros ?? {}).indexOf(numberField!) !== -1 || numberField === undefined || isNaN(numberField!) || numberField < 10000000 || numberField > 99999999
    if (userSession?.session)
        return <>
            <Grid container sx={{ marginBottom: 1, marginTop: 1 }}>

                <Grid item xs={12} md={6} lg={3} children={
                    <Card>
                        <CardHeader sx={{ textAlign: "left" }} title="Nuevo número" />
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" fullWidth sx={{ margin: 1 }} label="Nombre" variant="outlined" onChange={e => {
                                        setName(e.target.value)
                                    }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField size="small" fullWidth sx={{ margin: 1 }} label="+(506)" variant="outlined" type="number" onChange={e => {
                                        setNumber(parseInt(e.target.value))
                                    }} />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" disabled={isAddButtonDisabled} onClick={() => FirestoreService.test.addNumber(userSession?.session?.user.uid ?? "", nameField, numberField!)} children="Agregar" />
                        </CardActions>
                    </Card>} />
            </Grid>
            <Grid container spacing={1}>
                {Object.entries(testData?.numeros ?? {}).map(([name, number]) => {
                    const messageLink = `https://wa.me/506${number}`
                    return <Grid item xs={12} sm={6} lg={3} children={<Card>
                        <CardHeader avatar={
                            <WhatsAppIcon />
                        } title={name} subheader={`Enviar mensaje a ${number}`} />
                        <CardActions>
                            <Button onClick={() => window.open(messageLink, '_blank')} children="Mensaje" />
                        </CardActions>
                    </Card>} />
                })}
            </Grid>
        </>
    return <></>
}