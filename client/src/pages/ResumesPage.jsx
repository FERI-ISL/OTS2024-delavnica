import Menu from "../components/Menu"
import DynamicTable from "../components/DynamicTable"
import {Box, Button, InputAdornment, Modal, TextField, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";


const ResumesPage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [resumesData, setResumesData] = useState([])

    const handleInfoClick = async (rowData) => {
        setModalData('Proin et eros vel arcu varius euismod. Aliquam risus lectus, viverra ut blandit nec, semper id lectus. Donec et porttitor risus, sit amet varius libero. Morbi finibus sem eget erat volutpat rutrum. Proin quis auctor diam. Duis sit amet pharetra eros. Duis accumsan, felis at bibendum vehicula, dui lacus cursus lectus, sed tincidunt felis libero vitae quam.')
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
    }, [])

    return (
        <>
            <Menu />

            <Box sx={{ maxWidth: '90%', margin: '20px auto' }}>
                <TextField
                    fullWidth
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by any field"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

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
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Row Information
                    </Typography>
                    {modalData && (
                        <Box id="modal-description" sx={{ mt: 2 }}>
                            {modalData}
                        </Box>
                    )}
                    <Button onClick={handleCloseModal} sx={{ mt: 3 }} variant="contained">
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default ResumesPage