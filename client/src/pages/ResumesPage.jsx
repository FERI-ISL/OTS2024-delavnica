import Menu from "../components/Menu"
import DynamicTable from "../components/DynamicTable"
import {Box, Button, Modal, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import axios from "axios"


const ResumesPage = ({worker}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [resumesData, setResumesData] = useState([])

    const handleInfoClick = async (rowData) => {
        worker.postMessage(rowData.resume);
        setModalData('Generating summary...')
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setModalData(null)
    }

    const fetchResumesData = async () => {
        try {
            const resumes = await axios.get('http://localhost:5555/resumes')
            setResumesData(resumes.data.resumes)
        } catch (err) {
            console.log('Error fetching resumes data')
        }
    }

    useEffect(() => {
        fetchResumesData()
        console.log('Worker:', worker);
        if (worker) {
            console.log('Creating onmessage listener')
            console.log(worker)
            worker.onmessage = (e) => {
                console.log('Data from worker:', e.data)
                setModalData(e.data.output[0].summary_text)
            }
            console.log('Worker created');
        }
    }, [])

    return (
        <>
            <Menu />
            <DynamicTable data={resumesData} infoCallback={handleInfoClick} />

             <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center'
                    }}
                >
                    <Typography id="modal-title" variant="h5" component="h2" 
                        sx={{ borderBottom: "1px solid #ededed", textAlign: "center", marginBottom: "0.5em" }}>
                        Resume summary
                    </Typography>
                    {modalData && (
                        <Box id="modal-description" sx={{ mt: 2, textAlign: "left"}}>
                            {modalData}
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button onClick={handleCloseModal} variant="contained">Close</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ResumesPage