import Menu from "../components/Menu";
import DynamicTable from "../components/DynamicTable";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const ApplicationsPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [employmentData, setEmploymentData] = useState(null)
    const [salaryData, setSalaryData] = useState(null)
    const [newModalOpen, setNewModalOpen] = useState(false)
    const [data, setData] = useState([])

    const handleInfoClick = async (rowData) => {
        const employmentPrediction = await axios.post('http://localhost:5555/predict/employment', rowData)
        const salaryPrediciton = await axios.post('http://localhost:5555/predict/salary', rowData)

        console.log(employmentPrediction.data.employment)
        console.log(salaryPrediciton.data.salary)

        setEmploymentData(employmentPrediction.data.employment)
        setSalaryData(salaryPrediciton.data.salary)

        setModalData(rowData);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalData(null);
    };

    const handleNewModalOpen = () => {
        setNewModalOpen(true);
    };

    const handleNewModalClose = () => {
        setNewModalOpen(false);
    };

    const fetchApplicationsData = async () => {
        try {
            const applications = await axios.get('http://localhost:5555/applications')

            setData(applications.data.applications)
        } catch (err) {
            console.log('Error fetching data')
        }
    }

    useEffect(() => {
        fetchApplicationsData()
    }, [])

    return (
        <>
            <Menu />

            <Box sx={{ maxWidth: '90%', margin: '20px auto', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<NoteAddIcon />}
                    onClick={handleNewModalOpen}
                >
                    New
                </Button>
            </Box>

            <DynamicTable data={data} infoCallback={handleInfoClick} />

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
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Predictions
                    </Typography>

                    <Box id={'modal-description-predictions'}>
                        <div>
                            <strong>Employment:</strong> {employmentData !== null && employmentData !== undefined ? employmentData : 'N/A'}
                        </div>
                        <div>
                            <strong>Salary:</strong> {salaryData !== null && salaryData !== undefined ? salaryData.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A'}
                        </div>
                    </Box>
                    <Button onClick={handleCloseModal} sx={{ mt: 3 }} variant="contained">
                        Close
                    </Button>
                </Box>
            </Modal>


            <Modal
                open={newModalOpen}
                onClose={handleNewModalClose}
                aria-labelledby="new-modal-title"
                aria-describedby="new-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="new-modal-title" variant="h6" component="h2">
                        Create New Item
                    </Typography>
                    <Typography id="new-modal-description" sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Age"
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Profession"
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                    </Typography>
                    <Button onClick={handleNewModalClose} sx={{ mt: 3 }} variant="contained">
                        Close
                    </Button>
                    <Button onClick={handleNewModalClose} sx={{ mt: 3, ml: 3 }} variant="contained">
                        Save
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default ApplicationsPage